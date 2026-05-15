import { Reveal, MaskedHeading } from "@/components/Reveal";
import { brand, ui } from "@/data/brand.ar";
import ContactFormAr from "./ContactFormAr";
import styles from "../../contact/contact.module.css";

export const metadata = {
  title: "تواصل — أوتيليا للتصميم الداخلي · استوديو أبو ظبي",
  description:
    "ابدأ مشروعًا مع أوتيليا. راسلنا على Info@otiliainteriors.com أو اتصل +971 507 440 010. نقبل عددًا محدودًا من المشاريع كل عام.",
  alternates: { canonical: "/ar/contact", languages: { "en-AE": "/contact" } },
  openGraph: {
    title: "تواصل مع أوتيليا",
    description: "ابدأ مشروعًا مع الاستوديو.",
    url: "/ar/contact",
    locale: "ar_AE",
  },
};

export default function ContactAr() {
  const t = ui.labels.contact;
  return (
    <main id="main">
      <section className={styles.hero}>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            <span className="gold-stroke" /> ١٤ — تواصل معنا
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.title}`}
            lines={["ابقَ", <em key="i" className="italic">على تواصل.</em>]}
          />
          <Reveal as="p" className={`lead ${styles.lead}`} delay={300}>
            {t.heroLead}
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.grid}>
            <aside className={styles.info}>
              <Reveal>
                <h2 className={styles.infoHeading}>{t.studio}</h2>
              </Reveal>

              <Reveal className={styles.infoItem} delay={80}>
                <span className="eyebrow">البريد الإلكتروني</span>
                <a href={`mailto:${brand.contact.email}`} className={styles.infoLink}>
                  {brand.contact.email}
                </a>
              </Reveal>

              <Reveal className={styles.infoItem} delay={140}>
                <span className="eyebrow">الهاتف</span>
                <a href={`tel:${brand.contact.phoneTel}`} className={styles.infoLink}>
                  {brand.contact.phone}
                </a>
              </Reveal>

              <Reveal className={styles.infoItem} delay={200}>
                <span className="eyebrow">{t.studio}</span>
                <p className={styles.infoText}>{brand.contact.location}</p>
              </Reveal>

              <Reveal className={styles.infoItem} delay={260}>
                <span className="eyebrow">إنستغرام</span>
                <a
                  href={brand.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoLink}
                >
                  {brand.contact.instagram}
                </a>
              </Reveal>

              <Reveal className={styles.infoItem} delay={320}>
                <span className="eyebrow">{t.hours}</span>
                <p className={styles.infoText} style={{ whiteSpace: "pre-line" }}>
                  {t.hoursValue}
                </p>
              </Reveal>

              <div className={styles.divider} />

              <Reveal as="p" className={styles.notice} delay={380}>
                {t.notice}
              </Reveal>
            </aside>

            <div className={styles.formWrap}>
              <Reveal>
                <h2 className={styles.formHeading}>
                  ابدأ <em className="italic">مشروعًا.</em>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <ContactFormAr />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pillarsBand}>
        <div className="container">
          <Reveal className={styles.pillarsInner}>
            <p className="eyebrow">
              <span className="gold-stroke" /> توقيع
            </p>
            <p className={styles.pillarsLine}>
              {brand.pillars[0]} · <em className="italic">{brand.pillars[1]}</em> · {brand.pillars[2]}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
