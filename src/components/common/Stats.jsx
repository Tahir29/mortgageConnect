"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Verified Agents" },
  { value: 7,   suffix: "",  label: "Emirates Covered" },
  { value: 10,  suffix: "+", label: "Partner Banks" },
  { value: 98,  suffix: "%", label: "Client Satisfaction" },
];

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatItem({ value, suffix, label, active }) {
  const count = useCountUp(value, 2000, active);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span className="text-3xl md:text-4xl font-bold font-display text-accent">
        {count}{suffix}
      </span>
      <span className="text-white/50 text-xs md:text-sm mt-1.5 tracking-wide">{label}</span>
    </div>
  );
}

export default function Stats() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-foreground relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e1f] via-transparent to-[#060e1f]/60" />
        <div className="absolute inset-0 bg-linear-to-r from-[#060e1f]/80 via-transparent to-[#060e1f]/40" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="container-site py-14 z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x md:divide-white/10">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
