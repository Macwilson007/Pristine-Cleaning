"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Home, Building2, BedDouble, Droplets, ShieldCheck, Clock, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
    {
        icon: Home,
        title: "Residential Cleaning",
        tagline: "Your sanctuary, perfected.",
        description: "From weekly maintenance to deep seasonal cleans, we treat every home like our own. Our trained teams follow a 50-point checklist tailored to Nigerian homes — covering tiled floors, louvres, ceiling fans, kitchen grease traps, and more.",
        features: [
            "Living rooms, bedrooms & hallways",
            "Kitchen deep degrease & sanitisation",
            "Bathroom tile scrub & disinfection",
            "Ceiling fan & AC vent dusting",
            "Floor mopping with eco-safe products",
            "Trash removal & bin sanitisation",
        ],
        color: "var(--color-accent)",
    },
    {
        icon: Building2,
        title: "Commercial Cleaning",
        tagline: "Offices that inspire productivity.",
        description: "We serve corporate offices, co-working spaces, retail stores, and warehouses across Lagos, Abuja, and Port Harcourt. Flexible scheduling — before hours, after hours, or weekends — so your team never skips a beat.",
        features: [
            "Open-plan & private office cleaning",
            "Reception & lobby maintenance",
            "Restroom deep sanitisation",
            "Carpet vacuuming & stain treatment",
            "Window & glass partition cleaning",
            "Monthly compliance reports",
        ],
        color: "var(--color-gold)",
    },
    {
        icon: BedDouble,
        title: "Short-Term Rental Turnover",
        tagline: "5-star reviews, every checkout.",
        description: "Purpose-built for Airbnb hosts, serviced apartments, and hotel operators. Our rapid-response teams can turn over a property in under 90 minutes — fresh linens, restocked amenities, and photo-ready staging included.",
        features: [
            "Linen change & bed making",
            "Amenity restocking (toiletries, towels)",
            "Kitchen reset & appliance wipe-down",
            "Guest-ready inspection checklist",
            "Same-day & emergency availability",
            "Multi-property discount packages",
        ],
        color: "#00d4ff",
    },
    {
        icon: Droplets,
        title: "Deep Cleaning",
        tagline: "The reset button for any space.",
        description: "Our most intensive service. Ideal for post-construction cleanup, move-in/move-out cleans, or quarterly refreshes. We go behind appliances, inside cabinets, and under furniture — leaving zero dust behind.",
        features: [
            "Behind & under all furniture",
            "Inside ovens, fridges & microwaves",
            "Grout scrubbing & tile restoration",
            "Wall spot-cleaning & baseboard wipe",
            "Light fixture & chandelier dusting",
            "Full window cleaning (interior)",
        ],
        color: "#c084fc",
    },
];

const guarantees = [
    { icon: ShieldCheck, label: "Satisfaction Guaranteed", text: "Not happy? We re-clean for free within 24 hours." },
    { icon: Clock, label: "Punctual & Reliable", text: "Teams arrive within a 15-minute window. Every time." },
    { icon: Leaf, label: "Eco-Friendly Products", text: "Safe for children, pets, and the planet." },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[var(--color-jet)] pt-20">
            <Navbar />

            {/* Hero */}
            <section className="py-16">
                <div className="container-nike text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">What We Do</p>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
                            Elite <span className="text-[var(--color-accent)]">Services</span>
                        </h1>
                        <p className="text-lg text-[var(--color-silver)] max-w-2xl mx-auto">
                            Four specialised cleaning pillars, each backed by vetted professionals, premium equipment, and a relentless standard of excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Service Detail Cards */}
            <section className="pb-20">
                <div className="container-nike space-y-16">
                    {services.map((svc, i) => (
                        <motion.div
                            key={svc.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="grid md:grid-cols-2 gap-10 items-start p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.02]"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ borderColor: `${svc.color}30`, backgroundColor: `${svc.color}10` }}>
                                        <svc.icon className="w-7 h-7" style={{ color: svc.color }} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black uppercase tracking-tight">{svc.title}</h2>
                                        <p className="text-xs italic text-[var(--color-silver)]">{svc.tagline}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-6">{svc.description}</p>
                                <a href="/book" className="btn-primary text-xs inline-flex">
                                    Book This Service <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-silver)] mb-5">What&apos;s Included</h3>
                                <ul className="space-y-3">
                                    {svc.features.map((feat) => (
                                        <li key={feat} className="flex items-center gap-3 text-sm text-[var(--color-mist)]">
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: svc.color }} />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Guarantees */}
            <section className="py-16 border-t border-white/5">
                <div className="container-nike">
                    <div className="grid md:grid-cols-3 gap-8">
                        {guarantees.map((g, i) => (
                            <motion.div
                                key={g.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <g.icon className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-4" strokeWidth={1.5} />
                                <h3 className="font-black uppercase tracking-tight text-sm mb-2">{g.label}</h3>
                                <p className="text-xs text-[var(--color-silver)]">{g.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
