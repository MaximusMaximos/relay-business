import type { Metadata } from "next";
import styles from "./page.module.css";

// app/page.tsx — business.relaygpu.com
//
// Relay's own identity throughout: navy and blue-black, cobalt atmospheric light, amber as
// energy. No ivory, no cream. The earlier light sections made this look like a different
// company's site.
//
// Contrast between sections comes from depth and illumination rather than from swapping to
// a pale background: deep → cobalt-lit → navy → deep. That is how relaygpu.com already
// avoids flat black repetition.
//
// CLAIM DISCIPLINE
//
// TTFT and latency appear only in the free-credits section, and deliberately: that is the
// customer measuring on their own infrastructure, which is sound. Relay does not publish
// its own latency figures anywhere on this page, because every timing we hold carries
// several hundred milliseconds of Thailand-to-Europe egress and none of it is separable
// from the client side.
//
// The voice comparator is described as market list pricing rather than named. The unit and
// the model are both stated so anyone can check it.

export const metadata: Metadata = {
  title: "Relay — Same models. Lower API price.",
  description:
    "Keep the AI stack you already use. Relay changes the economics underneath it, through one OpenAI-compatible API.",
};

const DASHBOARD = "https://dashboard.relaygpu.com";
const RELAY_SITE = "https://relaygpu.com";

const OUTCOMES = [
  { tag: 'Agents', figure: '91%', detail: 'lower cost per successful task, measured against a frontier model' },
  { tag: 'Voice', figure: '51%', detail: 'lower unit cost per 1,000 generated characters' },
  { tag: 'Media', figure: '53%', detail: 'lower route cost on SeeDance 2.5, same model' },
];

const AGENT_BARS = [
  { model: "DeepSeek", cost: 0.07 },
  { model: "GPT", cost: 0.49 },
  { model: "Sonnet", cost: 0.79 },
  { model: "Qwen", cost: 1.29 },
  { model: "GLM", cost: 1.59 },
];

const SAVINGS = [
  { figure: "$180K", label: "Agents", detail: "250M successful tasks a year, measured against Sonnet." },
  { figure: "$255K", label: "Voice", detail: "5B generated characters a year, against list pricing." },
  { figure: "$155K", label: "Media", detail: "5M image renders a year. Video routes save separately, below." },
];

const MEDIA_ROUTES = [
  { route: "Gemini image", comparator: "$0.077 / image", relay: "$0.046 / image", scale: "5M images", saving: "$155K" },
  { route: "HappyHorse 1.1", comparator: "$0.168 / sec", relay: "$0.1512 / sec", scale: "1M x 5 sec", saving: "$84K" },
  { route: "SeeDance 2.5", comparator: "$21.40 / 1M video tokens", relay: "$10.01 / 1M video tokens", scale: "Route-level", saving: "53% less" },
  { route: "SeeDance Mini", comparator: "$7.00 / 1M tokens", relay: "$3.22 / 1M tokens", scale: "Route-level", saving: "54% less" },
];

const MECHANISMS = [
  { n: "01", title: "Direct provider relationships", body: "Relay works directly with infrastructure and technology providers to negotiate commercial rates." },
  { n: "02", title: "Commercial sourcing", body: "Multiple provider relationships create more pricing options than any single customer reaches alone." },
  { n: "03", title: "Infrastructure optionality", body: "Equivalent model capacity can be sourced through different infrastructure routes where available." },
];

function BenchmarkChart() {
  const max = Math.max(...AGENT_BARS.map((b) => b.cost));
  return (
    <div className={styles.chart}>
      <div className={styles.bars}>
        {AGENT_BARS.map((b, i) => (
          <div key={b.model} className={styles.barCol}>
            <span className={i === 0 ? styles.barValueBest : styles.barValue}>${b.cost.toFixed(2)}</span>
            <div className={`${styles.bar} ${i === 0 ? styles.barBest : ""}`} style={{ height: `${(b.cost / max) * 100}%` }} />
            <span className={styles.barLabel}>{b.model}</span>
          </div>
        ))}
      </div>
      <span className={styles.chartAxis}>Cost per 1,000 successful AI agent tasks · lower is better</span>
    </div>
  );
}

