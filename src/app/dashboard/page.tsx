"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, DollarSign, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface DashboardStats {
    totalBookings: number;
    totalSpent: number;
    pendingBookings: number;
    completedBookings: number;
}

interface Booking {
    id: string;
    serviceType: string;
    scheduledAt: string;
    status: string;
    amount: number;
    address: string;
}

const defaultStats: DashboardStats = {
    totalBookings: 0,
    totalSpent: 0,
    pendingBookings: 0,
    completedBookings: 0
};

export default function UserDashboardPage() {
    const [stats, setStats] = useState<DashboardStats>(defaultStats);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/user/dashboard");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                    setBookings(data.recentBookings || []);
                }
            } catch (err) {
                console.warn("Could not load dashboard data");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Dashboard</h1>
                    <p className="text-gray-500 text-sm">Track your bookings and payments</p>
                </div>
                <Link href="/book" className="bg-[var(--color-accent)] text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#20bd62] transition-colors flex items-center gap-2">
                    Book a Service <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-gray-400">Total Bookings</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-xs text-gray-400">Total Spent</span>
                    </div>
                    <p className="text-2xl font-bold">₦{stats.totalSpent.toLocaleString()}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <span className="text-xs text-gray-400">Pending</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
                        <span className="text-xs text-gray-400">Completed</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.completedBookings}</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Recent Bookings</h2>
                    <Link href="/dashboard/bookings" className="text-sm text-[var(--color-accent)] hover:underline">
                        View All
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No bookings yet</p>
                        <Link href="/book" className="text-[var(--color-accent)] hover:underline text-sm">
                            Book your first cleaning
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${
                                        booking.status === 'COMPLETED' ? 'bg-green-400' :
                                        booking.status === 'PENDING' ? 'bg-yellow-400' :
                                        'bg-blue-400'
                                    }`} />
                                    <div>
                                        <p className="font-medium">{booking.serviceType}</p>
                                        <p className="text-xs text-gray-500">{new Date(booking.scheduledAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">₦{Number(booking.amount).toLocaleString()}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        booking.status === 'COMPLETED' ? 'bg-green-400/20 text-green-400' :
                                        booking.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400' :
                                        'bg-blue-400/20 text-blue-400'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
