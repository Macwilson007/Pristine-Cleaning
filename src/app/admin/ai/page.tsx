"use client";

import { motion } from "framer-motion";
import {
    Bot,
    Zap,
    MessageSquare,
    Phone,
    Settings,
    Activity,
    ShieldCheck,
    AlertCircle,
    Eye,
    RefreshCw
} from "lucide-react";
import { mockAILogs } from "@/lib/mock-data";

export default function AIReceptionistPage() {
    return (
        <div className="space-y-10">
            {/* Header / Active Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">AI Receptionist <span className="text-[var(--color-accent)]">Console</span></h2>
                    <p className="text-xs text-[var(--color-silver)] uppercase tracking-widest font-bold mt-1">Real-time interaction matrix & protocol management</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
                    <div className="flex items-center gap-3 px-4 py-2 bg-[var(--color-accent)]/10 rounded-xl border border-[var(--color-accent)]/20">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)]">System Online</span>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <Settings className="w-5 h-5 text-[var(--color-silver)]" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <RefreshCw className="w-5 h-5 text-[var(--color-silver)]" />
                    </button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Intent Recognition", value: "99.4%", icon: Zap },
                    { label: "Resolution Rate", value: "84.2%", icon: ShieldCheck },
                    { label: "Avg Response Time", value: "1.2s", icon: Activity },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                <stat.icon className="w-5 h-5 text-[var(--color-accent)]" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-[var(--color-silver)] font-black">{stat.label}</p>
                                <h4 className="text-2xl font-black italic tracking-tighter mt-0.5">{stat.value}</h4>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Live Activity Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-3">
                            <Activity className="w-5 h-5 text-[var(--color-accent)]" />
                            Live Interaction Stream
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-[var(--color-silver)]">All Channels</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {mockAILogs.map((log, i) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 border-white/5 hover:border-[var(--color-accent)]/20 transition-all group"
                            >
                                <div className="flex items-start justify-between gap-6 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ${log.channel === 'WhatsApp' ? 'text-green-400' : 'text-blue-400'
                                            }`}>
                                            {log.channel === 'WhatsApp' ? <MessageSquare className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{log.time}</span>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-[0.2em] ${log.sentiment === 'Positive' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'
                                                    }`}>
                                                    {log.sentiment}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-black uppercase mt-1 tracking-tight group-hover:text-[var(--color-accent)] transition-colors">{log.userIntent}</h4>
                                        </div>
                                    </div>
                                    <button className="p-2 border border-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/20">
                                        <Eye className="w-4 h-4 text-[var(--color-accent)]" />
                                    </button>
                                </div>

                                <div className="space-y-3 bg-black/40 rounded-xl p-4 border border-white/5">
                                    <div className="flex gap-4">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-silver)] w-16 pt-1">User</span>
                                        <p className="text-xs text-[var(--color-mist)] leading-relaxed italic">"{log.rawInput}"</p>
                                    </div>
                                    <div className="flex gap-4 pt-3 border-t border-white/5">
                                        <Bot className="w-3.5 h-3.5 text-[var(--color-accent)] mt-0.5" />
                                        <p className="text-xs text-[var(--color-white)] leading-relaxed font-semibold">{log.response}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <Zap className="w-3 h-3 text-[var(--color-accent)]" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)]">Action: {log.actionTaken}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Configuration / Health */}
                <div className="space-y-8">
                    {/* System Health */}
                    <div className="glass-card p-8 border-white/5">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
                            Security & Health
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: "API Connectivity", status: "Healthy" },
                                { label: "Webhook Latency", status: "Low (85ms)" },
                                { label: "Token Consumption", status: "Optimized" },
                                { label: "Context Window", status: "Good" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--color-silver)]">{item.label}</span>
                                    <span className="text-[9px] font-black uppercase text-green-400">{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Protocols */}
                    <div className="glass-card p-8 border-[var(--color-accent)]/10 bg-[var(--color-accent)]/[0.02]">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-[var(--color-accent)]">
                            <Zap className="w-4 h-4" />
                            Active Protocols
                        </h3>
                        <div className="space-y-4">
                            {[
                                "Price Negotiation v2.4",
                                "Booking Persistence",
                                "Cancellation Recovery",
                                "Commercial Lead Gen"
                            ].map((proto) => (
                                <div key={proto} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--color-accent)]/30 transition-all cursor-pointer group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] group-hover:animate-ping" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{proto}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Alert Log */}
                    <div className="glass-card p-8 border-red-500/10 bg-red-500/[0.02]">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-4 h-4" />
                            Anomalies
                        </h3>
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                            <p className="text-[10px] font-bold text-red-400/80 uppercase">Last Error: 2h ago</p>
                            <p className="text-xs font-black uppercase mt-1 tracking-tight">"Protocol Bio-Check Failure"</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
