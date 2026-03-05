"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
    {
        name: "ESSENTIAL",
        subtitle: "Residential",
        price: "25,000",
        period: "per session",
        description: "Perfect for regular home maintenance cleaning.",
        features: [
            "Up to 3 bedrooms",
            "Kitchen & bathrooms",
            "Vacuuming & mopping",
            "Dusting all surfaces",
            "Eco-friendly products",
            "Satisfaction guarantee",
        ],
        popular: false,
        accent: "var(--color-silver)",
    },
    {
        name: "PREMIUM",
        subtitle: "Most Popular",
        price: "50,000",
        period: "per session",
        description: "Deep clean with attention to every detail.",
        features: [
            "Unlimited rooms",
            "Inside appliances",
            "Window cleaning",
            "Cabinet organising",
            "Linen change service",
            "Same-day availability",
            "Priority scheduling",
            "Dedicated team lead",
        ],
        popular: true,
        accent: "var(--color-accent)",
    },
    {
        name: "ENTERPRISE",
        subtitle: "Commercial",
        price: "Custom",
        period: "monthly contract",
        description: "Tailored solutions for offices & facilities.",
        features: [
            "Custom square footage",
            "After-hours cleaning",
            "Certified team",
            "Safety compliance",
            "Monthly reporting",
            "Account manager",
            "Emergency response",
            "Quality audits",
        ],
        popular: false,
        accent: "var(--color-gold)",
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="section-padding relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-charcoal)]/30 to-transparent" />

            <div className="container-nike relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
                        Investment
                    </p>
                    <h2 className="font-black">
                        TRANSPARENT
                        <br />
                        <span className="text-gradient">PRICING</span>
                    </h2>
                    <p className="mt-6 text-sm max-w-lg mx-auto">
                        No hidden fees. No surprises. Just exceptional cleaning at
                        fair, competitive rates.
                    </p>
                </motion.div>

                {/* Price Cards */}
                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`relative rounded-2xl p-8 flex flex-col ${plan.popular
                                ? "bg-gradient-to-b from-[var(--color-accent)]/[0.08] to-transparent border border-[var(--color-accent)]/30 scale-[1.02]"
                                : "glass-card"
                                }`}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-accent)] text-[var(--color-black)] text-xs font-bold uppercase tracking-wider rounded-full">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan header */}
                            <p
                                className="text-xs uppercase tracking-[0.15em] mb-1"
                                style={{ color: plan.accent }}
                            >
                                {plan.subtitle}
                            </p>
                            <h3
                                className="text-xl font-bold mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-4">
                                {plan.price === "Custom" ? (
                                    <span className="text-4xl font-black text-gradient-gold">
                                        Custom
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-sm text-[var(--color-silver)]">₦</span>
                                        <span className="text-5xl font-black">{plan.price}</span>
                                    </>
                                )}
                                <p className="text-xs text-[var(--color-silver)] mt-1">
                                    {plan.period}
                                </p>
                            </div>

                            <p className="text-sm mb-6">{plan.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-3 text-sm text-[var(--color-mist)]"
                                    >
                                        <Check
                                            className="w-4 h-4 flex-shrink-0"
                                            style={{ color: plan.accent }}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href="/book"
                                className={
                                    plan.popular
                                        ? "btn-primary justify-center w-full"
                                        : "btn-secondary justify-center w-full"
                                }
                            >
                                {plan.price === "Custom" ? "Get a Quote" : "Book Now"}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
