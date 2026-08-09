import { site } from "@/lib/config";

const ORG_ID = `${site.url}/#organization`;

/** The publisher itself — a marketplace, explicitly not a broker or lender. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Mortgage Connect UAE",
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    image: `${site.url}/og-image.jpg`,
    description:
      "A verified marketplace connecting UAE homebuyers with registered, commission-free mortgage consultants.",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Floor 2, Office 18, Aspen Commercial Tower, Sheikh Zayed Road",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        email: site.email,
        contactType: "customer support",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: "Mortgage Connect UAE",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AE",
  };
}

/** One agent, as a RealEstateAgent that works for their listed company. */
export function agentSchema(agent) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}${agent.href}#agent`,
    name: agent.name,
    url: `${site.url}${agent.href}`,
    image: `${site.url}${agent.image}`,
    jobTitle: agent.role,
    telephone: agent.phone,
    email: agent.email,
    knowsLanguage: agent.languages,
    knowsAbout: agent.specialty,
    areaServed: { "@type": "City", name: agent.location },
    worksFor: { "@type": "Organization", name: agent.company },
    isPartOf: { "@id": ORG_ID },
    ...(agent.linkedin ? { sameAs: [agent.linkedin.trim()] } : {}),
  };
}

/** The agents index, as an ordered list pointing at each profile. */
export function agentListSchema(agents) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verified Mortgage Agents in the UAE",
    numberOfItems: agents.length,
    itemListElement: agents.map((agent, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}${agent.href}`,
      name: agent.name,
    })),
  };
}

export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
