import { brand } from "@/data/brand.ar";

const SITE_URL = "https://otiliainteriors.com";

export const metadata = {
  title: {
    default: "أوتيليا — تصميم داخلي وخارجي راقٍ، دبي",
    template: "%s · أوتيليا للتصميم الداخلي",
  },
  description:
    "تصمّم أوتيليا فضاءات داخلية خالدة ومصمَّمة خصيصًا للمنازل والمطاعم والضيافة عبر الإمارات. فخامة · بساطة · أناقة.",
  alternates: {
    canonical: "/ar",
    languages: { "en-AE": "/", "ar-AE": "/ar" },
  },
  openGraph: {
    title: "أوتيليا — تصميم داخلي راقٍ، دبي",
    description: "فضاءات داخلية خالدة ومصمَّمة خصيصًا للمنازل والضيافة. فخامة · بساطة · أناقة.",
    url: `${SITE_URL}/ar`,
    siteName: "أوتيليا للتصميم الداخلي",
    locale: "ar_AE",
    type: "website",
  },
};

// Arabic layout — sets dir/lang on the wrapper div so styles target it via
// either [dir="rtl"] OR .ar-root selectors. The inline script in root layout
// also sets <html lang="ar" dir="rtl"> on first paint so child elements that
// inherit (like <input>) and the browser's intrinsic RTL flow Just Work.
export default function ArLayout({ children }) {
  return (
    <div lang="ar" dir="rtl" className="ar-root" style={{ fontFamily: "var(--f-arabic)" }}>
      {children}
    </div>
  );
}
