import { Reveal, MaskedHeading } from "@/components/Reveal";
import { brand } from "@/data/brand";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact — OTILÌA Interior Design | Abu Dhabi Studio",
  description:
    "Begin a project with OTILÌA. Email Info@otiliainteriors.com or call +971 507 440 010. We accept a small number of residential and commercial commissions each year.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact OTILÌA",
    description: "Begin a project with the studio.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className={styles.hero}>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            <span className="gold-stroke" /> 14 — Contact Us
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.title}`}
            lines={["Stay", <em key="i" className="italic">in touch.</em>]}
          />
          <Reveal as="p" className={`lead ${styles.lead}`} delay={300}>
            Not just a design company — a partner building complete concept
            into spaces that feel alive and intentional.
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.grid}>
            {/* Left column — Studio info */}
            <aside className={styles.info}>
              <Reveal>
                <h2 className={styles.infoHeading}>The Studio</h2>
              </Reveal>

              <Reveal className={styles.infoItem} delay={80}>
                <span className="eyebrow">Email</span>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className={styles.infoLink}
                >
                  {brand.contact.email}
                </a>
              </Reveal>

              <Reveal className={styles.infoItem} delay={140}>
                <span className="eyebrow">Phone</span>
                <a
                  href={`tel:${brand.contact.phoneTel}`}
                  className={styles.infoLink}
                >
                  {brand.contact.phone}
                </a>
              </Reveal>

              <Reveal className={styles.infoItem} delay={200}>
                <span className="eyebrow">Studio</span>
                <p className={styles.infoText}>{brand.contact.location}</p>
              </Reveal>

              <Reveal className={styles.infoItem} delay={260}>
                <span className="eyebrow">Instagram</span>
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
                <span className="eyebrow">Hours</span>
                <p className={styles.infoText}>
                  Sunday – Thursday
                  <br />
                  09:00 – 18:00 GST
                </p>
              </Reveal>

              <div className={styles.divider} />

              <Reveal as="p" className={styles.notice} delay={380}>
                We accept a small number of new projects each year. To begin a
                conversation, please share a brief outline of your space and
                ambition — we'll respond personally within two working days.
              </Reveal>
            </aside>

            {/* Right column — Form */}
            <div className={styles.formWrap}>
              <Reveal>
                <h2 className={styles.formHeading}>
                  Begin a <em className="italic">project.</em>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars footer band */}
      <section className={styles.pillarsBand}>
        <div className="container">
          <Reveal className={styles.pillarsInner}>
            <p className="eyebrow">
              <span className="gold-stroke" /> A signature
            </p>
            <p className={styles.pillarsLine}>
              Quiet Luxury · <em className="italic">Intentional</em> · Timeless
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
