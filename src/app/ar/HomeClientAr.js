"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal, MaskedHeading } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { brand, services, principles, stats, ui } from "@/data/brand.ar";
import { projects } from "@/data/projects.ar";
import styles from "../home.module.css";

export default function HomeClientAr() {
  const heroRef = useRef(null);
  const [heroP, setHeroP] = useState(0);

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

  const t = ui.labels.home;

  return (
    <main id="main">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className={styles.hero} aria-label="أوتيليا">
        <div
          className={styles.heroBg}
          style={{ transform: `scale(${1 + heroP * 0.18}) translate3d(0, ${heroP * 4}%, 0)` }}
        >
          <Image
            src={projects[0].hero}
            alt=""
            fill priority
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
            {t.heroEyebrow}
          </div>

          <MaskedHeading
            as="h1"
            className={`display ${styles.heroTitle}`}
            lines={[
              <span key="1">غرفٌ هادئة،</span>,
              <span key="2"><em className="italic">مُؤلَّفة</em> لطول الزمن.</span>,
            ]}
          />

          <Reveal delay={500} className={styles.heroSub}>
            <p className="lead">
              تصمّم أوتيليا فضاءاتٍ خاصة للمساكن والضيافة في أرجاء الإمارات العربية المتحدة. كل مشروع يبدأ بحوار، وينتهي بغرفةٍ تسكنها لعقود.
            </p>
          </Reveal>

          <Reveal delay={700} className={styles.heroCta}>
            <Link href="/ar/projects" className="btn">
              {ui.buttons.viewProjects} <span aria-hidden>←</span>
            </Link>
            <Link href="/ar/contact" className="link-arrow">{ui.buttons.beginProject}</Link>
          </Reveal>
        </div>

        {/* Edge labels (desktop only) */}
        <div className={styles.heroLabelLeft} aria-hidden="true">
          <span className="eyebrow">الاستوديو</span>
          <span>أبو ظبي · الإمارات</span>
        </div>
        <div className={styles.heroLabelRight} aria-hidden="true">
          <span className="eyebrow">تأسّس</span>
          <span>MMXVII</span>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>اسحب</span>
          <span className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee items={[...brand.pillars, "مُؤلَّف", "نادر", "محرَّر"]} speed={50} />

      {/* ===== PHILOSOPHY ===== */}
      <section className={`section ${styles.philosophy}`}>
        <div className="container">
          <div className={styles.phGrid}>
            <Reveal>
              <span className="eyebrow">
                <span className="gold-stroke" />{t.philosophyKicker}
              </span>
            </Reveal>
            <div>
              <MaskedHeading
                as="h2"
                className={`h1 ${styles.phHeading}`}
                lines={[
                  <span key="1">في عالم الفخامة،</span>,
                  <span key="2"><em>تتألق الندرة</em> أكثر من الذهب.</span>,
                ]}
              />
              <Reveal delay={400} className={styles.phLead}>
                <p className="lead">
                  نؤمن أنّ أبدع ما تقدّمه الغرفة هو الصمت — هدوءٌ يولد من أشياء أقل وأفضل، تُحرَّر حتى يبدو ما تبقّى حتميًا.
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
              <span className="eyebrow"><span className="gold-stroke" />{t.workKicker}</span>
            </Reveal>
            <MaskedHeading
              id="work-title"
              as="h2"
              className={`display ${styles.workTitle}`}
              lines={[
                <span key="1">ست غرف،</span>,
                <span key="2"><em>ست</em> قناعات.</span>,
              ]}
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
                  href={`/ar/projects/${p.slug}`}
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
                    <span className={styles.workArrow} aria-hidden="true">←</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className={styles.workMore}>
            <Link href="/ar/projects" className="btn btn--ghost">
              {ui.buttons.viewAll} <span aria-hidden>←</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== SERVICES TICKER ===== */}
      <section className={`section ${styles.services}`} aria-labelledby="svc-title">
        <div className="container">
          <div className={styles.svcHead}>
            <Reveal>
              <span className="eyebrow"><span className="gold-stroke" />{t.servicesKicker}</span>
            </Reveal>
            <MaskedHeading
              as="h2"
              id="svc-title"
              className={`h1 ${styles.svcTitle}`}
              lines={["من رسمةٍ أولى،", "إلى آخر لمسة."]}
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
            <Link href="/ar/services" className="link-arrow">{ui.buttons.viewAll}</Link>
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
                alt="فضاء داخلي من أوتيليا — ضوء ناعم على الجص والبلوط والحجر."
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                quality={75}
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          <div className={styles.aboutCopy}>
            <Reveal>
              <span className="eyebrow"><span className="gold-stroke" />{t.aboutTeaserKicker}</span>
            </Reveal>
            <MaskedHeading
              as="h2"
              className={`h1 ${styles.aboutHeading}`}
              lines={[
                <span key="1"><em>عائشة</em> آل تنيجي،</span>,
                <span key="2">المؤسِّسة.</span>,
              ]}
            />
            <Reveal delay={200}>
              <p className={`lead ${styles.aboutLead}`}>
                {brand.founder.bio}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <Link href="/ar/about" className="link-arrow">{ui.buttons.viewAll}</Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
