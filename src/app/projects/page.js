import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Reveal, MaskedHeading } from "@/components/Reveal";
import styles from "./projects.module.css";

export const metadata = {
  title: "Projects · Selected Interiors",
  description:
    "Selected residential and commercial interior projects by OTILÌA — Italian kitchens, French bedrooms, restaurants and hospitality across the UAE.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <header className={`section--tight ${styles.header}`}>
        <div className="container">
          <Reveal>
            <span className="eyebrow"><span className="gold-stroke" />Selected Work · 2023 — 2025</span>
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.h1}`}
            lines={["A folio of", <em key="i">different spaces.</em>]}
          />
          <Reveal delay={300}>
            <p className={`lead ${styles.lead}`}>
              Each project below is one room — held under one designer's pencil from the
              first sketch to the last reveal. We don't outsource. We don't subcontract
              the vision.
            </p>
          </Reveal>
        </div>
      </header>

      <section className={styles.list}>
        <div className="container">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className={styles.row}>
              <Link
                href={`/projects/${p.slug}`}
                className={`${styles.rowLink} ${i % 2 === 0 ? styles.rowLeft : styles.rowRight}`}
                data-cursor="view"
                data-cursor-label="View Case Study"
              >
                <div className={styles.rowMedia}>
                  <Image
                    src={p.thumb}
                    alt={`${p.title} — ${p.subtitle}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    quality={70}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.rowMeta}>
                  <div className={styles.rowNumber}>{p.number} / 06</div>
                  <h2 className={`h1 italic ${styles.rowTitle}`}>{p.title}</h2>
                  <div className={styles.rowSub}>{p.subtitle}</div>
                  <dl className={styles.rowDl}>
                    <div><dt>Type</dt><dd>{p.category}</dd></div>
                    <div><dt>Location</dt><dd>{p.location}</dd></div>
                    <div><dt>Year</dt><dd>{p.year}</dd></div>
                    <div><dt>Surface</dt><dd>{p.surface}</dd></div>
                  </dl>
                  <span className="link-arrow">View Case Study</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
