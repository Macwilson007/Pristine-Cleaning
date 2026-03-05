"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    PieChart,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Zap,
    Users
} from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Operational <span className="text-[var(--color-accent)]">Intelligence</span></h2>
                    <p className="text-xs text-[var(--color-silver)] uppercase tracking-widest font-bold mt-1">Real-time performance matrix & growth vectors</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-[var(--color-accent)] transition-all">
                        Download Report
                    </button>
                    <select className="bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-[var(--color-accent)] transition-all">
                        <option>Current Quarter</option>
                        <option>Year to Date</option>
                        <option>Last 12 Months</option>
                    </select>
                </div>
            </div>

            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Capture Rate", value: "9.2%", trend: "+1.4%", positive: true, icon: Target },
                    { label: "LTV Projection", value: "₦485,000", trend: "+₦24,000", positive: true, icon: TrendingUp },
                    { label: "Churn Velocity", value: "2.1%", trend: "-0.5%", positive: true, icon: Zap },
                    { label: "Acquisition", value: "128", trend: "+12%", positive: true, icon: Users },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5"
                    >
                        <p className="text-[10px] uppercase tracking-widest text-[var(--color-silver)] font-black mb-4">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h4 className="text-3xl font-black italic tracking-tighter leading-none">{stat.value}</h4>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${stat.positive ? "text-[var(--color-accent)]" : "text-red-400"}`}>
                                {stat.trend}
                                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Revenue Growth Detailed */}
                <div className="glass-card p-8 border-white/5">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                            <BarChart3 className="w-4 h-4 text-[var(--color-accent)]" />
                            Revenue Momentum
                        </h3>
                    </div>
                    <div className="h-[300px] flex items-end gap-2 px-4">
                        {[60, 45, 80, 55, 90, 65, 40, 75, 50, 85, 95, 100].map((val, i) => (
                            <div key={i} className="flex-grow group relative">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                                    className="w-full bg-[var(--color-charcoal)] group-hover:bg-[var(--color-accent)] transition-all rounded-t-sm border-t border-[var(--color-graphite)]"
                                />
                                {i % 2 === 0 && (
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-[var(--color-silver)] group-hover:text-[var(--color-accent)] transition-colors">
                                        W{i + 1}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service Pillar Distribution */}
                <div className="glass-card p-8 border-white/5">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                            <PieChart className="w-4 h-4 text-[var(--color-gold)]" />
                            Pillar Distribution
                        </h3>
                    </div>
                    <div className="space-y-8">
                        {[
                            { label: "Residential", percentage: 45, color: "var(--color-accent)" },
                            { label: "Commercial", percentage: 35, color: "var(--color-gold)" },
                            { label: "Short-Term Rental", percentage: 20, color: "var(--color-cyan, #00d4ff)" },
                        ].map((pillar) => (
                            <div key={pillar.label} className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>{pillar.label}</span>
                                    <span style={{ color: pillar.color }}>{pillar.percentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pillar.percentage}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: pillar.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Insight Card */}
            <div className="bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent rounded-2xl p-8 border border-[var(--color-accent)]/10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-accent)]/30">
                            <TrendingUp className="w-8 h-8 text-[var(--color-accent)]" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black italic tracking-tighter uppercase">Quarterly Zenith Reached</h4>
                            <p className="text-xs text-[var(--color-silver)] font-bold uppercase tracking-widest mt-1">System is performing 18.5% above projected velocity</p>
                        </div>
                    </div>
                    <button className="btn-primary">Review Strategy</button>
                </div>
            </div>
        </div>
    );
}
