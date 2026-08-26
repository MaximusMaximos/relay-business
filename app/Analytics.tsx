"use client";

// app/Analytics.tsx
//
// One client island handling all tracking. Nothing else on the page needs converting to a
// client component: clicks are caught by delegation on document, and sections are watched
// with an IntersectionObserver. To track a new element, add data-track="name" to it.
//
// WHAT THIS CAN AND CANNOT TELL YOU
//
// It can tell you: who arrived, from which campaign, how far they read, whether they
// reached the benchmark, whether they opened enterprise pricing, and what they clicked.
//
// It cannot tell you whether a Calendly booking completed. The link is outbound, so the
// click is the last thing observable from here. Completions need either Calendly's embed
// widget on the page or their webhook posting to an endpoint, and until one of those
// exists the funnel ends at "booking intent" rather than "booked".
//
// COOKIES
//
// Attribution is held in sessionStorage, not cookies, and Vercel Analytics is cookieless.
// So no consent banner is required. If Google Analytics is added later that changes, and
// for a page selling to EU enterprises the banner would be expected rather than optional.

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Captured once on arrival and attached to every subsequent event, so a conversion three
// minutes later still carries the campaign that produced it.
type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landed_at?: string;
};

const KEY = "relay_attr";

function captureAttribution(): Attribution {
  try {
    const stored = sessionStorage.getItem(KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* private mode, storage unavailable */ }

  const p = new URLSearchParams(window.location.search);
  const attr: Attribution = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const v = p.get(k);
    if (v) attr[k] = v.slice(0, 64);
  }
  // Only the host, not the full referring URL: the path can carry a visitor's search terms
  // or an internal document name, and neither belongs in our analytics.
  if (document.referrer) {
    try { attr.referrer = new URL(document.referrer).hostname; } catch { /* malformed */ }
  }
  attr.landed_at = new Date().toISOString();

  try { sessionStorage.setItem(KEY, JSON.stringify(attr)); } catch { /* ignore */ }
  return attr;
}

export default function Analytics() {
  useEffect(() => {
    const attr = captureAttribution();
    const send = (name: string, props: Record<string, string | number | boolean> = {}) => {
      track(name, { ...attr, ...props } as Record<string, string | number | boolean>);
    };

    send("page_view", { path: window.location.pathname });

    // ── clicks, by delegation ────────────────────────────────────────
    // Anything with data-track is reported. Adding a new tracked element is a markup
    // change, not a code change here.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-track]") as HTMLElement | null;
      if (!el) return;
      const name = el.getAttribute("data-track");
      if (!name) return;
      const href = el.getAttribute("href") || "";
      send(name, {
        ...(href ? { destination: href.replace(/\?.*$/, "").slice(0, 120) } : {}),
        seconds_on_page: Math.round((Date.now() - start) / 1000),
      });
    };
    document.addEventListener("click", onClick, { capture: true });

    // ── section reach ────────────────────────────────────────────────
    // Fires once per section, when half of it has been on screen. "Viewed" meaning half
    // visible rather than merely scrolled past is the difference between reaching a
    // section and reading one.
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const name = (en.target as HTMLElement).getAttribute("data-section");
          if (!name || seen.has(name)) continue;
          seen.add(name);
          send("section_viewed", { section: name, seconds_on_page: Math.round((Date.now() - start) / 1000) });
        }
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));

    // ── scroll depth ─────────────────────────────────────────────────
    const marks = [25, 50, 75, 90];
    const hit = new Set<number>();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (h <= 0) return;
        const pct = (window.scrollY / h) * 100;
        for (const m of marks) {
          if (pct >= m && !hit.has(m)) { hit.add(m); send("scroll_depth", { depth: m }); }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── engaged time ─────────────────────────────────────────────────
    // Time with the tab actually visible, not wall-clock. A page left open in a background
    // tab for an hour is not an hour of reading, and counting it that way would make every
    // engagement metric useless.
    const start = Date.now();
    let visibleMs = 0;
    let lastVisible = document.visibilityState === "visible" ? Date.now() : 0;

    const onVisibility = () => {
      if (document.visibilityState === "visible") { lastVisible = Date.now(); return; }
      if (lastVisible) { visibleMs += Date.now() - lastVisible; lastVisible = 0; }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Thresholds rather than a continuous timer, so the shape is legible: bounced, skimmed,
    // read, studied.
    const engagement = [
      { at: 10_000, label: "10s" },
      { at: 30_000, label: "30s" },
      { at: 60_000, label: "60s" },
      { at: 180_000, label: "3m" },
    ];
    const timers = engagement.map(({ at, label }) =>
      setTimeout(() => {
        if (document.visibilityState === "visible") send("engaged", { threshold: label });
      }, at),
    );

    // A final event on the way out, carrying the totals. sendBeacon-style: the page may be
    // unloading, so this has to be cheap and non-blocking.
    const onLeave = () => {
      if (lastVisible) visibleMs += Date.now() - lastVisible;
      send("session_end", {
        engaged_seconds: Math.round(visibleMs / 1000),
        max_scroll: hit.size ? Math.max(...hit) : 0,
        sections_seen: seen.size,
      });
    };
    window.addEventListener("pagehide", onLeave);

    return () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onLeave);
      io.disconnect();
      timers.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
