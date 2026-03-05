"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Mic } from "lucide-react";
import { usePathname } from "next/navigation";

// Extend window interface for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface Message {
    role: "assistant" | "user";
    content: string;
}

const WELCOME_MESSAGE = "Hi there! 👋 I'm MR TIDY's AI receptionist. I can help you with:\n\n• **Booking a cleaning session**\n• **Our services & pricing**\n• **Service areas**\n• **Rescheduling or cancellations**\n\nHow can I help you today?";

function getAIResponse(input: string): string {
    const msg = input.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup|yo)/.test(msg)) {
        return "Hello! Welcome to MR TIDY. 😊 How can I assist you today? I can help with booking, pricing, services, or any questions you might have.";
    }

    // Booking intent
    if (/(book|schedule|appointment|reserve|i need a clean|i want to book|set up)/.test(msg)) {
        return "Great choice! 🗓️ You can book a session directly on our **[Booking Page](/book)**.\n\nJust select your service type, pick a date and time, and we'll assign a vetted team to your location. Would you like to know about our services or pricing first?";
    }

    // Pricing
    if (/(price|pricing|cost|how much|rate|charge|fee|afford|expensive|cheap|budget)/.test(msg)) {
        return "Here are our current rates:\n\n• **Essential (Residential):** ₦25,000/session\n• **Premium (Deep Clean):** ₦50,000/session\n• **Enterprise (Commercial):** Custom pricing\n\n💡 **Recurring discounts:** Weekly saves 15%, bi-weekly saves 10%, monthly saves 5%.\n\nWould you like to [see full pricing details](/pricing) or [book now](/book)?";
    }

    // Services
    if (/(service|what do you (do|offer|clean)|type|residential|commercial|deep clean|turnover|rental|airbnb)/.test(msg)) {
        return "We offer four specialised service tiers:\n\n🏠 **Residential Cleaning** — Regular home maintenance\n🏢 **Commercial Cleaning** — Offices & workspaces\n🛏️ **Rental Turnover** — Airbnb & short-term properties\n✨ **Deep Cleaning** — Intensive top-to-bottom clean\n\nEach service includes eco-friendly products, vetted professionals, and our satisfaction guarantee. [View full details →](/services)";
    }

    // Location/areas
    if (/(where|location|area|lagos|abuja|port harcourt|ibadan|lekki|ajah|victoria island|ikoyi|city|cover|operate)/.test(msg)) {
        return "We currently operate in:\n\n📍 Lagos (Island & Mainland, Lekki, Ajah, VI)\n📍 Abuja (FCT)\n📍 Port Harcourt\n📍 Ibadan\n\nWe're expanding to more cities soon! Is your area covered?";
    }

    // Cancel/reschedule
    if (/(cancel|reschedule|change date|move|postpone)/.test(msg)) {
        return "No problem! You can cancel or reschedule **free of charge** up to 12 hours before your appointment. Within 12 hours, a ₦5,000 late cancellation fee applies.\n\nTo reschedule, simply contact us via WhatsApp or reply here with your booking details. 📞";
    }

    // Payment
    if (/(pay|payment|transfer|card|paystack|bank|mobile money)/.test(msg)) {
        return "We accept:\n\n💳 **Debit/Credit cards** (via Paystack)\n🏦 **Bank transfers**\n📱 **Mobile money**\n\nPayment is collected **after** the clean is completed — you only pay when you're satisfied. No upfront fees!";
    }

    // How it works
    if (/(how (does it|do you) work|process|steps|what happens)/.test(msg)) {
        return "It's simple! Here's how:\n\n**1.** Tell us what you need (book online, WhatsApp, or chat here)\n**2.** We confirm & assign a vetted team\n**3.** Your team arrives with pro-grade equipment\n**4.** Quality check + satisfaction guarantee\n\n[See the full process →](/how-it-works)";
    }

    // About
    if (/(about|who are you|company|team|story|founded|background)/.test(msg)) {
        return "MR TIDY is Nigeria's premium tech-enabled cleaning service. We've completed **2,400+ cleans** with a **4.9/5 rating** and **98% rebook rate**.\n\nOur teams are vetted, trained, insured, and equipped with commercial-grade tools. [Learn more about us →](/about)";
    }

    // Contact / WhatsApp
    if (/(contact|phone|call|whatsapp|email|reach|talk to someone|human|speak)/.test(msg)) {
        return "You can reach us through:\n\n📧 **Email:** hello@pristineclean.com\n📱 **WhatsApp:** +234 800 000 0000\n📞 **Phone:** +234 800 000 0000\n\nOur human support team is available Mon–Sat, 8 AM – 8 PM WAT.";
    }

    // Thank you
    if (/(thank|thanks|cheers|appreciate|great|awesome|perfect|wonderful)/.test(msg)) {
        return "You're welcome! 😊 Is there anything else I can help you with? I'm here whenever you need me.";
    }

    // Bye
    if (/(bye|goodbye|see you|take care|that's all|nothing else)/.test(msg)) {
        return "Thank you for chatting with MR TIDY! 👋 Have a wonderful day. Remember, you can always reach us here or [book a clean](/book) anytime!";
    }

    // Products / eco
    if (/(product|chemical|safe|eco|green|toxic|allergi|child|pet|baby)/.test(msg)) {
        return "All our cleaning products are **biodegradable, non-toxic, and hypoallergenic**. They're completely safe for children, pets, and people with sensitive skin or respiratory conditions. 🌿\n\nWe never use harsh bleach or ammonia-based chemicals in homes.";
    }

    // Time / availability
    if (/(time|available|when|hours|early|late|weekend|sunday|saturday|emergency|urgent|asap)/.test(msg)) {
        return "We're available **7 days a week, 7 AM – 9 PM**. ⏰\n\nNeed an emergency or same-day clean? Our rapid-response teams can often accommodate within 2-3 hours. [Book now →](/book)";
    }

    // Default fallback
    return "I'd be happy to help with that! For specific requests, I can assist with:\n\n• **Booking** — schedule a cleaning session\n• **Pricing** — view our rates\n• **Services** — explore what we offer\n• **Areas** — check if we cover your location\n\nOr feel free to ask me anything else! 😊";
}

