"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

const RESIDENCY_OPTIONS = [
  { value: "resident", label: "UAE Resident" },
  { value: "national", label: "UAE National" },
  { value: "nonresident", label: "Non Resident" },
];

const DOWN_PAYMENT_MAP = { resident: 20, national: 15, nonresident: 25 };

function formatAED(value) {
  return new Intl.NumberFormat("en-AE").format(Math.round(value));
}

function Slider({ min, max, value, onChange, step = 1 }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative w-full h-5 flex items-center">
      <div className="absolute w-full h-1.5 rounded-full bg-gray-200">
        <div
          className="absolute h-full rounded-full bg-accent"
          style={{ width: `${percent}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div
        className="absolute w-5 h-5 rounded-full bg-white border-2 border-accent shadow-md pointer-events-none transition-all duration-100"
        style={{ left: `calc(${percent}% - 10px)` }}
      />
    </div>
  );
}

function SliderRow({ label, min, max, value, onChange, step, displayValue, unit = "AED", hint }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {hint && (
            <div className="group relative">
              <Info size={13} className="text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 rounded-lg bg-foreground text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center">
                {hint}
              </div>
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-accent">
          {unit === "%" ? `${value}%` : `${formatAED(displayValue ?? value)} AED`}
        </span>
      </div>
      <Slider min={min} max={max} value={value} onChange={onChange} step={step} />
      <div className="flex justify-between text-[10px] text-gray-400">
        <span>{unit === "%" ? `${min}%` : `${formatAED(min)} AED`}</span>
        <span>{unit === "%" ? `${max}%` : `${formatAED(max)} AED`}</span>
      </div>
    </div>
  );
}

export default function MortgageCalculator() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [residency, setResidency] = useState("resident");
  const [loanPeriod, setLoanPeriod] = useState(25);
  const [interestRate, setInterestRate] = useState(3.99);

  const minDown = DOWN_PAYMENT_MAP[residency];
  const [downPaymentPct, setDownPaymentPct] = useState(minDown);

  // Sync min down payment when residency changes
  useEffect(() => {
    setDownPaymentPct(DOWN_PAYMENT_MAP[residency]);
  }, [residency]);

  const downPaymentAED = (purchasePrice * downPaymentPct) / 100;
  const loanAmount = purchasePrice - downPaymentAED;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanPeriod * 12;
  const monthlyPayment = monthlyRate === 0
    ? loanAmount / numPayments
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-brand-cream">
      <div className="container-site">

        {/* Header */}
        <div className={visible ? "text-center mb-14 opacity-100 translate-y-0 transition-all duration-700" : "text-center mb-14 opacity-0 translate-y-8 transition-all duration-700"}>
          <div className="gold-rule mx-auto mb-4" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Plan Ahead</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
            Mortgage Calculator
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Estimate your monthly repayments instantly. Adjust the sliders to match your situation.
          </p>
        </div>

        <div className={visible ? "grid lg:grid-cols-2 gap-8 items-start opacity-100 translate-y-0 transition-all duration-700 delay-100" : "grid lg:grid-cols-2 gap-8 items-start opacity-0 translate-y-8 transition-all duration-700 delay-100"}>

          {/* Left — Inputs */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(10,22,40,0.08)] border border-gray-100 space-y-8">

            {/* Purchase Price */}
            <SliderRow
              label="Purchase Price"
              min={300000}
              max={20000000}
              step={50000}
              value={purchasePrice}
              onChange={setPurchasePrice}
              hint="Total property price in AED"
            />

            {/* Residency */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">Residency Status</span>
              <div className="flex gap-2 flex-wrap mt-2">
                {RESIDENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setResidency(opt.value)}
                    className={residency === opt.value
                      ? "flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border-2 border-accent bg-accent/10 text-foreground transition-all duration-200"
                      : "flex-1 py-2.5 px-3 rounded-xl text-xs font-medium border-2 border-gray-200 text-gray-500 hover:border-gray-300 transition-all duration-200"}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment */}
            <SliderRow
              label="Down Payment"
              min={minDown}
              max={80}
              step={1}
              value={downPaymentPct}
              onChange={setDownPaymentPct}
              displayValue={downPaymentAED}
              unit="%"
              hint={`Minimum ${minDown}% for ${RESIDENCY_OPTIONS.find(o => o.value === residency)?.label}`}
            />

            {/* Loan Period */}
            <SliderRow
              label="Loan Period"
              min={1}
              max={25}
              step={1}
              value={loanPeriod}
              onChange={setLoanPeriod}
              unit="%"
              hint="Maximum 25 years in UAE"
            />
            {/* override display for years */}
            <div className="-mt-6 flex items-center justify-between px-0.5">
              <span className="text-[10px] text-gray-400">1 year</span>
              <span className="text-sm font-semibold text-accent">{loanPeriod} {loanPeriod === 1 ? "year" : "years"}</span>
              <span className="text-[10px] text-gray-400">25 years</span>
            </div>

            {/* Interest Rate */}
            <SliderRow
              label="Interest Rate"
              min={1}
              max={10}
              step={0.25}
              value={interestRate}
              onChange={setInterestRate}
              unit="%"
              hint="Current UAE average is ~3.75–4.5%"
            />
            <div className="-mt-6 flex items-center justify-between px-0.5">
              <span className="text-[10px] text-gray-400">1%</span>
              <span className="text-sm font-semibold text-accent">{interestRate.toFixed(2)}%</span>
              <span className="text-[10px] text-gray-400">10%</span>
            </div>
          </div>

          {/* Right — Results */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">

            {/* Monthly payment — hero card */}
            <div className="bg-foreground rounded-3xl p-8 text-center relative overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
              />
              <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-3">
                Estimated Monthly Payment
              </p>
              <div className="font-display text-5xl font-bold text-accent mb-1">
                {formatAED(monthlyPayment)}
              </div>
              <p className="text-white/40 text-sm">AED / month</p>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Interest Rate</p>
                  <p className="text-white font-semibold text-lg">{interestRate.toFixed(2)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Loan Period</p>
                  <p className="text-white font-semibold text-lg">{loanPeriod} yrs</p>
                </div>
              </div>
            </div>

            {/* Breakdown cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Purchase Price", value: formatAED(purchasePrice), unit: "AED" },
                { label: "Down Payment", value: `${formatAED(downPaymentAED)}`, unit: `AED (${downPaymentPct}%)` },
                { label: "Loan Amount", value: formatAED(loanAmount), unit: "AED" },
                { label: "Total Interest", value: formatAED(totalInterest), unit: "AED" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(10,22,40,0.06)]">
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-foreground font-bold text-lg leading-tight">{item.value}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{item.unit}</p>
                </div>
              ))}
            </div>

            {/* Total repayment */}
            <div className="bg-accent/10 border border-accent/25 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Repayment</p>
                <p className="text-foreground font-bold text-2xl font-display">{formatAED(totalPayment)}</p>
                <p className="text-gray-400 text-xs mt-0.5">AED over {loanPeriod} years</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-accent text-xl font-bold">∑</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/our-agents"
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-foreground text-white font-semibold text-sm tracking-wide hover:bg-brand-navy-light transition-all duration-300"
            >
              Talk to a Mortgage Expert
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <p className="text-center text-gray-400 text-xs leading-relaxed">
              This is an estimate only. Actual repayments may vary based on bank assessment, fees, and applicable charges.
            </p>
          </div>
        </div>
      </div>

      {/* Slider custom styles */}
      <style>{`
        input[type='range']::-webkit-slider-thumb { appearance: none; }
        input[type='range']::-moz-range-thumb { appearance: none; border: none; }
      `}</style>
    </section>
  );
}
