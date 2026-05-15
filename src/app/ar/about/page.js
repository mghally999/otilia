import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, MaskedHeading } from "@/components/Reveal";
import { brand, principles, stats, ui } from "@/data/brand.ar";
import styles from "../../about/about.module.css";

export const metadata = {
  title: "عن الاستوديو — أوتيليا للتصميم الداخلي",
  description: brand.description,
  alternates: { canonical: "/ar/about", languages: { "en-AE": "/about" } },
};

export default function AboutAr() {
  const t = ui.labels.about;
  return (
    <main id="main">
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            <span className="gold-stroke" /> {t.heroEyebrow}
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.title}`}
            lines={["عن", <em key="i" className="italic">أوتيليا.</em>]}
          />
          <Reveal as="p" className={`lead ${styles.lead}`} delay={300}>
            {t.heroLead}
          </Reveal>
        </div>
        <div className={styles.heroImageWrap}>
          <Image
            src="/about/hero.jpg"
            alt="فضاء داخلي راقٍ — لوحة محايدة، ضوء طبيعي، تفاصيل مدروسة"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className={`section ${styles.philosophy}`}>
        <div className="container">
          <div className={styles.vmGrid}>
            <Reveal className={styles.vmCol}>
              <span className={`eyebrow ${styles.vmEyebrow}`}>
                <span className="diamond" /> {ui.labels.eyebrow.vision}
              </span>
              <h2 className={`h2 ${styles.vmTitle}`}>
                <em className="italic">رؤيتنا</em>
              </h2>
              <p className={styles.vmBody}>{brand.vision}</p>
            </Reveal>
            <Reveal className={styles.vmCol} delay={200}>
              <span className={`eyebrow ${styles.vmEyebrow}`}>
                <span className="diamond" /> {ui.labels.eyebrow.mission}
              </span>
              <h2 className={`h2 ${styles.vmTitle}`}>
                <em className="italic">مهمتنا</em>
              </h2>
              <p className={styles.vmBody}>{brand.mission}</p>
            </Reveal>
          </div>

          <Reveal className={styles.poemWrap}>
            <div className={styles.poemRule} />
            <p className={styles.poem}>«{brand.poem}»</p>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className={`section ${styles.principles}`}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <p className="eyebrow">
              <span className="gold-stroke" /> {ui.labels.eyebrow.principles}
            </p>
            <h2 className="h2">{t.principlesTitle}</h2>
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
                  alt="عائشة آل تنيجي — مؤسِّسة أوتيليا"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={styles.founderImage}
                />
                <div className={styles.founderBadge}>
                  <span>{ui.labels.eyebrow.founder}</span>
                  <span className={styles.founderBadgeYear}>منذ ٢٠١٧</span>
                </div>
              </div>
            </Reveal>

            <div className={styles.founderText}>
              <Reveal as="p" className="eyebrow">
                <span className="gold-stroke" /> {t.founderEyebrow}
              </Reveal>
              <Reveal>
                <h2 className={`display ${styles.founderName}`}>
                  عائشة
                  <br />
                  <em className="italic">آل تنيجي.</em>
                </h2>
              </Reveal>
              <Reveal as="p" className={styles.founderRole}>
                {brand.founder.role}
              </Reveal>
              <Reveal as="p" className={styles.founderBio} delay={150}>
                {brand.founder.bio}
              </Reveal>
              <Reveal as="p" className={styles.founderBio} delay={250}>
                {t.founderBio2}
              </Reveal>
              <Reveal delay={350}>
                <a
                  className="link-arrow"
                  href={brand.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                >
                  {ui.buttons.follow} {brand.founder.instagram}
                </a>
              </Reveal>
              <Reveal delay={450} className={styles.profileDownload}>
                <a
                  className="btn btn--ghost"
                  href="/otilia-company-profile.pdf"
                  download
                >
                  تحميل ملف الشركة
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
              <span className="gold-stroke" /> {ui.labels.eyebrow.pillars}
            </p>
            <h2 className={`display ${styles.pillarsTitle}`}>
              {brand.pillars[0]} · <em className="italic">{brand.pillars[1]}</em> · {brand.pillars[2]}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <Reveal className={styles.ctaInner}>
            <h2 className={`h1 ${styles.ctaTitle}`}>{t.ctaTitle}</h2>
            <Link href="/ar/contact" className="btn" data-cursor="hover">
              {ui.buttons.beginProject}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