export default function Business() {
  return (
    <main className={styles.page}>
      {/* ═══ header ═══ */}
      <header className={styles.header}>
        <div className={styles.wrap}>
          <div className={styles.headerRow}>
            {/* Straight back to the main site, as briefed. */}
            <a href={RELAY_SITE} className={styles.logo} aria-label="Relay">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://relaygpu.com/logo.svg" alt="Relay" className={styles.logoMark} />
            </a>
            <a href={DASHBOARD} className={styles.headerCta} target="_blank" rel="noopener noreferrer">
              Try Relay free
            </a>
          </div>
        </div>
      </header>

      {/* ═══ 1 · cinematic hero ═══ */}
      <section className={styles.hero}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src="/relay-hero-1080.mp4" type="video/mp4" />
        </video>
        {/* Left only. Darkening the whole frame would flatten everything the video does. */}
        <div className={styles.heroScrim} />
        <div className={styles.heroFoot} />

        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Relay for production AI</span>
          <h1 className={styles.h1}>
            Same models.
            <br />
            <span>Lower API price.</span>
          </h1>
          <p className={styles.heroLede}>
            Keep the AI stack you already use. Relay changes the economics underneath it,
            through one OpenAI-compatible API.
          </p>
          <div className={styles.ctaRow}>
            <a href="#benchmarks" className={styles.ctaGold}>See the benchmarks</a>
            <a href={DASHBOARD} className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">Try Relay free</a>
          </div>
        </div>

        {/* The proof belongs to the hero, not to a section under it. Sitting over the
            lower third and overhanging the next section makes the evidence feel like part
            of the claim rather than a separate band of metrics. */}
        <div className={styles.proofCards}>
          {OUTCOMES.map((o) => (
            <div key={o.tag} className={styles.proofCard}>
              <span className={styles.proofTag}>{o.tag}</span>
              <span className={styles.proofFigure}>{o.figure}</span>
              <span className={styles.proofDetail}>{o.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 · product module ═══ */}
      <section className={styles.deep}>
        <div className={styles.wrap}>
          <div className={styles.module}>
            <div className={styles.moduleCopy}>
              <span className={styles.eyebrow}>Low-friction adoption</span>
              <h2 className={styles.h2}>
                Keep your stack.
                <br />
                <span>Change the economics underneath.</span>
              </h2>
              <p className={styles.lede}>
                One OpenAI-compatible API. Same models, same prompts and the same workflows.
                Route only the workloads where Relay gives you better economics.
              </p>
              <ul className={styles.plainList}>
                <li>Same models</li>
                <li>Lower API pricing</li>
                <li>No forced migration</li>
              </ul>
            </div>

            <div
              style={{
                position: "relative",
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "24px",
                background: "transparent",
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16 / 9",
                  objectFit: "contain",
                  display: "block",
                }}
              >
                <source src="/relay-routing.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

{/* ═══ 4 · benchmarks ═══ */}
<section className={styles.navy} id="benchmarks">
  <div className={styles.wrap}>
    <div className={styles.benchTop}>
      <div className={styles.benchHead}>
        <h2 className={styles.h2}>Don&rsquo;t take our word for it.</h2>
        <p className={styles.lede}>
          See what the economics look like across real AI agent workloads.
        </p>
      </div>

      <div className={styles.versus}>
        <div className={styles.versusSide}>
          <span className={styles.versusGold}>$0.07</span>
          <span className={styles.versusLabel}>
            per 1,000 successful tasks
          </span>
        </div>

        <span className={styles.versusVs}>against</span>

        <div className={styles.versusSide}>
          <span className={styles.versusPlain}>$0.79</span>
          <span className={styles.versusLabel}>
            same AI agent workload, frontier model
          </span>
        </div>

        <div className={styles.versusEnd}>
          <span className={styles.versusGold}>91%</span>
          <span className={styles.versusLabel}>
            lower in the measured comparison
          </span>
        </div>
      </div>
    </div>

    <div className={styles.benchLayout}>
      <BenchmarkChart />

      <div className={styles.benchAside}>
     <p className={styles.benchNote}>
  Cost per <strong>successful AI agent task</strong>, not per API request.
  Failed attempts are paid for and counted. DeepSeek and Sonnet achieved
  virtually identical measured pass rates on the same workload:
  98.4% and 98.0%.
</p>

       <div className={styles.benchInsight}>
  <span className={styles.benchInsightLabel}>
    Token price isn&rsquo;t task price
  </span>

  <p>
    GLM had a lower published token price than Sonnet, yet cost roughly
    twice as much per successful AI agent task: $1.59 versus $0.79.
  </p>

  <p>
    The difference was verbosity, not quality. GLM produced an average of
    375 output tokens per task versus Sonnet&rsquo;s 56, nearly 7&times;
    as many, while their measured pass rates were essentially identical.
  </p>

  <p>
    96% of GLM&rsquo;s output tokens were reasoning tokens. Sonnet used none.
    Those extra tokens still carry a cost.
  </p>

  <strong>
    Price per million tokens tells you what a token costs.
    It doesn&rsquo;t tell you what the agent task costs.
  </strong>
</div>

        <div className={styles.benchStats}>
          <div className={styles.benchStat}>
            <span className={styles.benchStatFigure}>&lt;1s</span>
            <span className={styles.benchStatLabel}>
              Direct mode latency
            </span>
          </div>

          <div className={styles.benchStat}>
            <span className={styles.benchStatFigure}>5</span>
            <span className={styles.benchStatLabel}>
              models, same workload and scoring
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ═══ 5 · base_url ═══ */}
      <section className={styles.navy}>
        <div className={styles.wrap}>
          <div className={styles.split}>
            <div>
              <h2 className={styles.h2}>
                Change <span>base_url.</span>
                <br />
                Nothing else.
              </h2>
              <p className={styles.lede}>Same models. Same prompts. Same workflows.</p>
              <ul className={styles.plainList}>
                <li>Keep your existing stack</li>
                <li>Keep your model choice</li>
                <li>Move traffic selectively</li>
              </ul>
            </div>
            <div className={styles.codeWrap}>
              <div className={styles.codeBar}>
                <span className={styles.codeDot} /><span className={styles.codeDot} /><span className={styles.codeDot} />
                <span className={styles.codeName}>python</span>
              </div>
              <pre className={styles.code}>
{`client = OpenAI(
    api_key  = RELAY_API_KEY,
    base_url = "https://relaygpu.com/v2/openai/v1",
)`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6 · production savings ═══ */}
      <section className={styles.deep}>
        <div className={styles.wrap}>
          <div className={styles.headBlock}>
            <h2 className={styles.h2}>At production scale, this compounds.</h2>
            <p className={styles.lede}>
              Small unit-cost differences become six-figure annual savings.
            </p>
          </div>

          <div className={styles.savings}>
            {SAVINGS.map((s) => (
              <div key={s.label} className={styles.saving}>
                <span className={styles.savingFigure}>{s.figure}</span>
                <span className={styles.savingLabel}>{s.label}</span>
                <p className={styles.savingDetail}>{s.detail}</p>
              </div>
            ))}
          </div>

          <p className={styles.footnote}>
            Every comparison uses a defined unit and an explicit comparator, with same-model
            pricing where applicable. Annual figures are volume-scaled examples, not
            invoices. Pricing advantages vary by model and provider availability, and Relay
            only claims savings where current pricing supports them.
          </p>

          {/* Slide 07's arrangement: saving cards, sample outputs beside them, routes table
              below. The samples show what the routes produce; the table is the evidence for
              the savings. */}
          <div className={styles.mediaBlock}>
            <div className={styles.mediaTop}>
              <div className={styles.mediaSavings}>
                <div className={styles.mediaSaving}>
                  <span className={styles.mediaSavingLabel}>Image, at 5M renders</span>
                  <span className={styles.mediaSavingFigure}>$155K</span>
                  <span className={styles.mediaSavingUnit}>$0.077 to $0.046 per image</span>
                </div>
                <div className={styles.mediaSaving}>
                  <span className={styles.mediaSavingLabel}>Video, at 1M renders</span>
                  <span className={styles.mediaSavingFigure}>$84K</span>
                  <span className={styles.mediaSavingUnit}>5 sec HappyHorse route</span>
                </div>
                <div className={styles.mediaSaving}>
                  <span className={styles.mediaSavingLabel}>SeeDance 2.5</span>
                  <span className={styles.mediaSavingFigure}>53%</span>
                  <span className={styles.mediaSavingUnit}>$21.40 to $10.01 per 1M video tokens</span>
                </div>
              </div>

              <div className={styles.mediaSamples}>
                {/* eslint-disable @next/next/no-img-element */}
                <img src="/image-sample.png" alt="" className={styles.mediaSample} />
                <img src="/video-sample1.png" alt="" className={styles.mediaSample} />
                <img src="/video-sample2.png" alt="" className={styles.mediaSample} />
                {/* eslint-enable @next/next/no-img-element */}
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr><th>Media route</th><th>Comparator</th><th>Relay</th><th>Scale</th><th>Saving</th></tr>
              </thead>
              <tbody>
                {MEDIA_ROUTES.map((r) => (
                  <tr key={r.route}>
                    <td>{r.route}</td>
                    <td>{r.comparator}</td>
                    <td>{r.relay}</td>
                    <td>{r.scale}</td>
                    <td className={styles.tdSave}>{r.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ 7 · why it costs less ═══ */}
      <section className={styles.navy}>
        <div className={styles.wrap}>
          <div className={styles.headBlock}>
            <h2 className={styles.h2}>How Relay lowers the price.</h2>
            <p className={styles.lede}>
              The advantage sits in the supply economics, not in changing the model you use.
            </p>
          </div>

          <div className={styles.flow}>
            <div className={styles.flowList}>
              {MECHANISMS.map((m) => (
                <div key={m.n} className={styles.mech}>
                  <span className={styles.mechNum}>{m.n}</span>
                  <div>
                    <h3 className={styles.mechTitle}>{m.title}</h3>
                    <p className={styles.mechBody}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.flowChain}>
              <div className={styles.chainNode}>
                <span className={styles.chainName}>Providers</span>
                <span className={styles.chainSub}>negotiated rates</span>
              </div>
              <span className={styles.chainLine} aria-hidden="true" />
              <div className={`${styles.chainNode} ${styles.chainRelay}`}>
                <span className={styles.chainName}>Relay</span>
                <span className={styles.chainSub}>same model, lower price</span>
              </div>
              <span className={styles.chainLine} aria-hidden="true" />
              <div className={styles.chainNode}>
                <span className={styles.chainName}>Your application</span>
                <span className={styles.chainSub}>unchanged</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8 · free credits ═══ */}
      {/* Cobalt-lit rather than a pale panel: distinguished by illumination, still Relay. */}
      <section className={styles.credits}>
        <div className={styles.wrap}>
          <div className={styles.creditsInner}>
            <span className={styles.eyebrow}>Put Relay to the test</span>
            <h2 className={styles.h2Big}>Prove it before you move it.</h2>
            <p className={styles.creditsStrong}>
              We&rsquo;re confident enough in Relay&rsquo;s economics to fund the benchmark.
            </p>
            <p className={styles.creditsBody}>
              We&rsquo;ll give your team free Relay credits to test your existing workloads
              against Relay before you commit. Compare cost, TTFT, latency, reliability and
              model performance against what you use today, measured from where your
              traffic actually runs.
            </p>
            <p className={styles.creditsKicker}>
              If Relay wins, move the workloads that benefit. If it doesn&rsquo;t, don&rsquo;t.
            </p>
            <a href={DASHBOARD} className={styles.ctaGold} target="_blank" rel="noopener noreferrer">
              Get free Relay credits
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 9 · two ways in ═══ */}
      <section className={styles.deep}>
        <div className={styles.wrap}>
          <div className={styles.fork}>
            <div className={styles.forkPath}>
              <span className={styles.forkQ}>Building?</span>
              <h3 className={styles.forkTitle}>Price your stack before launch.</h3>
              <p className={styles.forkNote}>
                Tell us the models you are considering and your expected token, voice or
                media volume. Compare the economics before committing to anything.
              </p>
            </div>
            <span className={styles.forkLine} aria-hidden="true" />
            <div className={styles.forkPath}>
              <span className={styles.forkQ}>Already live?</span>
              <h3 className={styles.forkTitle}>Compare what you pay today.</h3>
              <p className={styles.forkNote}>
                Keep your existing models, application and workflows. Move only the
                workloads where Relay produces better economics.
              </p>
            </div>
          </div>

          <div className={styles.converge}>
            <span className={styles.eyebrow}>Relay economics</span>
            <div className={styles.steps}>
              <span><b>1</b> Send usage</span>
              <span className={styles.stepArrow} aria-hidden="true" />
              <span><b>2</b> We compare</span>
              <span className={styles.stepArrow} aria-hidden="true" />
              <span><b>3</b> You decide</span>
            </div>
            <p className={styles.convergeNote}>No forced migration.</p>
            <a href={RELAY_SITE} className={styles.convergeCta}>
              Visit relaygpu.com <span aria-hidden="true">&#8594;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ footer ═══ */}
      <footer className={styles.footer}>
        <span className={styles.footerGlow} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.footerTop}>
            <div>
              <p className={styles.footerStatement}>
                One API. Multiple models. <span>Lower cost.</span>
              </p>
              <p className={styles.footerPowered}>Powered by OpenGPU</p>
            </div>
            <nav className={styles.footerNav}>
              <a href={RELAY_SITE}>relaygpu.com</a>
              <a href={DASHBOARD} target="_blank" rel="noopener noreferrer">Dashboard</a>
              <a href="#benchmarks">Benchmarks</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}