"use client";

import { motion } from "framer-motion";
import {
    Calculator,
    Building2,
    Maximize2,
    Layers,
    Zap,
    DollarSign,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function QuoteCalculator() {
    const [sqft, setSqft] = useState(5000);
    const [frequency, setFrequency] = useState("Weekly");
    const [difficulty, setDifficulty] = useState(1);

    const baseRate = 200; // ₦200 per sqft
    const difficultyMultiplier = [1, 1.2, 1.5]; // Standard, High Traffic, Medical/Industrial
    const frequencyDiscount = { "Daily": 0.8, "Weekly": 0.9, "Monthly": 1 };

    const estimatedMonthly = Math.round(
        (sqft * baseRate) *
        difficultyMultiplier[difficulty] *
        (frequency === "Daily" ? 22 : frequency === "Weekly" ? 4 : 1) *
        (frequencyDiscount[frequency as keyof typeof frequencyDiscount] || 1)
    );

    return (
        <div className="space-y-10 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Commercial <span className="text-[var(--color-accent)]">Calculator</span></h2>
                    <p className="text-xs text-[var(--color-silver)] uppercase tracking-widest font-bold mt-1">Algorithmic quote projection engine</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                    <Zap className="w-4 h-4 text-[var(--color-accent)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">v2.4 Logic Active</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Configuration Panel */}
                <div className="glass-card p-10 border-white/5 space-y-8">
                    <div className="space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-silver)] mb-4">
                                <Maximize2 className="w-3 h-3" />
                                Facility Vector (Sq. Ft.)
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="50000"
                                step="500"
                                value={sqft}
                                onChange={(e) => setSqft(parseInt(e.target.value))}
                                className="w-full accent-[var(--color-accent)] cursor-pointer"
                            />
                            <div className="flex justify-between mt-3">
                                <span className="text-lg font-black italic">{sqft.toLocaleString()} <span className="text-[10px] uppercase not-italic opacity-40">SQ/FT</span></span>
                                <span className="text-[10px] font-bold text-[var(--color-silver)] uppercase">Max capacity: 50k</span>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-silver)] mb-4">
                                <Layers className="w-3 h-3" />
                                Operational Cadence
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {["Daily", "Weekly", "Monthly"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setFrequency(opt)}
                                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${frequency === opt
                                            ? "bg-[var(--color-accent)] text-black border-[var(--color-accent)]"
                                            : "bg-white/5 text-[var(--color-silver)] border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-silver)] mb-4">
                                <Building2 className="w-3 h-3" />
                                Facility Complexity
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-[var(--color-accent)] transition-all uppercase tracking-widest"
                            >
                                <option value={0}>Standard (Grade A Office)</option>
                                <option value={1}>High Traffic (Retail/F&B)</option>
                                <option value={2}>Mission Critical (Medical/Industrial)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Projection Output */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        key={estimatedMonthly}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-10 border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.02] flex-grow flex flex-col justify-center items-center text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />

                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-silver)] mb-6">Estimated Monthly Subscription</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black italic text-[var(--color-accent)]">₦</span>
                            <h3 className="text-7xl font-black italic tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                                {estimatedMonthly.toLocaleString()}
                            </h3>
                        </div>
                        <p className="text-[10px] font-bold text-[var(--color-silver)] uppercase mt-4">Calculated via Dynamic Flow Matrix</p>

                        <div className="mt-10 grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-[8px] font-black text-[var(--color-silver)] uppercase mb-1">Cost Per Visit</p>
                                <p className="text-sm font-black italic">₦{Math.round(estimatedMonthly / (frequency === "Daily" ? 22 : frequency === "Weekly" ? 4 : 1)).toLocaleString()}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-[8px] font-black text-[var(--color-silver)] uppercase mb-1">Efficiency Gain</p>
                                <p className="text-sm font-black italic text-[var(--color-accent)]">+24.5%</p>
                            </div>
                        </div>
                    </motion.div>

                    <button className="btn-primary py-5 text-sm w-full group">
                        Deploy Formal Proposal
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-4 text-[var(--color-silver)] px-4">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                        <p className="text-[9px] font-bold uppercase tracking-widest leading-none">Price lock guaranteed for 90 deployments</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
