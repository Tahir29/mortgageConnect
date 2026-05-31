import { Star, Phone, MessageCircle, Mail, Globe } from "lucide-react";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={12} className={s <= Math.floor(rating) ? "fill-accent text-accent" : "text-gray-200"} />
      ))}
    </div>
  );
}

export default function AgentCard({ agent, index, visible }) {
    const initials = agent.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div
      style={{ transitionDelay: `${index * 100}ms` }}
      className={visible
        ? "group bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(10,22,40,0.08)] hover:shadow-[0_12px_48px_rgba(10,22,40,0.15)] border border-gray-100 hover:border-accent/40 transition-all duration-500 opacity-100 translate-y-0"
        : "group bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(10,22,40,0.08)] border border-gray-100 transition-all duration-500 opacity-0 translate-y-10"}
    >
      {/* Card top */}
      <div className="relative h-28 bg-linear-to-br from-foreground to-brand-navy-light">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-accent/15 text-accent border border-accent/30">
          {agent.specialty}
        </span>
        <span className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Verified
        </span>
        <div className="absolute -bottom-10 left-6">
          {agent.image ? (
            <img src={agent.image} alt={agent.name} className="w-20 h-20 rounded-2xl object-cover object-top border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-accent flex items-center justify-center">
              <span className="text-foreground text-xl font-bold">{initials}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="pt-14 px-6 pb-6">
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">{agent.name}</h3>
        <p className="text-accent text-xs font-medium tracking-wide mt-1 mb-3">{agent.role}</p>
        <div className="flex items-center gap-2 mb-4">
          <Stars rating={agent.rating} />
          <span className="text-foreground text-xs font-semibold">{agent.rating}</span>
          <span className="text-gray-400 text-xs">({agent.reviews} reviews)</span>
        </div>
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Globe size={12} className="text-accent shrink-0" />
            <span>{agent.languages.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-foreground/20 shrink-0" />
            <span>{agent.location} · {agent.experience} Experience</span>
          </div>
        </div>
        <div className="h-px bg-gray-100 mb-5" />
        <div className="flex gap-0.5 md:gap-2">          
          <a
            href={`mailto:${agent.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground text-xs font-semibold hover:bg-foreground hover:text-white hover:border-foreground transition-all duration-200"
          >
            <Mail size={13} />
            Email
          </a>
          <a
            href={`https://wa.me/${agent.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-whatsapp/10 border border-whatsapp/25 text-whatsapp text-xs font-semibold hover:bg-whatsapp hover:text-white hover:border-whatsapp transition-all duration-200"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
          <a
            href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground text-xs font-semibold hover:bg-foreground hover:text-white hover:border-foreground transition-all duration-200"
          >
            <Phone size={13} />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}