import { formatPhone, toDialable } from "@/lib/utils";

// Single source of truth for site-wide identity and contact details.
//
// Every value falls back to a literal, because NEXT_PUBLIC_* vars are inlined at
// build time and `.env*` is gitignored — without defaults, a deploy that forgets
// to set them renders links like `https://wa.me/undefined`.
const PHONE = process.env.NEXT_PUBLIC_PHONE || "+971505649126";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971505649126";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae",
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Mortgage Connect",

  // `phone` is the dialable form, `phoneDisplay` is derived from it so the number
  // shown on screen can never drift from the number actually dialled.
  phone: PHONE,
  phoneDisplay: formatPhone(PHONE),
  phoneHref: `tel:${toDialable(PHONE)}`,

  whatsapp: WHATSAPP,
  whatsappHref: `https://wa.me/${toDialable(WHATSAPP)}`,

  email: process.env.NEXT_PUBLIC_EMAIL || "info@mortgageconnect.ae",

  address:
    process.env.NEXT_PUBLIC_ADDRESS ||
    "Floor 2, Office 18, Aspen Commercial Tower, Sheikh Zayed Road, Dubai, UAE",

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/mortgageconnect.ae",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/mortgageconnect.ae",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/mortgageconnect-ae",
  },
};

export const baseUrl = site.url;