function renderMarkdown(text: string) {
    // Simple markdown: bold, links, line breaks
    const parts = text.split("\n");
    return parts.map((line, i) => {
        // Process bold (**text**)
        let processed = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // Process links [text](url)
        processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--color-accent)] underline hover:brightness-125">$1</a>');
        return (
            <span key={i}>
                <span dangerouslySetInnerHTML={{ __html: processed }} />
                {i < parts.length - 1 && <br />}
            </span>
        );
    });
}

function speakResponse(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Clean markdown symbols for speech
        const cleanText = text
            .replace(/\*\*/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract text from links
            .replace(/•/g, '')
            .replace(/[🏠🏢🛏️✨📍🗓️💡🌿📞📱💳🏦]/g, ''); // Remove emojis 

        const utterance = new SpeechSynthesisUtterance(cleanText);
        // Optional: you can try to select a specific voice if available
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

export default function FloatingReceptionist() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: WELCOME_MESSAGE },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 400);
        } else {
            // Stop TTS and recognition if closed
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                // Auto send after listening
                handleSendMessage(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const startListening = () => {
        if (!recognitionRef.current) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        // Stop any ongoing speech
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        setIsListening(true);
        try {
            recognitionRef.current.start();
        } catch (e) {
            console.error(e);
            setIsListening(false);
        }
    };

    const sendMessage = () => {
        handleSendMessage(input);
    };

    const handleSendMessage = (textToSubmit: string) => {
        const trimmed = textToSubmit.trim();
        if (!trimmed) return;

        // Ensure TTS is stopped before answering
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        const userMsg: Message = { role: "user", content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate slight delay for natural feel
        setTimeout(() => {
            const response = getAIResponse(trimmed);
            setMessages((prev) => [...prev, { role: "assistant", content: response }]);
            setIsTyping(false);

            // Speak the response
            speakResponse(response);

        }, 600 + Math.random() * 800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                        className="rounded-3xl w-[340px] md:w-[400px] shadow-[0_20px_60px_-15px_rgba(0,229,160,0.2)] flex flex-col overflow-hidden border border-[var(--color-accent)]/20"
                        style={{
                            background: "rgba(10, 10, 10, 0.95)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            maxHeight: "min(75vh, 600px)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-accent)]/30">
                                    <Bot className="w-5 h-5 text-[var(--color-accent)]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-tight">AI Receptionist</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4 text-white/50" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: "300px" }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot className="w-4 h-4 text-[var(--color-accent)]" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${msg.role === "user"
                                            ? "bg-[var(--color-accent)] text-black rounded-br-md font-medium"
                                            : "bg-white/5 text-[var(--color-cloud)] border border-white/5 rounded-bl-md"
                                            }`}
                                    >
                                        {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <User className="w-4 h-4 text-white/60" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2.5"
                                >
                                    <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-[var(--color-accent)]" />
                                    </div>
                                    <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 focus-within:border-[var(--color-accent)]/50 transition-colors px-3 py-2">
                                <button
                                    onClick={startListening}
                                    type="button"
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                                        }`}
                                >
                                    <Mic className="w-4 h-4" />
                                </button>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={isListening ? "Listening..." : input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isListening}
                                    placeholder="Ask me anything..."
                                    className="flex-grow bg-transparent outline-none text-sm text-white placeholder-white/30 px-1 disabled:opacity-50"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={(!input.trim() && !isListening) || isTyping}
                                    className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all flex-shrink-0"
                                >
                                    <Send className="w-4 h-4 text-black" />
                                </button>
                            </div>
                            <p className="text-[9px] text-white/20 text-center mt-2">Powered by MR TIDY AI • Available 24/7</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,160,0.4)] text-black relative z-10"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <>
                        <MessageCircle className="w-6 h-6" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black">
                            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                        </div>
                    </>
                )}
            </motion.button>
        </div>
    );
}
