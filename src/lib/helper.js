import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Our Agents", href: "/our-agents" },
    { label: "Companies", href: "/companies" },
    { label: "Contact Us", href: "/contact-us" },
]

export const agents = [{
        id: 1,
        name: "Zoheb Siddiqui",
        role: "Mortgage Consultant",
        company: "Baytech UAE",
        languages: ["English", "Hindi", "Urdu"],
        location: "Dubai",
        rating: 4.9,
        reviews: 51,
        experience: "6 Months",
        phone: "+971 58 583 0776",
        whatsapp: "971585830776",
        email: "zoheb@baytech-uae.com",
        image: "/images/agents/Zoheb-Siddiqui.jpg",
        specialty: "Refinancing"
    },
    {
        id: 2,
        name: "Mustafa Shanan",
        role: "Mortgage Consultant",
        company: "New Best Credit",
        languages: ["English", "Arabic"],
        location: "Abu Dhabi",
        rating: 4.7,
        reviews: 28,
        experience: "5 Years",
        phone: "+971 50 169 2037",
        whatsapp: "971501692037",
        email: "mustafa@newbestcredit.com",
        image: "/images/agents/Mustafa-Shanan.jpg",
        specialty: "Islamic Finance"
    },
    {
        id: 3,
        name: "M. Rumzee Mubarak",
        role: "Mortgage Consultant",
        company: "Magnifient Future",
        languages: ["English", "Hindi", "Tamil", "Sinhala"],
        location: "Sharjah",
        rating: 4.6,
        reviews: 19,
        experience: "1 Year",
        phone: "+971 54 300 4742",
        whatsapp: "971543004742",
        email: "rumzee@magnifientfutureinvestment.com",
        image: "/images/agents/M.Rumzee-Mubarak.jpg",
        specialty: "Commercial"
    },
    {
        id: 4,
        name: "Soha Butt",
        role: "Mortgage Consultant",
        company: "GPMB",
        languages: ["English", "Hindi", "Urdu"],
        location: "Dubai",
        rating: 4.8,
        reviews: 34,
        experience: "4 Months",
        phone: "+971 50 526 1511",
        whatsapp: "971505261511",
        email: "sooha.rauf@gpmb.ae",
        image: "/images/agents/Soha-Butt.jpg",
        specialty: "Home Finance"
    },
    {
        id: 5,
        name: "Ragab Ahmed",
        role: "Mortgage Consultant",
        company: "Baytech UAE",
        languages: ["Arabic", "English"],
        location: "Dubai",
        rating: 4.8,
        reviews: 22,
        experience: "4 Years",
        phone: "+971 58 902 0434",
        whatsapp: "971589020434",
        email: "ragab@baytech-uae.com",
        image: "/images/agents/Ragab.jpg",
        specialty: "Home Finance"
    },
    {
        id: 6,
        name: "Sarah Al Mansoori",
        role: "Home Finance Advisor",
        company: "Emirates NBD",
        languages: ["Arabic", "English"],
        location: "Abu Dhabi",
        rating: 5.0,
        reviews: 43,
        experience: "10 Years",
        phone: "+971 50 000 0000",
        whatsapp: "971500000000",
        email: "",
        image: "",
        specialty: "Islamic Finance"
    },
];

export const WaIcon = () => (
  <svg className="w-4 h-4 text-whatsapp" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.215a.75.75 0 00.92.921l5.424-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.699 9.699 0 01-4.951-1.355l-.355-.211-3.678.99.999-3.598-.232-.371A9.699 9.699 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
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