import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, MessageCircle, Phone, Globe, MapPin, TrendingUp, Briefcase, ArrowLeft, ArrowRight } from "lucide-react";
import { agents, getAgentBySlug, LinkedInIcon } from "@/lib/helper";
import { baseUrl } from "@/lib/config";
import { toDialable } from "@/lib/utils";
import { AgentCard, CTABanner, JsonLd } from "@/components/common";
import { agentSchema, breadcrumbSchema } from "@/lib/schema";

// One static page per agent — the directory's indexable surface area.
export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return { title: "Agent Not Found", robots: { index: false, follow: false } };
  }

  const title = `${agent.name} — ${agent.role} at ${agent.company}`;
  const description = `${agent.name} is a verified ${agent.role.toLowerCase()} based in ${agent.location}, specialising in ${agent.specialty.toLowerCase()} with ${agent.experience} of experience. Speaks ${agent.languages.join(", ")}. Connect directly — free, no sign-up.`;
  const url = `${baseUrl}${agent.href}`;

  return {
    title,
    description,
    keywords: [
      `${agent.name} mortgage`,
      `mortgage agent ${agent.location}`,
      `${agent.company} mortgage`,
      `${agent.specialty} ${agent.location}`,
      "verified mortgage consultant UAE",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      locale: "en_AE",
      siteName: "Mortgage Connect",
      images: [{ url: `${baseUrl}${agent.image}`, alt: agent.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${agent.image}`],
    },
    robots: { index: true, follow: true },
  };
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-accent" />
      </div>
      <div className="min-w-0">
        <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-1">{label}</p>
        <p className="text-foreground text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

export default async function AgentProfile({ params }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) notFound();

  const initials = agent.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const colleagues = agents.filter((a) => a.company === agent.company && a.id !== agent.id).slice(0, 3);

  return (
    <>
      <JsonLd data={agentSchema(agent)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Our Agents", path: "/our-agents" },
        { name: agent.name, path: agent.href },
      ])} />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
          />
          <div
            className="absolute -top-20 -right-20 w-100 h-100 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
          />
        </div>

        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-xs mb-8 flex-wrap">
            <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
            <span>/</span>
            <Link href="/our-agents" className="hover:text-accent transition-colors duration-200">Our Agents</Link>
            <span>/</span>
            <span className="text-accent">{agent.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-8">
            {/* Portrait */}
            <div className="shrink-0">
              {agent.image ? (
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={160}
                  height={160}
                  priority
                  className="w-40 h-40 rounded-3xl object-cover object-top border-4 border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.4)]"
                />
              ) : (
                <div className="w-40 h-40 rounded-3xl border-4 border-white/10 bg-accent flex items-center justify-center">
                  <span className="text-foreground text-5xl font-bold font-display">{initials}</span>
                </div>
              )}
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-start gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified Agent
                </span>
                {agent.superAgent === true && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-medium mb-4 animate-pulse">
                    Super Agent
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">
                {agent.name}
              </h1>
              <p className="mt-2 text-accent text-sm font-medium tracking-wide">{agent.role}</p>
              <p className="mt-1 text-white/50 text-sm">
                {agent.company} · {agent.location}
              </p>

              {agent.linkedin && (
                <a
                  href={agent.linkedin.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/70 text-xs font-medium hover:border-[#0A66C2] hover:text-white hover:bg-[#0A66C2] transition-all duration-200"
                >
                  <LinkedInIcon />
                  View LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details + contact */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Details */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(10,22,40,0.06)]">
              <div className="gold-rule mb-5" />
              <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
                About {agent.name.split(" ")[0]}
              </h2>

              <div className="grid sm:grid-cols-2 gap-7">
                <DetailRow icon={Briefcase} label="Specialty" value={agent.specialty} />
                <DetailRow icon={TrendingUp} label="Experience" value={agent.experience} />
                <DetailRow icon={Globe} label="Languages" value={agent.languages.join(", ")} />
                <DetailRow icon={MapPin} label="Location" value={agent.location} />
                <DetailRow icon={Briefcase} label="Company" value={agent.company} />
                {agent.business && (
                  <DetailRow icon={TrendingUp} label="Business Volume" value={agent.business} />
                )}
              </div>

              <div className="h-px bg-gray-100 my-8" />

              <p className="text-gray-500 text-sm leading-relaxed">
                {agent.name} is a verified mortgage consultant listed on Mortgage Connect UAE,
                operating out of {agent.location} with {agent.company}. All listed professionals are
                screened before appearing on the platform. Mortgage Connect does not charge you a fee
                and takes no commission — you deal with {agent.name.split(" ")[0]} directly.
              </p>
            </div>

            {/* Contact card */}
            <div className="bg-foreground rounded-3xl p-8 relative overflow-hidden lg:sticky lg:top-28">
              <div
                className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
              />
              <p className="text-accent text-[10px] font-semibold tracking-[0.3em] uppercase mb-2">
                Get in Touch
              </p>
              <p className="text-white/50 text-xs leading-relaxed mb-7">
                Contact {agent.name.split(" ")[0]} directly. No forms, no middleman, no fees.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${agent.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-whatsapp text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${toDialable(agent.phone)}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-foreground text-sm font-semibold hover:bg-brand-gold-light transition-colors duration-200"
                >
                  <Phone size={15} />
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/5 hover:border-white/40 transition-all duration-200 break-all"
                >
                  <Mail size={15} className="shrink-0" />
                  Email
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <Link
                  href="/our-agents"
                  className="group flex items-center gap-2 text-white/40 text-xs hover:text-accent transition-colors duration-200"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to all agents
                </Link>
              </div>
            </div>
          </div>

          {/* Colleagues */}
          {colleagues.length > 0 && (
            <div className="mt-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <div className="gold-rule mb-4" />
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                    Also at {agent.company}
                  </h2>
                </div>
                <Link
                  href={`/our-agents?company=${encodeURIComponent(agent.company)}`}
                  className="group inline-flex items-center gap-2 text-accent text-sm font-semibold hover:underline shrink-0"
                >
                  View all from this company
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleagues.map((colleague, i) => (
                  <AgentCard key={colleague.id} agent={colleague} index={i} visible />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
