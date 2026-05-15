"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import styles from "./Nav.module.css";

const linksEn = [
  { href: "/",         label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact",  label: "Contact" },
];

const linksAr = [
  { href: "/ar",          label: "الرئيسية" },
  { href: "/ar/projects", label: "الأعمال" },
  { href: "/ar/about",    label: "الاستوديو" },
  { href: "/ar/services", label: "الخدمات" },
  { href: "/ar/contact",  label: "تواصل" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const path = usePathname() || "/";

  // Detect locale from path
  const isAr = path === "/ar" || path.startsWith("/ar/");
  const links = isAr ? linksAr : linksEn;
  const t = isAr
    ? {
        themeEspresso: "إسبريسو",
        themeBeige: "بيج",
        menuOpen: "القائمة",
        menuClose: "إغلاق",
        ariaPrimary: "التنقل الرئيسي",
        ariaSite: "الموقع",
        studio: "الاستوديو",
        reach: "تواصل",
        follow: "تابعنا",
        location: "أبو ظبي، الإمارات العربية المتحدة",
        switchTo: "EN",
        switchHref: getEnEquivalent(path),
      }
    : {
        themeEspresso: "Espresso",
        themeBeige: "Beige",
        menuOpen: "Menu",
        menuClose: "Close",
        ariaPrimary: "Primary",
        ariaSite: "Site",
        studio: "Studio",
        reach: "Reach",
        follow: "Follow",
        location: "Abu Dhabi, United Arab Emirates",
        switchTo: "ع",
        switchHref: getArEquivalent(path),
      };

  // Hydrate theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("otilia-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Sync html lang, dir, and is-ar class based on locale
  useEffect(() => {
    const html = document.documentElement;
    html.lang = isAr ? "ar" : "en";
    html.dir = isAr ? "rtl" : "ltr";
    if (isAr) {
      html.classList.add("is-ar");
    } else {
      html.classList.remove("is-ar");
    }
  }, [isAr]);

  // Scroll state
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close overlay on route change
  useEffect(() => { setOpen(false); }, [path]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("otilia-theme", next);
  };

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} dir={isAr ? "rtl" : "ltr"}>
        <div className={styles.bar}>
          <Link href={isAr ? "/ar" : "/"} className={styles.brand} aria-label="OTILÌA">
            <Logo variant="stack" width={148} height={44} />
          </Link>

          <nav className={styles.linksDesktop} aria-label={t.ariaPrimary}>
            {links.map((l) => {
              const isActive = path === l.href || (l.href !== "/" && l.href !== "/ar" && path.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                  data-cursor="hover"
                >
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <Link
              href={t.switchHref}
              className={styles.langSwitch}
              aria-label={isAr ? "Switch to English" : "التحويل إلى العربية"}
              data-cursor="hover"
            >
              {t.switchTo}
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              data-cursor="hover"
            >
              <span className={styles.themeDot} data-active={theme === "dark"}>{t.themeEspresso}</span>
              <span className={styles.themeSep}>/</span>
              <span className={styles.themeDot} data-active={theme === "light"}>{t.themeBeige}</span>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={styles.menuBtn}
              aria-label={open ? t.menuClose : t.menuOpen}
              aria-expanded={open}
              data-cursor="hover"
            >
              <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}>
                <i /><i /><i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menu */}
      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} aria-hidden={!open} dir={isAr ? "rtl" : "ltr"}>
        <div className={styles.overlayInner}>
          <nav className={styles.overlayNav} aria-label={t.ariaSite}>
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={styles.overlayLink}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                data-cursor="view"
              >
                <span className={styles.overlayLinkNum}>0{i + 1}</span>
                <span className={styles.overlayLinkText}>{l.label}</span>
              </Link>
            ))}
          </nav>
          <div className={styles.overlayMeta}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{t.studio}</div>
              <div>{t.location}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{t.reach}</div>
              <a href="mailto:Info@otiliainteriors.com">Info@otiliainteriors.com</a><br />
              <a href="tel:+971507440010">+971 507 440 010</a>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{t.follow}</div>
              <a href="https://instagram.com/otilia.interiors" target="_blank" rel="noopener noreferrer">
                @otilia.interiors
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Map an EN path to its AR equivalent (or fallback to /ar)
function getArEquivalent(path) {
  if (!path || path === "/") return "/ar";
  if (path.startsWith("/ar")) return path;
  return "/ar" + path;
}

// Map an AR path back to its EN equivalent
function getEnEquivalent(path) {
  if (!path) return "/";
  if (path === "/ar") return "/";
  if (path.startsWith("/ar/")) return path.replace(/^\/ar/, "");
  return path;
}
