"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    CalendarCheck,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    MoreVertical,
    Activity,
    Bot
} from "lucide-react";

interface Stat {
    label: string;
    value: string;
    trend: string;
    positive: boolean;
    icon: any;
}

interface Booking {
    id: string;
    clientName: string;
    serviceType: string;
    date: string;
    time: string;
    status: string;
    amount: number;
    channel: string;
    address: string;
}

export default function AdminPage() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [statsRes, bookingsRes] = await Promise.all([
                    fetch('/api/admin/stats'),
                    fetch('/api/admin/bookings')
                ]);

                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    const icons = [DollarSign, CalendarCheck, Users, Bot];
                    const statsWithIcons = statsData.map((s: Stat, i: number) => ({
                        ...s,
                        icon: icons[i]
                    }));
                    setStats(statsWithIcons);
                }

                if (bookingsRes.ok) {
                    const bookingsData = await bookingsRes.json();
                    setBookings(bookingsData.slice(0, 5));
                }
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-card p-6 border-white/5 hover:border-[var(--color-accent)]/30 group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-charcoal)] flex items-center justify-center border border-[var(--color-graphite)] group-hover:border-[var(--color-accent)]/50 transition-colors">
                                {stat.icon && <stat.icon className="w-6 h-6 text-[var(--color-accent)]" strokeWidth={1.5} />}
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black tracking-tighter uppercase px-2 py-1 rounded bg-black/50 border border-white/5 ${stat.positive ? "text-[var(--color-accent)]" : "text-red-400"}`}>
                                {stat.trend}
                                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[10px] uppercase tracking-widest text-[var(--color-silver)] font-black opacity-60">{stat.label}</p>
                            <h2 className="text-3xl font-black mt-1 tracking-tighter italic" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Grid: Chart + Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Revenue Analytics Visual */}
                <div className="lg:col-span-2 glass-card p-8 min-h-[450px] flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-64 h-64 text-[var(--color-accent)] stroke-[0.5]" />
                    </div>

                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
                                Revenue Growth
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-silver)] font-bold mt-1">Cross-pillar performance dynamics</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-4 mr-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                                    <span className="text-[9px] uppercase font-bold text-[var(--color-silver)]">Actual</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--color-graphite)]" />
                                    <span className="text-[9px] uppercase font-bold text-[var(--color-silver)]">Projected</span>
                                </div>
                            </div>
                            <select className="bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:border-[var(--color-accent)] transition-all">
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                                <option>Year to Date</option>
                            </select>
                        </div>
                    </div>

                    {/* Simulated Advanced Chart Visual */}
                    <div className="flex-grow flex items-end gap-3 pb-6 relative z-10">
                        {[40, 65, 30, 85, 45, 90, 70, 55, 80, 60, 45, 95].map((val, i) => (
                            <div key={i} className="flex-grow flex flex-col items-center gap-2 group/bar">
                                <div className="w-full relative h-[300px] flex flex-col justify-end">
                                    {/* Projected Ghost Bar */}
                                    <div className="absolute inset-x-0 bottom-0 bg-white/5 rounded-t-sm" style={{ height: `${Math.min(val + 10, 100)}%` }} />
                                    {/* Actual Bar */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{ delay: 0.5 + i * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative w-full bg-gradient-to-t from-[var(--color-accent)]/10 via-[var(--color-accent)]/60 to-[var(--color-accent)] rounded-t-sm shadow-[0_0_20px_rgba(0,229,160,0.1)] group-hover/bar:brightness-125 transition-all"
                                    />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--color-silver)] group-hover/bar:text-[var(--color-accent)] transition-colors">
                                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Deployments (Bookings) */}
                <div className="glass-card p-8 flex flex-col border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tighter italic">Operational Queue</h3>
                            <p className="text-[10px] text-[var(--color-silver)] font-bold uppercase tracking-widest mt-0.5">Next 72 hours</p>
                        </div>
                        <button className="text-[var(--color-accent)] text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-125 transition-all">Expand</button>
                    </div>

                    <div className="space-y-6 flex-grow">
                        {bookings.slice(0, 4).map((booking) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 group cursor-pointer"
                            >
                                <div className={`w-1 rounded-full self-stretch ${booking.status === 'Confirmed' ? 'bg-[var(--color-accent)]' :
                                    booking.status === 'AI Booking' ? 'bg-blue-400' : 'bg-yellow-400'
                                    }`} />
                                <div className="flex-grow">
                                    <p className="text-xs font-black uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors">{booking.clientName}</p>
                                    <p className="text-[9px] text-[var(--color-silver)] font-bold mt-0.5 uppercase truncate max-w-[150px] tracking-widest">{booking.serviceType}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-tight">₦{booking.amount}</p>
                                    <p className="text-[8px] text-[var(--color-silver)] font-black uppercase tracking-tighter mt-1">{booking.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-[var(--color-graphite)]">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 rounded-xl p-5 flex items-center gap-4 border border-white/10 group cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20">
                                <Clock className="w-5 h-5 text-[var(--color-accent)] animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase text-[var(--color-accent)] tracking-widest">Immediate Pulse</p>
                                <p className="text-sm font-black italic tracking-tighter">Turnover in 2h 15m</p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 ml-auto text-[var(--color-silver)] group-hover:text-[var(--color-accent)] transition-all" />
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
}
