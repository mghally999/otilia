import Link from "next/link";

export const metadata = {
  title: "Page Not Found — OTILÌA",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <p
          className="eyebrow"
          style={{ marginBottom: 24, justifyContent: "center", display: "inline-flex", alignItems: "center" }}
        >
          <span className="gold-stroke" /> Error 404
        </p>
        <h1
          className="display"
          style={{
            fontSize: "clamp(64px, 12vw, 160px)",
            margin: "8px 0 16px",
            color: "var(--fg-strong)",
          }}
        >
          <em className="italic">Lost</em> in the floor plan.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "var(--fg-muted)",
            maxWidth: "44ch",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          The page you are looking for has either been moved, redrawn, or
          never existed. Let's walk you back to the entrance.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn">Return Home</Link>
          <Link href="/projects" className="btn btn--ghost">View Projects</Link>
        </div>
      </div>
    </main>
  );
}
