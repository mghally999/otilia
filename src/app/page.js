import HomeClient from "./HomeClient";

export const metadata = {
  title: "OTILÌA — Bespoke Interior Design, Abu Dhabi",
  description:
    "OTILÌA is an Abu Dhabi-based interior design studio. We craft timeless, bespoke spaces — quiet luxury, intentional, timeless. View selected residential and commercial projects.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
