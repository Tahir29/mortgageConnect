import { AboutHero, MDSection, MissionVision, CoreValues, WhyWeBuiltThis } from "@/components/about";
import { Stats, CTABanner } from "@/components/common";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const metadata = {
  title: "About Us | Our Story & Mission",
  description:
    "Learn about Mortgage Connect UAE — the first structured mortgage broker marketplace in the UAE. Our mission is to connect homebuyers with verified, commission-free mortgage professionals.",
  keywords: [
    "about mortgage connect UAE",
    "mortgage platform UAE",
    "Ehsan Jamshidzadeh",
    "mortgage marketplace UAE",
    "verified mortgage brokers UAE",
  ],
  alternates: {
    canonical: `${baseUrl}/about-us`,
  },
  openGraph: {
    title: "About Mortgage Connect UAE | Our Story & Mission",
    description:
      "The first structured mortgage broker marketplace in the UAE — built for transparency, trust, and zero fees.",
    url: `${baseUrl}/about-us`,
    type: "website",
    locale: "en_AE",
    siteName: "Mortgage Connect",
    images: [
      {
        url: `${baseUrl}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About Mortgage Connect UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mortgage Connect UAE | Our Story & Mission",
    description:
      "The first structured mortgage broker marketplace in the UAE — built for transparency, trust, and zero fees.",
    images: [`${baseUrl}/og-about.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <MDSection />
      <MissionVision />
      <CoreValues />
      <Stats />
      <WhyWeBuiltThis />
      <CTABanner />
    </>
  );
}
