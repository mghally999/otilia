import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, MaskedHeading } from "@/components/Reveal";
import { brand, principles, stats } from "@/data/brand";
import styles from "./about.module.css";

export const metadata = {
  title: "About — OTILÌA Interior Design | Aysha Al Tenaji, Abu Dhabi",
  description:
    "OTILÌA is an Abu Dhabi-based interior design studio founded by Aysha Al Tenaji, crafting bespoke residential and commercial spaces where understated luxury meets architectural precision.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OTILÌA — A Studio in Abu Dhabi",
    description:
      "Founded by Aysha Al Tenaji, OTILÌA designs interiors that are authored, not styled.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <main id="main">
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            <span className="gold-stroke" /> 01 — About the Studio
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.title}`}
            lines={["About", <em key="i" className="italic">OTILÌA.</em>]}
          />
          <Reveal as="p" className={`lead ${styles.lead}`} delay={300}>
            {brand.description}
          </Reveal>
        </div>
        <div className={styles.heroImageWrap}>
          <Image
            src="/about/hero.jpg"
            alt="A composed OTILÌA interior — neutral palette, soft daylight, considered detail"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* VISION & MISSION — two-column editorial */}
      <section className={`section ${styles.philosophy}`}>
        <div className="container">
          <div className={styles.vmGrid}>
            <Reveal className={styles.vmCol}>
              <h2 className={`h2 ${styles.vmTitle}`}>
                <em className="italic">Vision</em>
              </h2>
              <p className={styles.vmBody}>{brand.vision}</p>
            </Reveal>
            <Reveal className={styles.vmCol} delay={200}>
              <h2 className={`h2 ${styles.vmTitle}`}>
                <em className="italic">Mission</em>
              </h2>
              <p className={styles.vmBody}>{brand.mission}</p>
            </Reveal>
          </div>

          <Reveal className={styles.poemWrap}>
            <div className={styles.poemRule} />
            <p className={styles.poem}>"{brand.poem}"</p>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className={`section ${styles.principles}`}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <p className="eyebrow">
              <span className="gold-stroke" /> 02 — Principles
            </p>
            <h2 className="h2">
              Four ideas <em className="italic">we keep returning to.</em>
            </h2>
          </Reveal>

          <Stagger className={styles.principleGrid}>
            {principles.map((p, i) => (
              <article key={p.label} className={styles.principleCard}>
                <span className={styles.principleN}>0{i + 1}</span>
                <h3 className={styles.principleTitle}>{p.label}</h3>
                <p className={styles.principleBody}>{p.body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FOUNDER */}
      <section className={`section ${styles.founder}`}>
        <div className="container">
          <div className={styles.founderGrid}>
            <Reveal className={styles.founderImageWrap}>
              <div className={styles.founderImageInner}>
                <Image
                  src="/team/aysha.jpg"
                  alt="Aysha Al Tenaji — founder, OTILÌA"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={styles.founderImage}
                />
                <div className={styles.founderBadge}>
                  <span>Founder</span>
                  <span className={styles.founderBadgeYear}>est. 2017</span>
                </div>
              </div>
            </Reveal>

            <div className={styles.founderText}>
              <Reveal as="p" className="eyebrow">
                <span className="gold-stroke" /> 03 — The People Behind
              </Reveal>
              <Reveal>
                <h2 className={`display ${styles.founderName}`}>
                  Aysha
                  <br />
                  <em className="italic">Al Tenaji.</em>
                </h2>
              </Reveal>
              <Reveal as="p" className={styles.founderRole}>
                {brand.founder.role}
              </Reveal>
              <Reveal as="p" className={styles.founderBio} delay={150}>
                {brand.founder.bio}
              </Reveal>
              <Reveal as="p" className={styles.founderBio} delay={250}>
                Her practice is built on long collaborations with master fabricators
                across Europe, stone yards across the Gulf, and a small team of
                draughtspeople in Abu Dhabi. Every project is led by Aysha
                personally — from the first concept sketch to the last reveal.
              </Reveal>
              <Reveal delay={350}>
                <a
                  className="link-arrow"
                  href={brand.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow {brand.founder.instagram}
                </a>
              </Reveal>
              <Reveal delay={450} className={styles.profileDownload}>
                <a
                  className="btn btn--ghost"
                  href="/otilia-company-profile.pdf"
                  download
                >
                  Download Company Profile
                  <span aria-hidden="true">↓</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={`section--tight ${styles.stats}`}>
        <div className="container">
          <Stagger className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PILLARS */}
      <section className={`section ${styles.pillars}`}>
        <div className="container">
          <Reveal className={styles.pillarsInner}>
            <p className="eyebrow">
              <span className="gold-stroke" /> 04 — Pillars
            </p>
            <h2 className={`display ${styles.pillarsTitle}`}>
              Quiet Luxury · <em className="italic">Intentional</em> · Timeless
            </h2>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <Reveal className={styles.ctaInner}>
            <h2 className={`h1 ${styles.ctaTitle}`}>
              A new space <em className="italic">begins with a conversation.</em>
            </h2>
            <Link href="/contact" className="btn">
              Begin a Project
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
