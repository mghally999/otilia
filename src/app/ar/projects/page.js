import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects.ar";
import { ui } from "@/data/brand.ar";
import { Reveal, MaskedHeading } from "@/components/Reveal";
import styles from "../../projects/projects.module.css";

export const metadata = {
  title: "الأعمال · فضاءات داخلية مختارة",
  description:
    "أعمال سكنية وتجارية مختارة من أوتيليا — مطابخ إيطالية، غرف نوم فرنسية، مطاعم وضيافة عبر الإمارات.",
  alternates: { canonical: "/ar/projects", languages: { "en-AE": "/projects" } },
};

export default function ProjectsAr() {
  return (
    <main id="main">
      <header className={`section--tight ${styles.header}`}>
        <div className="container">
          <Reveal>
            <span className="eyebrow"><span className="gold-stroke" />{ui.labels.selectedWork}</span>
          </Reveal>
          <MaskedHeading
            as="h1"
            className={`display ${styles.h1}`}
            lines={["محفظة من", <em key="i">ست غرف.</em>]}
          />
          <Reveal delay={300}>
            <p className={`lead ${styles.lead}`}>
              {ui.labels.projects.heroLead}
            </p>
          </Reveal>
        </div>
      </header>

      <section className={styles.list}>
        <div className="container">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className={styles.row}>
              <Link
                href={`/ar/projects/${p.slug}`}
                className={`${styles.rowLink} ${i % 2 === 0 ? styles.rowLeft : styles.rowRight}`}
                data-cursor="view"
                data-cursor-label="عرض المشروع"
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
                  <div className={styles.rowNumber}>{p.number} / ٠٦</div>
                  <h2 className={`h1 italic ${styles.rowTitle}`}>{p.title}</h2>
                  <div className={styles.rowSub}>{p.subtitle}</div>
                  <dl className={styles.rowDl}>
                    <div><dt>{ui.labels.eyebrow.type}</dt><dd>{p.category}</dd></div>
                    <div><dt>{ui.labels.eyebrow.location}</dt><dd>{p.location}</dd></div>
                    <div><dt>{ui.labels.eyebrow.year}</dt><dd>{p.year}</dd></div>
                    <div><dt>{ui.labels.eyebrow.surface}</dt><dd>{p.surface}</dd></div>
                  </dl>
                  <span className="link-arrow">{ui.buttons.viewProject}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
