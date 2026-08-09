import { agents, getCompanyByName, COMPANY_FALLBACK } from "@/lib/helper";
import { CompaniesHero, CompanyStats, CompaniesGrid, BankPartners } from "@/components/companies";
import { CTABanner } from "@/components/common";
import { baseUrl } from "@/lib/config";

// ─── Build companies server-side ─────────────────────────────
// Membership comes from how agents are tagged; branding is merged in from the
// company profiles, falling back to defaults when a company has no profile.
function buildCompanies(agents) {
  const map = {};
  agents.forEach((agent) => {
    if (!map[agent.company]) {
      map[agent.company] = {
        name: agent.company,
        agents: [],
        locations: new Set(),
        specialties: new Set(),
        languages: new Set(),
      };
    }
    map[agent.company].agents.push(agent);
    map[agent.company].locations.add(agent.location);
    map[agent.company].specialties.add(agent.specialty);
    agent.languages.forEach((l) => map[agent.company].languages.add(l));
  });

  return Object.values(map).map((c) => {
    const profile = getCompanyByName(c.name) ?? {};
    return {
      ...c,
      locations:   [...c.locations],
      specialties: [...c.specialties],
      languages:   [...c.languages],
      agentCount:  c.agents.length,
      topRating:   Math.max(...c.agents.map((a) => a.rating)),
      logo:        profile.logo      ?? COMPANY_FALLBACK.logo,
      logoTheme:   profile.logoTheme ?? COMPANY_FALLBACK.logoTheme,
      tagline:     profile.tagline   ?? COMPANY_FALLBACK.tagline,
    };
  });
}


export const metadata = {
  title: "Companies | Verified Mortgage Companies in UAE",
  description:
    "Browse verified mortgage companies operating across the UAE. Each firm is registered, compliant, and staffed with vetted professionals. Find the right company for your home loan.",
  keywords: [
    "mortgage companies UAE",
    "mortgage firms Dubai",
    "registered mortgage brokers UAE",
    "Baytech UAE",
    "GPMB mortgage",
    "New Best Credit UAE",
    "mortgage company Abu Dhabi",
  ],
  alternates: {
    canonical: `${baseUrl}/companies`,
  },
  openGraph: {
    title: "Verified Mortgage Companies in UAE | Mortgage Connect",
    description:
      "Browse registered and verified mortgage firms across the UAE — each with a team of vetted professionals ready to help.",
    url: `${baseUrl}/companies`,
    type: "website",
    locale: "en_AE",
    siteName: "Mortgage Connect",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mortgage Companies in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Mortgage Companies in UAE | Mortgage Connect",
    description:
      "Browse registered and verified mortgage firms across the UAE — each staffed with vetted professionals.",
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

export default function Companies() {
  const companies = buildCompanies(agents);

  return (
    <>
      <CompaniesHero total={companies.length} />
      <CompanyStats companies={companies} />
      <CompaniesGrid companies={companies} />
      <BankPartners />
      <CTABanner />
    </>
  );
}
