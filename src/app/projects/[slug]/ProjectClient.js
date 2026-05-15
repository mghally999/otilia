"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal, MaskedHeading } from "@/components/Reveal";
import { projects } from "@/data/projects";
import styles from "./project.module.css";

export default function ProjectClient({ project }) {
  const [heroP, setHeroP] = useState(0);
  const [lightbox, setLightbox] = useState(null); // index of open image, or null
  const [copied, setCopied] = useState(null); // copied hex
  const heroRef = useRef(null);

  // Parallax hero
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

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % project.images.length);
      else if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + project.images.length) % project.images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, project.images.length]);

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const copyHex = useCallback((hex) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopied(hex);
    setTimeout(() => setCopied(null), 1400);
  }, []);

  return (
    <main id="main">
      <article>
        {/* HERO */}
        <header ref={heroRef} className={styles.hero}>
          <div
            className={styles.heroBg}
            style={{ transform: `scale(${1 + heroP * 0.18}) translateY(${heroP * 5}%)` }}
          >
            <Image
              src={project.hero}
              alt=""
              fill priority sizes="100vw" quality={75}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.heroOverlay} aria-hidden="true" />

          <div className={styles.heroContent} style={{
            transform: `translate3d(0, ${heroP * -50}px, 0)`,
            opacity: 1 - heroP * 0.7,
          }}>
            <Reveal>
              <span className={styles.heroEyebrow}>
                <span className="gold-stroke" />
                Project {project.number} of 06
              </span>
            </Reveal>
            <MaskedHeading as="h1" className={`display ${styles.heroTitle}`} lines={[project.title]} />
            <Reveal delay={400}>
              <p className={`lead ${styles.heroSub}`}>{project.subtitle}</p>
            </Reveal>
          </div>

          <div className={styles.heroScroll} aria-hidden="true">
            <span /> Scroll
          </div>
        </header>

        {/* FACTS */}
        <section className={`section--tight ${styles.facts}`}>
          <div className="container">
            <Reveal className={styles.factsHead}>
              <span className="eyebrow">Project Brief</span>
              <p className={`lead ${styles.summary}`}>{project.summary}</p>
            </Reveal>

            <dl className={styles.factsGrid}>
              {[
                ["Type", project.category],
                ["Location", project.location],
                ["Year", project.year],
                ["Surface", project.surface],
                ["Duration", project.duration],
                ["Discipline", project.discipline.join(" · ")],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 60} className={styles.fact}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </Reveal>
              ))}
            </dl>

            {/* Palette — click to copy */}
            <Reveal className={styles.paletteWrap} delay={300}>
              <span className="eyebrow">Material Palette · click to copy</span>
              <div className={styles.palette}>
                {project.palette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => copyHex(c)}
                    className={styles.swatch}
                    data-cursor="hover"
                    data-cursor-label={copied === c ? "Copied" : "Copy"}
                    aria-label={`Copy color ${c}`}
                  >
                    <div className={styles.swatchColor} style={{ background: c }} />
                    <span className={styles.swatchHex}>{copied === c ? "Copied ✓" : c}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CHAPTERS */}
        <section className={styles.chapters}>
          <div className="container">
            {project.chapters.map((c, i) => (
              <div key={i} className={`${styles.chapter} ${i % 2 ? styles.chapterRight : styles.chapterLeft}`}>
                <Reveal className={styles.chapterMedia}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i % project.images.length)}
                    className={styles.chapterImageWrap}
                    data-cursor="view"
                    data-cursor-label="Expand"
                    aria-label={`View larger image — ${c.title}`}
                  >
                    <Image
                      src={project.images[i % project.images.length]}
                      alt={`${project.title} — ${c.title}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 60vw"
                      quality={75}
                      style={{ objectFit: "cover" }}
                      className={styles.chapterImage}
                    />
                    <span className={styles.chapterImageBadge}>
                      <span>0{i + 1}</span>
                    </span>
                  </button>
                </Reveal>

                <div className={styles.chapterCopy}>
                  <Reveal delay={200}>
                    <span className="eyebrow">
                      <span className="gold-stroke" />
                      Chapter {String(i + 1).padStart(2, "0")} · {c.kicker}
                    </span>
                  </Reveal>
                  <MaskedHeading as="h2" className={`h1 ${styles.chapterTitle}`} lines={[c.title]} />
                  <Reveal delay={400} className={styles.chapterBody}>
                    <p>{c.body}</p>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className={styles.gallery}>
          <Reveal className={styles.galleryFull}>
            <button
              type="button"
              onClick={() => setLightbox(2 % project.images.length)}
              className={styles.galleryFullImage}
              data-cursor="view"
              data-cursor-label="Expand"
            >
              <Image
                src={project.images[2 % project.images.length]}
                alt={`${project.title} — interior detail`}
                fill sizes="100vw" quality={80}
                style={{ objectFit: "cover" }}
                className={styles.galleryFullImg}
              />
            </button>
          </Reveal>

          <div className={`container ${styles.galleryGrid}`}>
            {project.images.slice(0, 4).map((src, i) => (
              <Reveal key={i} delay={i * 80} className={styles.galleryItem}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={styles.galleryImageWrap}
                  data-cursor="view"
                  data-cursor-label="Expand"
                  aria-label={`View ${project.title} image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — view ${i + 1}`}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    quality={72}
                    style={{ objectFit: "cover" }}
                    className={styles.galleryImg}
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* QUOTE */}
        <section className={`section ${styles.quote}`}>
          <div className="container">
            <Reveal>
              <blockquote className={styles.quoteText}>
                <span className={styles.quoteMark} aria-hidden="true">"</span>
                {project.chapters[project.chapters.length - 1].body}
              </blockquote>
              <div className={styles.quoteAttr}>
                <span className="gold-stroke" />
                Aysha Al Tenaji · Founder
              </div>
            </Reveal>
          </div>
        </section>

        {/* NEXT */}
        <section className={styles.next}>
          <Link
            href={`/projects/${next.slug}`}
            className={styles.nextLink}
            data-cursor="view"
            data-cursor-label="Next"
          >
            <div className={styles.nextMedia}>
              <Image
                src={next.hero}
                alt={next.title}
                fill sizes="100vw" quality={70}
                style={{ objectFit: "cover" }}
                className={styles.nextImg}
              />
              <div className={styles.nextOverlay} aria-hidden="true" />
            </div>
            <div className={styles.nextCopy}>
              <span className="eyebrow"><span className="gold-stroke" />Next Project</span>
              <h2 className={`display italic ${styles.nextTitle}`}>{next.title}</h2>
              <span className={styles.nextSub}>{next.subtitle}</span>
              <span className={styles.nextArrow} aria-hidden="true">→</span>
            </div>
          </Link>
        </section>
      </article>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            data-cursor="hover"
          >
            ×
          </button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + project.images.length) % project.images.length); }}
            aria-label="Previous image"
            data-cursor="hover"
          >
            ←
          </button>
          <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={project.images[lightbox]}
              alt={`${project.title} — image ${lightbox + 1}`}
              fill
              sizes="90vw"
              quality={90}
              style={{ objectFit: "contain" }}
            />
          </div>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % project.images.length); }}
            aria-label="Next image"
            data-cursor="hover"
          >
            →
          </button>
          <div className={styles.lightboxCount}>
            {String(lightbox + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </main>
  );
}
