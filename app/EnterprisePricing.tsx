"use client";

// app/EnterprisePricing.tsx
//
// A row beneath the media table that opens into the enterprise tiers.
//
// It sits here rather than in the benchmark section deliberately. The benchmark chart is
// cost per 1,000 successful tasks from a measured run, and Gemini was not in that run.
// Putting token pricing on it would have been a number we did not measure, on a chart whose
// whole argument is that the numbers were measured. The media table is route pricing, so a
// pricing example belongs here and carries no measurement claim.
//
// Gemini 2.5 Flash Image is the worked example. The tiers apply across the catalogue, which
// is the point of the section, so the copy says so twice: once in the header and once
// beneath the tiers.

import { useState } from "react";
import styles from "./page.module.css";

const BASE = 0.18;

// Exactly as they appear in the pricing backend. No interpolation between $50K and $100K:
// that gap is theirs, not ours to fill.
const TIERS = [
  { label: "Up to $10K", price: 0.036 },
  { label: "$10K – $25K", price: 0.033 },
  { label: "$25K – $50K", price: 0.029 },
  { label: "$100K+", price: 0.025 },
];

const pctBelow = (p: number) => Math.round((1 - p / BASE) * 100);

export default function EnterprisePricing() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.entWrap}>
      <button
        type="button"
        className={`${styles.entToggle} ${open ? styles.entToggleOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.entToggleDot} aria-hidden="true" />
        <span className={styles.entToggleText}>
          <strong>These are base prices.</strong> Enterprise volume goes considerably lower.
        </span>
        <span className={styles.entToggleAction}>
          {open ? "Hide" : "See enterprise pricing"}
          <span className={styles.entToggleChevron} aria-hidden="true">
            {open ? "\u2212" : "+"}
          </span>
        </span>
      </button>

      {open && (
        <div className={styles.entPanel}>
          <div className={styles.entPanelHead}>
            <span className={styles.entPanelLabel}>One example</span>
            <span className={styles.entPanelModel}>
              Gemini 2.5 Flash Image <span>· per 1M input tokens</span>
            </span>
          </div>

          <div className={styles.entScale}>
            <div className={styles.entBaseCol}>
              <span className={styles.entColLabel}>Relay base</span>
              <span className={styles.entBasePrice}>${BASE.toFixed(2)}</span>
              <span className={styles.entColNote}>published price</span>
            </div>

            <span className={styles.entArrow} aria-hidden="true" />

            <div className={styles.entTierRow}>
              {TIERS.map((t, i) => (
                <div
                  key={t.label}
                  className={`${styles.entTier} ${i === TIERS.length - 1 ? styles.entTierBest : ""}`}
                >
                  <span className={styles.entTierVolume}>{t.label}</span>
                  <span className={styles.entTierPrice}>${t.price.toFixed(3)}</span>
                  <span className={styles.entTierSaving}>{pctBelow(t.price)}% lower</span>
                </div>
              ))}
            </div>
          </div>

          <p className={styles.entNote}>
            One example. Enterprise pricing is available across Relay&rsquo;s model
            catalogue, and actual pricing depends on model, workload and volume. The more
            you run, the less you pay.
          </p>

          <p className={styles.entKicker}>
            Show us your workloads and we&rsquo;ll show you what they cost through Relay.
            Because the number that matters isn&rsquo;t what a million tokens cost. It&rsquo;s
            what it costs to finish the work.
          </p>

          <a
            href="https://calendly.com/maximus-opengpu/free-relay-benchmark-we-match-beat-any-price"
            className={styles.entBook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.entBookMain}>Book a call with our tech team</span>
            <span className={styles.entBookSub}>
              We&rsquo;ll break down the numbers live. No AI, just one to one with a real
              human.
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
