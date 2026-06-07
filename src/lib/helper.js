import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Agents", href: "/our-agents" },
  { label: "Companies", href: "/companies" },
  { label: "Contact Us", href: "/contact-us" },
]

export const agents = [
  {
    name: "Ehsan Jamshidzadeh",
    role: "Mortgage Consultant",
    company: "Baytech Mortgage Broker",
    languages: ["English", "Arabic", "Hindi"],
    location: "Dubai",
    rating: 4.9,
    reviews: 51,
    experience: "20 Years",
    business: "",
    phone: "+971 50 564 9126",
    whatsapp: "971505649126",
    email: "ehsan@baytech-uae.com",
    linkedin: "https://www.linkedin.com/in/ehsan-jamshidzadeh-ba431915a/",
    image: "/images/agents/Ehsan-Jamshidzadeh.jpeg",
    specialty: "Refinancing"
  },
  {
    name: "Zoheb Siddiqui",
    role: "Mortgage Consultant",
    company: "Baytech Mortgage Broker",
    languages: ["English", "Hindi", "Urdu"],
    location: "Dubai",
    rating: 4.9,
    reviews: 51,
    experience: "6 Months",
    business: "2.3M Per month Approx",
    phone: "+971 58 583 0776",
    whatsapp: "971585830776",
    email: "zoheb@baytech-uae.com",
    linkedin: "https://www.linkedin.com/in/zoheb-siddiqui-36876087",
    image: "/images/agents/Zoheb-Siddiqui.jpg",
    specialty: "Refinancing"
  },  
  {
    name: "Ragab Mohamed",
    role: "Mortgage Consultant",
    company: "Baytech Mortgage Broker",
    languages: ["English", "Arabic"],
    location: "Dubai",
    rating: 4.8,
    reviews: 22,
    experience: "4 Years",
    business: "2M per Month Approx, 10M Yearly",
    phone: "+971 58 531 8803",
    whatsapp: "971585318803",
    email: "ragab@baytech-uae.com",
    linkedin: "https://www.linkedin.com/in/ragab-mohamed-b74b3625a",
    image: "/images/agents/Ragab.jpg",
    specialty: "Home Finance"
  },
  {
    name: "M. Rumzee Mubarak",
    role: "Mortgage Consultant",
    company: "Magnifient Future Investment",
    languages: ["English", "Hindi", "Urdu", "Tamil", "Sinhala"],
    location: "Sharjah",
    rating: 4.6,
    reviews: 19,
    experience: "1 Year",
    business: "2.3M Per month Approx, 10M Yearly",
    phone: "+971 54 300 4742",
    whatsapp: "971543004742",
    email: "rumzee@magnifientfutureinvestment.com",
    linkedin: "https://www.linkedin.com/in/mohammed-rumzee-mubarak-430023372/",
    image: "/images/agents/M.Rumzee-Mubarak.jpg",
    specialty: "Commercial"
  },
  {
    name: "Soha Butt",
    role: "Mortgage Consultant",
    company: "Galaxy Prime Mortgage",
    languages: ["English", "Hindi", "Urdu"],
    location: "Dubai",
    rating: 4.8,
    reviews: 34,
    experience: "4 Months",
    business: "2.3M Per month Approx, 10M Yearly",
    phone: "+971 50 526 1511",
    whatsapp: "971505261511",
    email: "sooha.rauf@gpmb.ae",
    linkedin: " https://www.linkedin.com/in/soha-butt-456102152/",
    image: "/images/agents/Soha-Butt.jpg",
    specialty: "Home Finance"
  },
  {
    name: "Mustafa Shanan",
    role: "Mortgage Consultant",
    company: "New Best Credit",
    languages: ["English", "Arabic"],
    location: "Abu Dhabi",
    rating: 4.7,
    reviews: 28,
    experience: "5 Years",
    business: "",
    phone: "+971 50 169 2037",
    whatsapp: "971501692037",
    email: "mustafa@newbestcredit.com",
    linkedin: "",
    image: "/images/agents/Mustafa-Shanan.jpg",
    specialty: "Islamic Finance"
  },
  {
    name: "Dhanwanti Vanwani",
    role: "Mortgage Consultant",
    company: "Finance Point",
    languages: ["English", "Hindi", "Sindhi", "Gujarati"],
    location: "Dubai",
    rating: 4.8,
    reviews: 22,
    experience: "15 Months",
    business: "2M per Month Approx, 10M Yearly",
    phone: "+971 56 979 6848",
    whatsapp: "971569796848",
    email: "divya@financepoint.ae",
    linkedin: "https://www.linkedin.com/in/dhanwanti-divya-vanwani-64545321b/",
    image: "",
    specialty: "Home Finance"
  },
  // {
  //   name: "Sarah Al Mansoori",
  //   role: "Home Finance Advisor",
  //   company: "Emirates NBD",
  //   languages: ["Arabic", "English"],
  //   location: "Abu Dhabi",
  //   rating: 5.0,
  //   reviews: 43,
  //   experience: "10 Years",
  //   phone: "+971 50 000 0000",
  //   whatsapp: "971500000000",
  //   email: "",
  //   image: "",
  //   specialty: "Islamic Finance"
  // },
];

export const WaIcon = () => (
  <svg className="w-4 h-4 text-whatsapp" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.215a.75.75 0 00.92.921l5.424-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.699 9.699 0 01-4.951-1.355l-.355-.211-3.678.99.999-3.598-.232-.371A9.699 9.699 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const bankLogos = [
  { name: "Arab Bank", src: "/images/banks/arab-bank.png" },
  { name: "Commercial Bank Of Dubai", src: "/images/banks/cbd.png" },
  { name: "Dubai Islamic Bank", src: "/images/banks/dib.png" },
  { name: "Emirated Islamic", src: "/images/banks/eib.png" },
  { name: "Emirates NBD", src: "/images/banks/emirates-nbd.png" },
  { name: "FAB", src: "/images/banks/fab.png" },
  { name: "HSBC", src: "/images/banks/hsbc.png" },
  { name: "Mashreq", src: "/images/banks/mashreq.png" },
  { name: "RakBank", src: "/images/banks/rakbank.png" },
  { name: "Standard Chartered", src: "/images/banks/standard-chartered.png" },
]

export const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@mortgageconnect.ae",
    sub: "We reply within 24 hours",
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    cta: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+971 50 564 9126",
    sub: "Sun – Thu, 9am – 6pm GST",
    href: `tel:${process.env.NEXT_PUBLIC_PHONE}`,
    cta: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+971 50 564 9126",
    sub: "Fastest way to reach us",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
    cta: "Message Us",
    whatsapp: true,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Sheikh Zayed Road, Dubai",
    sub: `${process.env.NEXT_PUBLIC_EMAIL}`,
    href: "https://maps.google.com/?q=Aspen+Commercial+Tower+Sheikh+Zayed+Road+Dubai",
    cta: "Get Directions",
  },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/mortgageconnect.ae",
    icon: InstagramIcon,
    hoverColor: "hover:text-pink-400 hover:border-pink-400/40",
  },
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/mortgageconnect.ae",
    icon: FacebookIcon,
    hoverColor: "hover:text-blue-400 hover:border-blue-400/40",
  },
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/mortgageconnect-ae",
    icon: LinkedInIcon,
    hoverColor: "hover:text-blue-500 hover:border-blue-500/40",
  }
];