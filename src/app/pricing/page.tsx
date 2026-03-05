"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import { HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
    {
        q: "Are there any hidden fees or extra charges?",
        a: "Absolutely not. The price you see is what you pay. We include all cleaning products, equipment, and labour in our quoted rate. There are no surcharges for weekends or public holidays.",
    },
    {
        q: "How does payment work?",
        a: "We accept bank transfers, card payments (via Paystack), and mobile money. Payment is collected after your clean is completed — you only pay when you're satisfied.",
    },
    {
        q: "Can I customise my cleaning package?",
        a: "Yes! Our ENTERPRISE tier is fully customisable. For residential and premium plans, you can add extras like laundry folding, fridge cleaning, or window washing at checkout.",
    },
    {
        q: "Do you offer recurring discounts?",
        a: "Weekly clients save 15%, bi-weekly clients save 10%, and monthly clients save 5%. Discounts are applied automatically when you schedule recurring bookings.",
    },
    {
        q: "What if I need to cancel or reschedule?",
        a: "Cancel or reschedule free of charge up to 12 hours before your appointment. Within 12 hours, a ₦5,000 late cancellation fee applies.",
    },
    {
        q: "Is there a minimum booking requirement?",
        a: "Our minimum is a single session for residential clients. Commercial clients can start with a one-month trial before committing to a longer contract.",
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[var(--color-jet)] pt-20">
            <Navbar />

            {/* Hero */}
            <section className="py-16">
                <div className="container-nike text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">Investment</p>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
                            Transparent <span className="text-[var(--color-accent)]">Pricing</span>
                        </h1>
                        <p className="text-lg text-[var(--color-silver)] max-w-2xl mx-auto">
                            No hidden fees, no surprises. Premium cleaning at rates that make sense for the Nigerian market.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards (reused component — it IS the canonical pricing display) */}
            <Pricing />

            {/* FAQ Section — unique to this page */}
            <section className="py-20 border-t border-white/5">
                <div className="container-nike">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">Common Questions</p>
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
                            Pricing <span className="text-[var(--color-accent)]">FAQ</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                            >
                                <div className="flex items-start gap-4">
                                    <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-sm mb-2">{faq.q}</h3>
                                        <p className="text-xs text-[var(--color-silver)] leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="/book" className="btn-primary text-sm inline-flex">
                            Get Started Today <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
