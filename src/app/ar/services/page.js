import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, MaskedHeading } from "@/components/Reveal";
import { services, brand, ui } from "@/data/brand.ar";
import styles from "../../services/services.module.css";

export const metadata = {
  title: "الخدمات — أوتيليا للتصميم الداخلي",
  description: "خدمات تصميم داخلي شاملة من أوتيليا — تخطيط، نمذجة ثلاثية الأبعاد، رسومات فنية، اختيار مواد، إدارة مشاريع، وأثاث مُصمَّم خصيصًا.",
  alternates: { canonical: "/ar/services", languages: { "en-AE": "/services" } },
};

export default function ServicesAr() {
  const t = ui.labels.services;
  return (
    <main id="main">
      <section className={styles.hero}>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            <span className="gold-stroke" /> {ui.labels.eyebrow.services}
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.title}`}
            lines={["ست تخصّصات،", <em key="i" className="italic">توقيع واحد.</em>]}
          />
          <Reveal as="p" className={`lead ${styles.lead}`} delay={300}>
            {t.heroLead}
          </Reveal>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className="container">
          {services.map((s, i) => (
            <article
              key={s.n}
              className={`${styles.serviceRow} ${i % 2 === 1 ? styles.serviceRowAlt : ""}`}
            >
              <Reveal className={styles.serviceMeta}>
                <span className={styles.serviceN}>{s.n}</span>
                <span className={styles.serviceTag}>
                  <span className="diamond" /> {ui.labels.eyebrow.services}
                </span>
              </Reveal>
              <Reveal className={styles.serviceBody} delay={120}>
                <h2 className={styles.serviceTitle}>
                  <em className="italic">{s.title}.</em>
                </h2>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className={`section ${styles.process}`}>
        <div className="container">
          <Reveal className={styles.processHead}>
            <p className="eyebrow"><span className="gold-stroke" /> {ui.labels.eyebrow.process}</p>
            <h2 className="h2">{t.processTitle}</h2>
          </Reveal>
          <Stagger className={styles.processGrid}>
            {t.processSteps.map((p) => (
              <div key={p.n} className={styles.processCard}>
                <span className={styles.processN}>{p.n}</span>
                <h3 className={styles.processLabel}>{p.label}</h3>
                <p className={styles.processBody}>{p.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTORS */}
      <section className={`section ${styles.sectors}`}>
        <div className="container">
          <div className={styles.sectorsGrid}>
            <Reveal className={styles.sectorMedia}>
              <Image
                src="/services/residential.jpg"
                alt="فضاء سكني هادئ"
                width={1200}
                height={1500}
                className={styles.sectorImg}
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className={styles.sectorTag}>
                <span className="diamond" /> سكني
              </div>
            </Reveal>
            <div className={styles.sectorText}>
              <Reveal as="p" className="eyebrow">{t.sectors.residential.eyebrow}</Reveal>
              <Reveal><h2 className={`h2 ${styles.sectorTitle}`}><em className="italic">{t.sectors.residential.title}</em></h2></Reveal>
              <Reveal as="p" className={styles.sectorBody} delay={150}>
                {t.sectors.residential.body}
              </Reveal>
              <Reveal as="ul" className={styles.sectorList} delay={250}>
                {t.sectors.residential.list.map((it) => <li key={it}>{it}</li>)}
              </Reveal>
            </div>
          </div>

          <div className={`${styles.sectorsGrid} ${styles.sectorsGridReverse}`}>
            <Reveal className={styles.sectorMedia}>
              <Image
                src="/services/commercial.jpg"
                alt="فضاء طعام تجاري راقٍ"
                width={1200}
                height={1500}
                className={styles.sectorImg}
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className={styles.sectorTag}>
                <span className="diamond" /> تجاري
              </div>
            </Reveal>
            <div className={styles.sectorText}>
              <Reveal as="p" className="eyebrow">{t.sectors.commercial.eyebrow}</Reveal>
              <Reveal><h2 className={`h2 ${styles.sectorTitle}`}><em className="italic">{t.sectors.commercial.title}</em></h2></Reveal>
              <Reveal as="p" className={styles.sectorBody} delay={150}>
                {t.sectors.commercial.body}
              </Reveal>
              <Reveal as="ul" className={styles.sectorList} delay={250}>
                {t.sectors.commercial.list.map((it) => <li key={it}>{it}</li>)}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <Reveal className={styles.ctaInner}>
            <p className="eyebrow"><span className="gold-stroke" /> ابدأ</p>
            <h2 className={`display ${styles.ctaTitle}`}>
              <em className="italic">{t.ctaTitle}</em>
            </h2>
            <p className={styles.ctaSub}>{t.ctaSub}</p>
            <div className={styles.ctaActions}>
              <Link href="/ar/contact" className="btn" data-cursor="hover">{ui.buttons.beginProject}</Link>
              <a className="btn btn--ghost" href={`mailto:${brand.contact.email}`} data-cursor="hover">
                {ui.buttons.emailStudio}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
