"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    UserPlus,
    Mail,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    MoreVertical,
    Star
} from "lucide-react";

interface Client {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    status?: string;
    totalBookings?: number;
    totalSpent?: number;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch('/api/admin/clients');
                if (res.ok) {
                    const data = await res.json();
                    setClients(data);
                }
            } catch (err) {
                console.error("Failed to load clients:", err);
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
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Client <span className="text-[var(--color-accent)]">Management</span></h2>
                    <p className="text-xs text-[var(--color-silver)] uppercase tracking-widest font-bold mt-1">Nurturing premium customer relations</p>
                </div>
                <button className="btn-primary py-2 px-6 h-11">
                    <UserPlus className="w-4 h-4" />
                    Add Client
                </button>
            </div>

            {/* Search Bar */}
            <div className="glass-card p-4 border-white/5">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-silver)]" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or company..."
                        className="w-full bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {clients.map((client, i) => (
                    <motion.div
                        key={client.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 border-white/5 hover:border-[var(--color-accent)]/20 transition-all group relative overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-0 right-0 p-6">
                            <span className={`text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest ${client.status === 'High Value' ? 'bg-[var(--color-gold)] text-black' :
                                client.status === 'New' ? 'bg-blue-500 text-white' :
                                    'bg-[var(--color-charcoal)] text-[var(--color-silver)]'
                                }`}>
                                {client.status}
                            </span>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--color-charcoal)] flex items-center justify-center border border-[var(--color-graphite)] group-hover:border-[var(--color-accent)]/50 transition-colors text-2xl font-black italic">
                                {client.name.charAt(0)}
                            </div>
                            <div className="space-y-4 flex-grow">
                                <div>
                                    <h4 className="text-xl font-black uppercase tracking-tighter italic group-hover:text-[var(--color-accent)] transition-colors">{client.name}</h4>
                                    <p className="text-[10px] text-[var(--color-silver)] font-bold uppercase tracking-widest mt-0.5">{client.id}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-xs">
                                        <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                        <span className="text-[var(--color-mist)]">{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                        <span className="text-[var(--color-mist)]">{client.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                        <span className="text-[var(--color-mist)] truncate max-w-[200px]">{client.address}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[var(--color-silver)]">
                                            <Calendar className="w-3 h-3" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Bookings</span>
                                        </div>
                                        <p className="text-sm font-black italic">{client.totalBookings}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[var(--color-silver)]">
                                            <DollarSign className="w-3 h-3" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Revenue</span>
                                        </div>
                                        <p className="text-sm font-black italic">₦{(client.totalSpent || 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] hover:brightness-125 transition-all">View Full Profile</button>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <Star className="w-4 h-4 text-[var(--color-gold)]" />
                                </button>
                                <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <MoreVertical className="w-4 h-4 text-[var(--color-silver)]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
