import {Inter, Playfair_Display} from "next/font/google";
import { Footer, Header } from "@/components/common/";
import { ScrollToTop } from "@/components/common/";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mortgage Connect UAE | Find Trusted Mortgage Agents",
    template: "%s | Mortgage Connect UAE",
  },
  description:
    "Mortgage Connect UAE is the first verified mortgage broker marketplace in the UAE. Find trusted, commission-free mortgage consultants across Dubai, Abu Dhabi, Sharjah and all emirates.",
  keywords: [
    "mortgage agent UAE",
    "mortgage broker Dubai",
    "home loan UAE",
    "mortgage consultant Dubai",
    "Islamic finance UAE",
    "refinancing UAE",
    "mortgage broker Abu Dhabi",
    "best mortgage rates UAE",
    "home finance Dubai",
    "mortgage connect",
  ],
  authors: [{ name: "Mortgage Connect UAE", url: baseUrl }],
  creator: "Mortgage Connect UAE",
  publisher: "Mortgage Connect UAE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: baseUrl,
    siteName: "Mortgage Connect",
    title: "Mortgage Connect UAE | Find Trusted Mortgage Agents",
    description:
      "Discover verified mortgage professionals across the UAE. Connect instantly — no fees, no sign-up required.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mortgage Connect UAE — Find Trusted Mortgage Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Connect UAE | Find Trusted Mortgage Agents",
    description:
      "Discover verified mortgage professionals across the UAE. Connect instantly — no fees, no sign-up required.",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main>
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
    </html>
  );
}
