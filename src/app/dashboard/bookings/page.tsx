"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Booking {
    id: string;
    serviceType: string;
    scheduledAt: string;
    status: string;
    amount: number;
    address: string;
    channel: string;
}

export default function UserBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/user/bookings");
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (err) {
                console.warn("Could not load bookings");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredBookings = filter === "ALL" 
        ? bookings 
        : bookings.filter(b => b.status === filter);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "COMPLETED": return <CheckCircle className="w-4 h-4" />;
            case "CANCELLED": return <XCircle className="w-4 h-4" />;
            case "PENDING": return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED": return "bg-green-500/20 text-green-400";
            case "CANCELLED": return "bg-red-500/20 text-red-400";
            case "PENDING": return "bg-yellow-500/20 text-yellow-400";
            default: return "bg-blue-500/20 text-blue-400";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Bookings</h1>
                    <p className="text-gray-500 text-sm">View and manage your service requests</p>
                </div>
                <div className="flex gap-2">
                    {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                filter === status 
                                    ? "bg-[var(--color-accent)] text-black" 
                                    : "bg-white/5 text-gray-400 hover:text-white"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <Calendar className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">No bookings found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{booking.serviceType}</h3>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(booking.scheduledAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {booking.address}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                                                {getStatusIcon(booking.status)}
                                                {booking.status}
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400">
                                                {booking.channel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold">₦{Number(booking.amount).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 mt-1">#{booking.id.slice(0, 8)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
