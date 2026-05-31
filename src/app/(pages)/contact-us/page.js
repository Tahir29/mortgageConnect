import { ContactHero, InfoCards, ContactForm } from "@/components/contact";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const contactMetadata = {
  title: "Contact Us | Get in Touch with Mortgage Connect UAE",
  description:
    "Contact Mortgage Connect UAE for any queries about mortgage agents, home loans, or our platform. Reach us via WhatsApp, phone, or email. Office located on Sheikh Zayed Road, Dubai.",
  keywords: [
    "contact mortgage connect UAE",
    "mortgage help Dubai",
    "mortgage enquiry UAE",
    "Sheikh Zayed Road mortgage office",
    "mortgage connect phone number",
    "mortgage connect whatsapp",
  ],
  alternates: {
    canonical: `${baseUrl}/contact-us`,
  },
  openGraph: {
    title: "Contact Mortgage Connect UAE | We're Here to Help",
    description:
      "Reach our team via WhatsApp, phone, or email. Office located on Sheikh Zayed Road, Dubai. We respond within 24 hours.",
    url: `${baseUrl}/contact-us`,
    type: "website",
    locale: "en_AE",
    siteName: "Mortgage Connect",
    images: [
      {
        url: `${baseUrl}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Mortgage Connect UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Mortgage Connect UAE | We're Here to Help",
    description:
      "Reach our team via WhatsApp, phone, or email. Sheikh Zayed Road, Dubai. We respond within 24 hours.",
    images: [`${baseUrl}/og-contact.jpg`],
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

export default function ContactUs() {
  return (
    <>
      <ContactHero />
      <InfoCards />
      <ContactForm />
    </>
  );
}
