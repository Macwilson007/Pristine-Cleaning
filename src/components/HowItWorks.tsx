"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mic, Calendar, CheckCircle2 } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: MessageSquare,
        title: "REACH OUT",
        description:
            "Message us on WhatsApp or call our AI receptionist. Tell us what you need — residential, commercial, or rental turnover.",
    },
    {
        number: "02",
        icon: Mic,
        title: "AI HANDLES IT",
        description:
            "Our intelligent AI gathers the details — location, size, schedule, and special requests. No forms, no waiting.",
    },
    {
        number: "03",
        icon: Calendar,
        title: "GET BOOKED",
        description:
            "The AI checks real-time availability, locks your preferred slot, and sends instant confirmation via WhatsApp.",
    },
    {
        number: "04",
        icon: CheckCircle2,
        title: "PERFECTION DELIVERED",
        description:
            "Our vetted team arrives on time, every time. Quality-checked, insured, and backed by our satisfaction guarantee.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section-padding relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[300px] opacity-[0.03]" />

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
                        The Process
                    </p>
                    <h2 className="font-black">
                        BOOKING IS
                        <br />
                        <span className="text-gradient">EFFORTLESS</span>
                    </h2>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connection line */}
                    <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--color-graphite)] to-transparent" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="text-center relative"
                        >
                            {/* Step circle */}
                            <div className="relative mx-auto mb-8">
                                <div className="w-28 h-28 mx-auto rounded-full border border-[var(--color-graphite)] flex items-center justify-center bg-[var(--color-jet)] relative z-10 group hover:border-[var(--color-accent)] transition-colors duration-500">
                                    <step.icon
                                        className="w-8 h-8 text-[var(--color-accent)]"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                {/* Step number */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-accent)] text-[var(--color-black)] flex items-center justify-center text-xs font-bold z-20">
                                    {step.number}
                                </div>
                            </div>

                            <h3
                                className="text-lg font-bold mb-3 tracking-wider"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
