"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarCheck, MapPin, Home, Building2, BedDouble, Sparkles, ArrowRight } from "lucide-react";

const serviceTypes = [
    { id: "residential", label: "Residential", icon: Home, description: "Home & apartment cleaning" },
    { id: "commercial", label: "Commercial", icon: Building2, description: "Office & workspace cleaning" },
    { id: "turnover", label: "Rental Turnover", icon: BedDouble, description: "Airbnb & short-term rental" },
    { id: "deep", label: "Deep Clean", icon: Sparkles, description: "Intensive top-to-bottom clean" },
];

export default function BookPage() {
    const [selectedService, setSelectedService] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        date: "",
        time: "",
        notes: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-[var(--color-jet)] pt-20">
                <Navbar />
                <div className="flex items-center justify-center min-h-[70vh]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-lg px-6"
                    >
                        <div className="w-20 h-20 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mx-auto mb-8 border border-[var(--color-accent)]/30">
                            <CalendarCheck className="w-10 h-10 text-[var(--color-accent)]" />
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
                            Booking <span className="text-[var(--color-accent)]">Confirmed</span>
                        </h1>
                        <p className="text-[var(--color-silver)] mb-8">
                            Thank you, {formData.name}! Our team will reach out to confirm your {selectedService} appointment shortly. Check your email for details.
                        </p>
                        <a href="/" className="btn-primary inline-flex">
                            Back to Home
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--color-jet)] pt-20">
            <Navbar />

            <section className="py-16">
                <div className="container-nike">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">Schedule Your Clean</p>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
                            Book a <span className="text-[var(--color-accent)]">Session</span>
                        </h1>
                        <p className="text-lg text-[var(--color-silver)] max-w-xl mx-auto">
                            Pick your service, choose a date and time, and we&apos;ll handle the rest.
                        </p>
                    </motion.div>

                    {/* Service Selection */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-silver)] mb-6">1. Select Service Type</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {serviceTypes.map((svc) => (
                                <button
                                    key={svc.id}
                                    onClick={() => setSelectedService(svc.id)}
                                    className={`p-6 rounded-2xl border text-left transition-all duration-300 group ${selectedService === svc.id
                                            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_30px_rgba(0,229,160,0.1)]"
                                            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <svc.icon className={`w-8 h-8 mb-4 transition-colors ${selectedService === svc.id ? "text-[var(--color-accent)]" : "text-[var(--color-silver)] group-hover:text-white"
                                        }`} />
                                    <h3 className="font-black uppercase tracking-tight text-sm mb-1">{svc.label}</h3>
                                    <p className="text-xs text-[var(--color-silver)]">{svc.description}</p>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Booking Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-silver)] mb-6">2. Your Details</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Adebayo Johnson"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+234 800 000 0000"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Victoria Island, Lagos"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Preferred Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Preferred Time *</label>
                                <select
                                    name="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm"
                                >
                                    <option value="">Select a time</option>
                                    <option value="08:00">8:00 AM</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                    <option value="17:00">5:00 PM</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)]">Special Instructions</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Any special requirements or instructions..."
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all text-sm resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={!selectedService}
                                    className="btn-primary text-base px-10 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Confirm Booking
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                {!selectedService && (
                                    <p className="text-xs text-yellow-400/80 mt-3">Please select a service type above first.</p>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
