"use client";

import { useState } from "react";
import { useVisible } from "@/hooks/useVisible";
import { Mail, MapPin, Phone, Send, CheckCircle, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [ref, visible] = useVisible(0.1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm text-foreground placeholder:text-gray-400
     focus:outline-none focus:ring-2 transition-all duration-200
     ${errors[field]
       ? "border-red-300 focus:border-red-400 focus:ring-red-100"
       : "border-gray-200 focus:border-accent focus:ring-accent/10"}`;

  const subjects = ["General Enquiry", "Agent Recommendation", "Platform Feedback", "Partnership", "Other"];

  return (
    <section ref={ref} className="section-padding bg-brand-cream">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — Form */}
          <div className={visible ? "opacity-100 translate-y-0 transition-all duration-700" : "opacity-0 -translate-y-10 transition-all duration-700"}>
            <div className="gold-rule mb-5" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Send a Message</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
              Let&apos;s Talk
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Fill in the form and we&apos;ll get back to you as soon as possible.
            </p>

            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center text-center py-16 px-8 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(10,22,40,0.06)]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">Message Sent!</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-8 px-6 py-3 rounded-full border-2 border-foreground text-foreground text-sm font-semibold hover:bg-foreground hover:text-white transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(10,22,40,0.06)] space-y-5">

                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+971 50 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass("phone")}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Subject</label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, subject: s })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
                          ${form.subject === s
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-foreground text-white font-semibold text-sm tracking-wide hover:bg-brand-navy-light transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-xs">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </div>

          {/* Right — Map + quick info */}
          <div className={visible ? "opacity-100 translate-y-0 transition-all duration-700 delay-150" : "opacity-0 translate-y-10 transition-all duration-700 delay-150"}>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(10,22,40,0.10)] border border-gray-100 mb-6">
              <iframe
                title="Mortgage Connect UAE Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sSheikh%20Zayed%20Rd%2C%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Office detail card */}
            <div className="bg-foreground rounded-3xl p-8 relative overflow-hidden">
              <div
                className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
              />
              <p className="text-accent text-[10px] font-semibold tracking-[0.3em] uppercase mb-5">Our Office</p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Address</p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      Floor 2, Office 18, Aspen Commercial Tower,<br />
                      Sheikh Zayed Road, Dubai, UAE
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/8" />

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Phone</p>
                    <a href="tel:+971505649126" className="text-white/50 text-xs hover:text-accent transition-colors duration-200">
                      +971 50 564 9126
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/8" />

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">Email</p>
                    <a href="mailto:info@mortgageconnect.ae" className="text-white/50 text-xs hover:text-accent transition-colors duration-200">
                      info@mortgageconnect.ae
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/8" />

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-whatsapp/15 flex items-center justify-center shrink-0">
                    <MessageCircle size={15} className="text-whatsapp" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">WhatsApp</p>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 text-xs hover:text-whatsapp transition-colors duration-200"
                    >
                      +971 50 564 9126
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}