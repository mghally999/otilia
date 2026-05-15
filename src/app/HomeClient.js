"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal, MaskedHeading } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { brand, services, principles, stats } from "@/data/brand";
import { projects } from "@/data/projects";
import styles from "./home.module.css";

export default function HomeClient() {
  const heroRef = useRef(null);
  const [heroP, setHeroP] = useState(0);

  // Tiny parallax on hero — single rAF loop, scaled to viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const loop = () => {
      const p = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
      setHeroP(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main id="main">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className={styles.hero} aria-label="Welcome to OTILÌA">
        <div
          className={styles.heroBg}
          style={{ transform: `scale(${1 + heroP * 0.18}) translate3d(0, ${heroP * 4}%, 0)` }}
        >
          <Image
            src={projects[0].hero}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={75}
            placeholder="empty"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroContent} style={{
          transform: `translate3d(0, ${heroP * -40}px, 0)`,
          opacity: 1 - heroP * 0.65,
        }}>
          <div className={styles.heroEyebrow}>
            <span className="gold-stroke" />
            Interior &nbsp;·&nbsp; Exterior &nbsp;·&nbsp; Bespoke
          </div>

          <MaskedHeading
            as="h1"
            className={`display ${styles.heroTitle}`}
            lines={["Quiet rooms,", <em key="i">authored</em>, "for the long arc."]}
          />

          <Reveal delay={500} className={styles.heroSub}>
            <p className="lead">
              OTILÌA crafts bespoke interiors for residences and hospitality across
              the United Arab Emirates. Every project begins with a conversation,
              ends with a room you live in for decades.
            </p>
          </Reveal>

          <Reveal delay={700} className={styles.heroCta}>
            <Link href="/projects" className="btn">
              View Projects <span aria-hidden>→</span>
            </Link>
            <Link href="/contact" className="link-arrow">Begin a Project</Link>
          </Reveal>
        </div>

        {/* Edge labels (desktop only) */}
        <div className={styles.heroLabelLeft} aria-hidden="true">
          <span className="eyebrow">Studio</span>
          <span>Abu Dhabi · UAE</span>
        </div>
        <div className={styles.heroLabelRight} aria-hidden="true">
          <span className="eyebrow">Established</span>
          <span>MMXVI</span>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>Scroll</span>
          <span className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee items={[...brand.pillars, "Bespoke", "Authored", "Considered"]} speed={50} />

      {/* ===== PHILOSOPHY ===== */}
      <section className={`section ${styles.philosophy}`}>
        <div className="container">
          <div className={styles.phGrid}>
            <Reveal>
              <span className="eyebrow">
                <span className="gold-stroke" />Our Philosophy
              </span>
            </Reveal>
            <div>
              <MaskedHeading
                as="h2"
                className={`h1 ${styles.phHeading}`}
                lines={[
                  "In the realm of luxury,",
                  <span key="2"><em>rarity</em> gleams</span>,
                  "brighter than gold.",
                ]}
              />
              <Reveal delay={400} className={styles.phLead}>
                <p className="lead">
                  We believe the most luxurious thing a room can offer is silence —
                  the kind of stillness that comes from fewer, better things, edited
                  until what remains feels inevitable.
                </p>
              </Reveal>
            </div>
          </div>

          <div className={styles.principles}>
            {principles.map((pr, i) => (
              <Reveal key={pr.label} delay={i * 100} className={styles.principle}>
                <div className={styles.principleNum}>0{i + 1}</div>
                <h3 className="h3">{pr.label}</h3>
                <p>{pr.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SELECTED PROJECTS ===== */}
      <section className={`section ${styles.work}`} aria-labelledby="work-title">
        <div className="container">
          <div className={styles.workHead}>
            <Reveal>
              <span className="eyebrow"><span className="gold-stroke" />Selected Work</span>
            </Reveal>
            <MaskedHeading
              id="work-title"
              as="h2"
              className={`display ${styles.workTitle}`}
              lines={["Six rooms.", <em key="i">Six</em>, "convictions."]}
            />
          </div>

          <div className={styles.workGrid}>
            {projects.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 80}
                className={`${styles.workCard} ${styles[`workCard${(i % 6) + 1}`]}`}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className={styles.workLink}
                  data-cursor="hover"
                >
                  <div className={styles.workMedia}>
                    <Image
                      src={p.thumb}
                      alt={`${p.title} — ${p.subtitle}`}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={70}
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.workMediaOverlay} aria-hidden="true" />
                  </div>
                  <div className={styles.workInfo}>
                    <span className={styles.workNum}>{p.number}</span>
                    <div>
                      <div className={styles.workCat}>{p.category} · {p.year}</div>
                      <h3 className={`h3 italic ${styles.workTitleSmall}`}>{p.title}</h3>
                      <div className={styles.workSub}>{p.subtitle}</div>
                    </div>
                    <span className={styles.workArrow} aria-hidden="true">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className={styles.workMore}>
            <Link href="/projects" className="btn btn--ghost">
              See All Projects <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== SERVICES TICKER ===== */}
      <section className={`section ${styles.services}`} aria-labelledby="svc-title">
        <div className="container">
          <div className={styles.svcHead}>
            <Reveal>
              <span className="eyebrow"><span className="gold-stroke" />What We Do</span>
            </Reveal>
            <MaskedHeading
              as="h2"
              id="svc-title"
              className={`h1 ${styles.svcTitle}`}
              lines={["From sketch", "to last reveal."]}
            />
          </div>

          <ul className={styles.svcList}>
            {services.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 60} className={styles.svcItem}>
                <span className={styles.svcN}>{s.n}</span>
                <h3 className={`h3 italic ${styles.svcItemTitle}`}>{s.title}</h3>
                <p className={styles.svcDesc}>{s.desc}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className={styles.svcCta}>
            <Link href="/services" className="link-arrow">All Services</Link>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={`section--tight ${styles.stats}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className={styles.stat}>
                <div className={`display italic ${styles.statN}`}>{s.n}</div>
                <div className="eyebrow">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className={`section ${styles.about}`}>
        <div className={`container ${styles.aboutInner}`}>
          <Reveal className={styles.aboutMedia}>
            <div className={styles.aboutImageWrap}>
              <Image
                src={projects[1].images[1]}
                alt="An OTILÌA interior — soft light on plaster, oak, stone."
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                quality={75}
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          <div className={styles.aboutCopy}>
            <Reveal>
              <span className="eyebrow"><span className="gold-stroke" />The Studio</span>
            </Reveal>
            <MaskedHeading
              as="h2"
              className={`h1 ${styles.aboutHeading}`}
              lines={[<em key="i">Aysha</em>, "Al Tenaji,", "Founder."]}
            />
            <Reveal delay={200}>
              <p className={`lead ${styles.aboutLead}`}>
                {brand.founder.bio}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <Link href="/about" className="link-arrow">Read the Studio Story</Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
