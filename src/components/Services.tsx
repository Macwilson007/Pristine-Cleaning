"use client";

import { motion } from "framer-motion";
import { Home, Building2, KeyRound, ArrowUpRight } from "lucide-react";

const services = [
    {
        icon: Home,
        title: "RESIDENTIAL",
        subtitle: "Home Cleaning",
        description:
            "Deep cleans, recurring maintenance, move-in/move-out. Tailored to your home's unique needs with eco-friendly products.",
        features: ["Regular Maintenance", "Deep Clean", "Move-In/Out", "Post-Renovation"],
        accent: "var(--color-accent)",
        image: "/images/residential.png",
    },
    {
        icon: Building2,
        title: "COMMERCIAL",
        subtitle: "Office & Industrial",
        description:
            "Professional-grade cleaning for offices, retail spaces, and warehouses. Flexible contracts, certified team.",
        features: ["Office Spaces", "Retail Stores", "Warehouses", "Medical Facilities"],
        accent: "var(--color-gold)",
        image: "/images/commercial.png",
    },
    {
        icon: KeyRound,
        title: "SHORT-TERM RENTAL",
        subtitle: "Airbnb & Vrbo",
        description:
            "Lightning-fast turnovers between guests. Linen change, restocking, and 5-star readiness — every single time.",
        features: ["Turnover Cleans", "Linen Service", "Restocking", "Key Management"],
        accent: "var(--color-accent-light)",
        image: "/images/rental.png",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as any
        },
    },
};

export default function Services() {
    return (
        <section id="services" className="section-padding relative">
            <div className="container-nike">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
                        What We Do
                    </p>
                    <h2 className="font-black">
                        THREE PILLARS OF
                        <br />
                        <span className="text-gradient">CLEAN</span>
                    </h2>
                </motion.div>

                {/* Service Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            className="glass-card flex flex-col group cursor-pointer overflow-hidden p-0 h-full border-white/5 hover:border-[var(--color-accent)]/20"
                        >
                            {/* Image Header */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <motion.img
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-jet)] via-transparent to-transparent opacity-80" />

                                {/* Floating Icon */}
                                <div
                                    className="absolute top-6 left-6 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md z-10"
                                    style={{
                                        background: `${service.accent}15`,
                                        border: `1px solid ${service.accent}30`,
                                    }}
                                >
                                    <service.icon
                                        className="w-5 h-5"
                                        style={{ color: service.accent }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-4 flex flex-col flex-grow">
                                <div>
                                    <p
                                        className="text-[0.65rem] uppercase tracking-[0.2em] font-bold mb-1"
                                        style={{ color: service.accent }}
                                    >
                                        {service.subtitle}
                                    </p>
                                    <h3
                                        className="text-2xl font-bold"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {service.title}
                                    </h3>
                                </div>

                                <p className="text-sm leading-relaxed text-[var(--color-silver)] flex-grow italic">
                                    "{service.description}"
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 py-2">
                                    {service.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-[0.6rem] py-1 px-3 rounded-full border border-[var(--color-graphite)] text-[var(--color-silver)] tracking-wider uppercase font-semibold"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] group-hover:text-[var(--color-accent)] transition-colors duration-300 mt-auto">
                                    <span>Explore Details</span>
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
