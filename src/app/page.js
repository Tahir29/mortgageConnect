import { Hero, HowItWorks, FeaturedAgents, WhyChooseUs, BankMarquee, MortgageCalculator } from '@/components/home' 
import { Stats, CTABanner } from "@/components/common";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const metadata = {
  title: "Mortgage Connect UAE | Find Trusted Mortgage Agents in UAE",
  description:
    "UAE's first verified mortgage broker marketplace. Find trusted, commission-free mortgage consultants across Dubai, Abu Dhabi, Sharjah and all 7 emirates. Use our free mortgage calculator.",
  keywords: [
    "mortgage agent UAE",
    "mortgage broker Dubai",
    "home loan UAE",
    "mortgage calculator UAE",
    "find mortgage agent Dubai",
    "best mortgage broker UAE",
  ],
  alternates: {
    canonical: `${baseUrl}/`,
  },
  openGraph: {
    title: "Mortgage Connect UAE | Find Trusted Mortgage Agents in UAE",
    description:
      "UAE's first verified mortgage broker marketplace. Find trusted, commission-free mortgage consultants across all 7 emirates.",
    url: `${baseUrl}/`,
    type: "website",
    locale: "en_AE",
    siteName: "Mortgage Connect",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mortgage Connect UAE Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Connect UAE | Find Trusted Mortgage Agents in UAE",
    description:
      "UAE's first verified mortgage broker marketplace. Connect with trusted mortgage consultants for free.",
    images: [`${baseUrl}/og-image.jpg`],
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

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <FeaturedAgents />
      <WhyChooseUs />
      <MortgageCalculator />
      <BankMarquee />
      <CTABanner />
    </>
  );
}
