import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mortgageconnect.ae";

export const metadata = {
  title: "Terms of Use | Mortgage Connect UAE",
  description: "Read Mortgage Connect UAE's terms of use governing your access to and use of our mortgage broker marketplace platform.",
  alternates: { canonical: `${baseUrl}/terms-of-use` },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Mortgage Connect UAE platform at mortgageconnect.ae, you agree to be bound by these Terms of Use and all applicable laws and regulations of the United Arab Emirates. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.

These terms apply to all visitors, users, and others who access or use the platform.`,
  },
  {
    title: "2. Platform Description",
    content: `Mortgage Connect UAE is an online directory and marketplace that connects individuals seeking mortgage advice with registered mortgage consultants and brokers operating in the UAE.

We are not a mortgage broker, lender, or financial institution. We do not provide financial advice, mortgage recommendations, or any regulated financial services. All mortgage-related advice and services are provided directly by the independent agents and companies listed on our platform.`,
  },
  {
    title: "3. Use of the Platform",
    content: `You may use our platform for lawful purposes only. You agree not to:

• Use the platform in any way that violates applicable UAE federal or emirate-level laws or regulations
• Transmit any unsolicited or unauthorised advertising or promotional material
• Attempt to gain unauthorised access to any part of the platform or its systems
• Use automated tools to scrape, crawl, or extract data from the platform without our written consent
• Impersonate any person or entity or misrepresent your affiliation with any person or entity
• Submit false, misleading, or fraudulent information`,
  },
  {
    title: "4. Agent Listings",
    content: `Mortgage Connect UAE provides a platform for mortgage professionals to list their services. While we make reasonable efforts to verify the credentials of listed agents, we do not guarantee the accuracy, completeness, or reliability of any agent profile or the services they offer.

Users are encouraged to conduct their own due diligence before engaging with any mortgage professional. Mortgage Connect UAE is not responsible for any transactions, agreements, or disputes between users and listed agents.`,
  },
  {
    title: "5. Disclaimer of Warranties",
    content: `The platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

We do not warrant that the platform will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy or completeness of any information on the platform.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the fullest extent permitted by UAE law, Mortgage Connect UAE and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:

• Your use of or inability to use the platform
• Any transactions or interactions between you and mortgage agents
• Any errors or omissions in platform content
• Unauthorised access to or alteration of your data

Our total liability to you for any claims arising from your use of the platform shall not exceed the amount paid by you, if any, to access the platform.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All content on the Mortgage Connect UAE platform, including but not limited to text, graphics, logos, icons, images, and software, is the property of Mortgage Connect UAE or its content suppliers and is protected by UAE intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works of any platform content without our express written permission.`,
  },
  {
    title: "8. Third-Party Links",
    content: `Our platform may contain links to third-party websites, including the personal or business websites of listed mortgage agents. These links are provided for your convenience only.

We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.`,
  },
  {
    title: "9. Privacy",
    content: `Your use of the platform is also governed by our Privacy Policy, which is incorporated into these Terms of Use by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of the United Arab Emirates and the Emirate of Dubai. Any disputes arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.`,
  },
  {
    title: "11. Changes to Terms",
    content: `We reserve the right to modify these Terms of Use at any time. We will notify users of significant changes by updating the effective date at the top of this page. Your continued use of the platform following any changes constitutes your acceptance of the revised terms.

We encourage you to review these terms periodically to stay informed of any updates.`,
  },
  // {
  //   title: "12. Contact Us",
  //   content: `If you have any questions about these Terms of Use, please contact us:

  //   Mortgage Connect UAE
  //   Floor 2, Office 18, Aspen Commercial Tower
  //   Sheikh Zayed Road, Dubai, United Arab Emirates
  //   Email: info@mortgageconnect.ae
  //   Phone: +971 50 564 9126`,
  // },
];

export default function TermsOfUsePage() {
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
            <span className="text-accent">Terms of Use</span>
          </div>
          <div className="gold-rule mb-5" />
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Terms of Use
          </h1>
          <p className="text-white/50 text-sm hidden">
            Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: 1 June 2025
          </p>
        </div>
      </section>
      <section className="container-site py-16 max-w-3xl">
        <p className="text-gray-600 text-base leading-relaxed mb-10">
          Please read these Terms of Use carefully before using the Mortgage Connect UAE platform. These terms govern your access to and use of our website at{" "}
          <a href="/" className="text-accent hover:underline">mortgageconnect.ae</a>{" "}
          and all related services provided by Mortgage Connect UAE.
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
            href="/privacy-policy"
            className="text-foreground text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            View Privacy Policy →
          </Link>
        </div>
      </section>
    </>
  );
}
