import { AgentHero, AgentsGrid } from "@/components/agent";
import { BankMarquee } from "@/components/home";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const metadata = {
  title: "Our Agents | Browse Verified Mortgage Consultants in UAE",
  description:
    "Browse verified mortgage consultants across Dubai, Abu Dhabi, Sharjah and all UAE emirates. Filter by specialty, location, language, or company. Connect instantly — completely free.",
  keywords: [
    "mortgage consultants UAE",
    "mortgage agents Dubai",
    "mortgage broker Abu Dhabi",
    "Islamic finance consultant UAE",
    "refinancing agent Dubai",
    "home finance advisor UAE",
    "mortgage agent Sharjah",
  ],
  alternates: {
    canonical: `${baseUrl}/our-agents`,
  },
  openGraph: {
    title: "Browse Verified Mortgage Agents in UAE | Mortgage Connect",
    description:
      "Find and connect with verified mortgage professionals across all 7 emirates — instantly, transparently, and for free.",
    url: `${baseUrl}/our-agents`,
    type: "website",
    locale: "en_AE",
    siteName: "Mortgage Connect",
    images: [
      {
        url: `${baseUrl}/og-agents.jpg`,
        width: 1200,
        height: 630,
        alt: "Verified Mortgage Agents in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Verified Mortgage Agents in UAE | Mortgage Connect",
    description:
      "Find and connect with verified mortgage professionals across all 7 emirates — instantly and for free.",
    images: [`${baseUrl}/og-agents.jpg`],
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

export default function OurAgents() {
  return (
    <>
      <AgentHero />
      <AgentsGrid />
      <BankMarquee />
    </>
  );
}
