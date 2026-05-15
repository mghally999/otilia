import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, MaskedHeading } from "@/components/Reveal";
import { services, brand } from "@/data/brand";
import styles from "./services.module.css";

export const metadata = {
  title: "Services — OTILÌA Interior Design",
  description:
    "Full-service interior design from OTILÌA — space planning, 3D visualisation, technical drawings, material curation, project direction, and bespoke furniture for residential and commercial projects across Abu Dhabi and the Gulf.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — OTILÌA Interior Design",
    description: "Six disciplines, one signature.",
    url: "/services",
  },
};

const processSteps = [
  {
    n: "I",
    label: "Discovery",
    body:
      "We begin with conversation — understanding how you live, how you host, and the way light falls in your home. No mood boards yet.",
  },
  {
    n: "II",
    label: "Concept",
    body:
      "A single direction, sketched and visualised. Materials, palette, and the room's emotional centre — agreed before we draw a line.",
  },
  {
    n: "III",
    label: "Documentation",
    body:
      "Full technical packages — drawings, schedules, specifications. Every joiner, mason and electrician works from one source of truth.",
  },
  {
    n: "IV",
    label: "Delivery",
    body:
      "We hold the project together until reveal. Site visits, snag lists, styling — finishing what we started.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main">
      <section className={styles.hero}>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            <span className="gold-stroke" /> 04 — Services
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.title}`}
            lines={["Six disciplines,", <em key="i" className="italic">one signature.</em>]}
          />
          <Reveal as="p" className={`lead ${styles.lead}`} delay={300}>
            From the first sketch to the last reveal, OTILÌA holds every
            project together as one studio — quietly precise, materially
            committed, signed by the founder herself.
          </Reveal>
        </div>
      </section>

      {/* SERVICES — alternating editorial rows */}
      <section className={`${styles.servicesSection}`}>
        <div className="container">
          {services.map((s, i) => (
            <article
              key={s.n}
              className={`${styles.serviceRow} ${i % 2 === 1 ? styles.serviceRowAlt : ""}`}
            >
              <Reveal className={styles.serviceMeta}>
                <span className={styles.serviceN}>{s.n}</span>
                <span className={styles.serviceTag}>
                  <span className="diamond" /> Discipline
                </span>
              </Reveal>
              <Reveal className={styles.serviceBody} delay={120}>
                <h2 className={styles.serviceTitle}>
                  {s.title.split(" ").map((w, idx, arr) =>
                    idx === arr.length - 1 ? (
                      <em key={idx} className="italic">{w}.</em>
                    ) : (
                      <span key={idx}>{w} </span>
                    )
                  )}
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
            <p className="eyebrow"><span className="gold-stroke" /> Process</p>
            <h2 className="h2">
              Four movements, <em className="italic">one room.</em>
            </h2>
          </Reveal>

          <Stagger className={styles.processGrid}>
            {processSteps.map((p) => (
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
                alt="A composed residential interior"
                width={1200}
                height={1500}
                className={styles.sectorImg}
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className={styles.sectorTag}>
                <span className="diamond" /> Residential
              </div>
            </Reveal>
            <div className={styles.sectorText}>
              <Reveal as="p" className="eyebrow">Sectors / Residential</Reveal>
              <Reveal>
                <h2 className={`h2 ${styles.sectorTitle}`}>
                  Homes that hold <em className="italic">a lifetime.</em>
                </h2>
              </Reveal>
              <Reveal as="p" className={styles.sectorBody} delay={150}>
                Villas, apartments, family homes. We design every room of the
                house to the same standard — kitchens that survive thirty years
                of weeknight dinners, bedrooms that quiet a busy mind, libraries
                where books actually live.
              </Reveal>
              <Reveal as="ul" className={styles.sectorList} delay={250}>
                <li>Private villas & estates</li>
                <li>Penthouses & duplexes</li>
                <li>Bedrooms & dressing rooms</li>
                <li>Kitchens, dining & entertaining spaces</li>
                <li>Home offices & libraries</li>
              </Reveal>
            </div>
          </div>

          <div className={`${styles.sectorsGrid} ${styles.sectorsGridReverse}`}>
            <Reveal className={styles.sectorMedia}>
              <Image
                src="/services/commercial.jpg"
                alt="A luxury commercial dining interior"
                width={1200}
                height={1500}
                className={styles.sectorImg}
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className={styles.sectorTag}>
                <span className="diamond" /> Commercial
              </div>
            </Reveal>
            <div className={styles.sectorText}>
              <Reveal as="p" className="eyebrow">Sectors / Commercial</Reveal>
              <Reveal>
                <h2 className={`h2 ${styles.sectorTitle}`}>
                  Spaces that <em className="italic">trade in feeling.</em>
                </h2>
              </Reveal>
              <Reveal as="p" className={styles.sectorBody} delay={150}>
                Restaurants, cafés, boutique hospitality. We design commercial
                rooms the way we design private ones — with a single emotional
                arc, a tightly edited material palette, and lighting that
                changes the whole conversation.
              </Reveal>
              <Reveal as="ul" className={styles.sectorList} delay={250}>
                <li>Restaurants & fine-dining concepts</li>
                <li>Cafés & lounges</li>
                <li>Boutique retail</li>
                <li>Workplaces & studios</li>
                <li>Hospitality fit-outs</li>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <Reveal className={styles.ctaInner}>
            <p className="eyebrow"><span className="gold-stroke" /> Begin</p>
            <h2 className={`display ${styles.ctaTitle}`}>
              Tell us about <em className="italic">your space.</em>
            </h2>
            <p className={styles.ctaSub}>
              We accept a small number of projects each year. If yours is one
              we can do well, we'd love to hear from you.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn">Begin a Project</Link>
              <a className="btn btn--ghost" href={`mailto:${brand.contact.email}`}>
                Email the Studio
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
