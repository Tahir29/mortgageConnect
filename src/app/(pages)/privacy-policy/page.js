import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const metadata = {
  title: "Privacy Policy | Mortgage Connect UAE",
  description: "Read Mortgage Connect UAE's privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: { canonical: `${baseUrl}/privacy-policy` },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you use our platform, including when you contact us, submit enquiries, or interact with mortgage agents listed on our site. This may include your name, email address, phone number, and any other information you choose to provide.

We also collect certain information automatically when you visit our website, such as your IP address, browser type, operating system, referring URLs, and pages visited. This information is used to improve our services and user experience.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to operate, maintain, and improve our platform and services. Specifically, we use your information to:

• Facilitate connections between you and mortgage consultants
• Respond to your comments, questions, and requests
• Send you technical notices and support messages
• Monitor and analyse usage patterns to improve the platform
• Comply with legal obligations applicable in the UAE`,
  },
  {
    title: "3. Information Sharing",
    content: `Mortgage Connect UAE does not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:

• When you initiate contact with a mortgage agent — your contact details may be shared with that agent to facilitate the connection
• When required by UAE law or legal process
• To protect the rights, property, or safety of Mortgage Connect UAE, our users, or the public

We do not share your information with advertisers or for marketing purposes.`,
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.

We encourage you to use caution when sharing personal information online and to contact us immediately if you suspect any unauthorised use of your account or personal data.`,
  },
  {
    title: "5. Cookies",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyse site traffic. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our platform.

You may choose to disable cookies through your browser settings; however, this may affect the functionality of certain parts of our website.`,
  },
  {
    title: "6. Third-Party Links",
    content: `Our platform may contain links to third-party websites, including the websites of mortgage agents and financial institutions. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by UAE law. When your information is no longer needed, we will securely delete or anonymise it.`,
  },
  {
    title: "8. Your Rights",
    content: `In accordance with applicable UAE data protection laws, you have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate or incomplete information
• Request deletion of your personal information, subject to legal obligations
• Withdraw consent where processing is based on consent

To exercise any of these rights, please contact us at info@mortgageconnect.ae.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us and we will take steps to delete such information promptly.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on this page with a revised effective date. Your continued use of our platform after such changes constitutes your acceptance of the updated policy.`,
  },
//   {
//     title: "11. Contact Us",
//     content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

// Mortgage Connect UAE
// Floor 2, Office 18, Aspen Commercial Tower
// Sheikh Zayed Road, Dubai, United Arab Emirates
// Email: info@mortgageconnect.ae
// Phone: +971 50 564 9126`,
//   },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a] pt-36 pb-16 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        <div className="container-site relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
            <span>/</span>
            <span className="text-accent">Privacy Policy</span>
          </div>
          <div className="gold-rule mb-5" />
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm hidden">
            Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: 1 June 2025
          </p>
        </div>
      </section>
      
      <section className="container-site py-16 max-w-3xl">
        <p className="text-gray-600 text-base leading-relaxed mb-10">
          Mortgage Connect UAE (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at{" "}
          <a href="/" className="text-accent hover:underline">mortgageconnect.ae</a>.
          Please read this policy carefully. If you disagree with its terms, please discontinue use of our platform.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="text-accent text-sm font-medium hover:underline"
          >
            ← Back to Home
          </Link>
          <Link
            href="/terms-of-use"
            className="text-foreground text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            View Terms of Use →
          </Link>
        </div>
      </section>
    </>
  );
}
