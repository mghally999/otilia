"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { brand as brandEn } from "@/data/brand";
import { brand as brandAr, ui as uiAr } from "@/data/brand.ar";
import styles from "./Footer.module.css";

export default function Footer() {
  const path = usePathname() || "/";
  const isAr = path === "/ar" || path.startsWith("/ar/");

  const brand = isAr ? brandAr : brandEn;
  const t = isAr
    ? {
        beginProject: "ابدأ مشروعًا",
        ctaTitle: ["دعنا نُصمّم", "مساحتك."],
        startConversation: "ابدأ حوارًا",
        studio: "الاستوديو",
        contact: "تواصل",
        follow: "تابعنا",
        about: "عن الاستوديو",
        services: "الخدمات",
        projects: "الأعمال",
        contactLink: "اتصل بنا",
        legal: `© ${new Date().getFullYear()} أوتيليا للتصميم الداخلي. جميع الحقوق محفوظة.`,
        sub: "صُمِّم في أبو ظبي · صُنع بنيّة.",
        instagram: "إنستغرام",
        tiktok: "تيك توك",
        prefix: "/ar",
      }
    : {
        beginProject: "Begin a project",
        ctaTitle: ["Let us", "design", "your space."],
        startConversation: "Start a Conversation",
        studio: "Studio",
        contact: "Contact",
        follow: "Follow",
        about: "About",
        services: "Services",
        projects: "Projects",
        contactLink: "Contact",
        legal: `© ${new Date().getFullYear()} OTILÌA Interior Design. All rights reserved.`,
        sub: "Designed in Abu Dhabi · Crafted with intention.",
        instagram: "Instagram",
        tiktok: "TikTok",
        prefix: "",
      };

  const links = {
    about: `${t.prefix}/about`,
    services: `${t.prefix}/services`,
    projects: `${t.prefix}/projects`,
    contact: `${t.prefix}/contact`,
  };

  return (
    <footer className={styles.footer} dir={isAr ? "rtl" : "ltr"}>
      <div className={styles.top}>
        <div className={`container ${styles.topInner}`}>
          <div className={`reveal ${styles.cta}`}>
            <span className="eyebrow">
              <span className="gold-stroke" />
              {t.beginProject}
            </span>
            <h2 className={`h1 italic ${styles.ctaTitle}`}>
              {t.ctaTitle.map((line, i) => (
                <span key={i}>{line}{i < t.ctaTitle.length - 1 && <br />}</span>
              ))}
            </h2>
            <Link href={links.contact} className="btn" data-cursor="hover">
              {t.startConversation}
              <span aria-hidden="true">{isAr ? "←" : "→"}</span>
            </Link>
          </div>

          <aside className={`reveal ${styles.aside}`} style={{ transitionDelay: "120ms" }}>
            <p className="lead">{brand.description}</p>
          </aside>
        </div>
      </div>

      <div className="divider" />

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div className={styles.col}>
            <Logo variant="stack" width={160} height={48} />
            <p className={styles.tagline}>
              {brand.pillars.join(" · ")}
            </p>
          </div>

          <div className={styles.col}>
            <div className="eyebrow">{t.studio}</div>
            <Link href={links.about}>{t.about}</Link>
            <Link href={links.services}>{t.services}</Link>
            <Link href={links.projects}>{t.projects}</Link>
            <Link href={links.contact}>{t.contactLink}</Link>
            <a href="/otilia-company-profile.pdf" download>
              {isAr ? "تحميل ملف الشركة" : "Download Company Profile"}
            </a>
          </div>

          <div className={styles.col}>
            <div className="eyebrow">{t.contact}</div>
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
            <a href={`tel:${brand.contact.phoneTel}`}>{brand.contact.phone}</a>
            <span>{brand.contact.location}</span>
          </div>

          <div className={styles.col}>
            <div className="eyebrow">{t.follow}</div>
            <a
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.instagram} — {brand.contact.instagram}
            </a>
            <a
              href={brand.contact.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.tiktok} — {brand.contact.tiktok}
            </a>
          </div>
        </div>

        <div className={`container ${styles.legal}`}>
          <span>{t.legal}</span>
          <span>{t.sub}</span>
        </div>
      </div>
    </footer>
  );
}
