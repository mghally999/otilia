import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import RevealObserver from "@/components/RevealObserver";
import ScrollProgress from "@/components/ScrollProgress";
import { brand } from "@/data/brand";
import "./globals.css";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#5B4636" },
    { media: "(prefers-color-scheme: light)", color: "#E8DEC9" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const SITE_URL = "https://otiliainteriors.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OTILÌA — Bespoke Interior & Exterior Design, Abu Dhabi",
    template: "%s · OTILÌA Interior Design",
  },
  description:
    "OTILÌA crafts timeless, bespoke interiors for residences, restaurants, and hospitality across the UAE. Quiet Luxury · Intentional · Timeless.",
  keywords: [
    "Interior design Abu Dhabi",
    "Luxury interior design",
    "Bespoke interiors UAE",
    "Residential interior design",
    "Commercial interior design",
    "OTILIA",
    "OTILÌA",
    "Aysha Al Tenaji",
    "Italian kitchen design",
    "French Art Deco interior",
    "Restaurant interior design Abu Dhabi",
  ],
  applicationName: "OTILÌA Interior Design",
  authors: [{ name: "OTILÌA Studio" }],
  creator: "OTILÌA",
  publisher: "OTILÌA",
  alternates: {
    canonical: "/",
    languages: { "en-AE": "/", "ar-AE": "/" },
  },
  openGraph: {
    title: "OTILÌA — Bespoke Interior Design, Abu Dhabi",
    description:
      "Timeless, bespoke interiors for residences and hospitality. Quiet Luxury · Intentional · Timeless.",
    url: SITE_URL,
    siteName: "OTILÌA Interior Design",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "OTILÌA Interior Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTILÌA — Bespoke Interior Design, Abu Dhabi",
    description: "Quiet Luxury · Intentional · Timeless. Bespoke interiors across the UAE.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  formatDetection: { telephone: true, email: true, address: true },
  category: "design",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "OTILÌA Interior Design",
      alternateName: "OTILIA",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description: brand.description,
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Abu Dhabi",
          addressCountry: "AE",
        },
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: brand.contact.phone,
        email: brand.contact.email,
        contactType: "customer support",
        areaServed: ["AE", "Worldwide"],
        availableLanguage: ["en", "ar"],
      },
      founder: {
        "@type": "Person",
        name: brand.founder.name,
        jobTitle: brand.founder.role,
      },
      sameAs: [brand.contact.instagramUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "OTILÌA Interior Design",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-AE",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "OTILÌA Interior Design Studio",
      image: `${SITE_URL}/og.jpg`,
      url: SITE_URL,
      telephone: brand.contact.phone,
      email: brand.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abu Dhabi",
        addressCountry: "AE",
      },
      priceRange: "$$$$",
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
    >
      <head>
        {/* Font preconnect — saves a round-trip to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Editorial display + body + Arabic — display=swap so text paints immediately */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&family=Noto+Kufi+Arabic:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap"
        />
        {/* Set theme + dir before paint to prevent FOUC and direction flash */}
        <Script
          id="locale-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('otilia-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}var p=window.location.pathname;var ar=p==='/ar'||p.indexOf('/ar/')===0;var h=document.documentElement;h.lang=ar?'ar':'en';h.dir=ar?'rtl':'ltr';if(ar){h.classList.add('is-ar');}else{h.classList.remove('is-ar');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>

        <Nav />
        <ScrollProgress />
        <Cursor />
        <RevealObserver />

        {children}

        <Footer />

        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
