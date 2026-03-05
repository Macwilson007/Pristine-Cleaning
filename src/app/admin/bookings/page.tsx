"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    Calendar,
    MapPin,
    Tag,
    Clock
} from "lucide-react";

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

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch('/api/admin/bookings');
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (err) {
                console.error("Failed to load bookings:", err);
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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Bookings <span className="text-[var(--color-accent)]">Database</span></h2>
                    <p className="text-xs text-[var(--color-silver)] uppercase tracking-widest font-bold mt-1">Manage and track all service deployments</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary py-2 px-4 h-11">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="btn-primary py-2 px-6 h-11">
                        <Plus className="w-4 h-4" />
                        New Booking
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="glass-card p-4 flex flex-col md:flex-row items-center gap-4 border-white/5">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-silver)]" />
                    <input
                        type="text"
                        placeholder="Search by client, ID, or address..."
                        className="w-full bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-graphite)] bg-[var(--color-charcoal)] text-xs font-bold uppercase tracking-wider hover:border-[var(--color-accent)] transition-colors">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <select className="bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none cursor-pointer hover:border-[var(--color-accent)] transition-all min-w-[140px]">
                        <option>All Status</option>
                        <option>Confirmed</option>
                        <option>AI Booking</option>
                        <option>Pending</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>

            {/* Bookings List */}
            <div className="grid gap-4">
                {bookings.map((booking, i) => (
                    <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-6 border-white/5 hover:border-[var(--color-accent)]/20 group cursor-pointer"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border font-black text-xs ${booking.status === 'Confirmed' ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 text-[var(--color-accent)]' :
                                    booking.status === 'AI Booking' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                        'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                                    }`}>
                                    {booking.id.split('-')[1]}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-lg font-black uppercase tracking-tighter italic group-hover:text-[var(--color-accent)] transition-colors">{booking.clientName}</h4>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest ${booking.status === 'Confirmed' ? 'bg-[var(--color-accent)] text-black' :
                                            booking.status === 'AI Booking' ? 'bg-blue-500 text-white' :
                                                'bg-yellow-500 text-black'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                                        <div className="flex items-center gap-2 text-[var(--color-silver)]">
                                            <Tag className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{booking.serviceType}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[var(--color-silver)]">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider truncate max-w-[200px]">{booking.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                                <div className="flex flex-col items-start lg:items-end">
                                    <div className="flex items-center gap-2 text-[var(--color-silver)] mb-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Schedule</span>
                                    </div>
                                    <p className="text-xs font-bold uppercase">{booking.date} at {booking.time}</p>
                                </div>

                                <div className="flex flex-col items-start lg:items-end">
                                    <div className="flex items-center gap-2 text-[var(--color-silver)] mb-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Channel</span>
                                    </div>
                                    <p className="text-xs font-bold uppercase text-[var(--color-accent)]">{booking.channel}</p>
                                </div>

                                <div className="flex flex-col items-start lg:items-end min-w-[80px]">
                                    <span className="text-[10px] text-[var(--color-silver)] font-black uppercase tracking-widest mb-1">Fee</span>
                                    <p className="text-lg font-black italic tracking-tighter">₦{booking.amount.toLocaleString()}</p>
                                </div>

                                <button className="w-10 h-10 rounded-full border border-[var(--color-graphite)] flex items-center justify-center hover:bg-white/5 transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-[var(--color-silver)]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
