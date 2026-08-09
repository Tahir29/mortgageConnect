import { AgentHero, AgentsGrid } from "@/components/agent";
import { BankMarquee } from "@/components/home";
import { agents } from "@/lib/helper";
import { baseUrl } from "@/lib/config";
import { JsonLd } from "@/components/common";
import { agentListSchema, breadcrumbSchema } from "@/lib/schema";


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
        url: `${baseUrl}/og-image.jpg`,
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

export default async function OurAgents({ searchParams }) {
  // Deep link from a company card: /our-agents?company=Baytech%20Mortgage%20Broker
  // Ignore anything that isn't a company we actually list, so a stale or hand-typed
  // link falls back to the full grid instead of an empty state.
  const { company } = await searchParams;
  const requested = Array.isArray(company) ? company[0] : company;
  const initialCompany = agents.some((a) => a.company === requested) ? requested : "";

  return (
    <>
      <JsonLd data={agentListSchema(agents)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Our Agents", path: "/our-agents" },
      ])} />
      <AgentHero />
      <AgentsGrid initialCompany={initialCompany} />
      <BankMarquee />
    </>
  );
}
