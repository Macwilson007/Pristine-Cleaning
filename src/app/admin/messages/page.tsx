"use client";

import { motion } from "framer-motion";
import {
    Search,
    MoreVertical,
    Send,
    MessageSquare,
    Phone,
    Clock,
    Filter,
    Plus,
    Bot
} from "lucide-react";
import { mockClients } from "@/lib/mock-data";

const conversations = [
    { id: 1, client: "Sarah Mitchell", lastMessage: "Yes, 10 AM works perfectly.", time: "12:30 PM", unread: 0, status: "Active" },
    { id: 2, client: "TechVault Inc.", lastMessage: "I've sent the facility floor plans.", time: "11:45 AM", unread: 2, status: "Pending" },
    { id: 3, client: "James Rivera", lastMessage: "AI handled the turnover setup.", time: "9:15 AM", unread: 0, status: "AI Managed" },
];

export default function MessagingPage() {
    return (
        <div className="h-[calc(100vh-140px)] flex gap-8">
            {/* Conversations Sidebar */}
            <div className="w-80 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-tighter italic">Comms <span className="text-[var(--color-accent)]">Hub</span></h2>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                        <Plus className="w-4 h-4 text-[var(--color-silver)]" />
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-silver)]" />
                    <input
                        type="text"
                        placeholder="Search threads..."
                        className="w-full bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                </div>

                <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {conversations.map((conv) => (
                        <div key={conv.id} className="glass-card p-4 border-white/5 hover:border-[var(--color-accent)]/20 cursor-pointer group transition-all">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black uppercase tracking-tighter italic group-hover:text-[var(--color-accent)] transition-colors">{conv.client}</span>
                                <span className="text-[8px] font-bold text-[var(--color-silver)]">{conv.time}</span>
                            </div>
                            <p className="text-[10px] text-[var(--color-mist)] truncate opacity-60 italic">"{conv.lastMessage}"</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className={`text-[8px] font-black uppercase tracking-widest ${conv.status === 'AI Managed' ? 'text-blue-400' : 'text-[var(--color-silver)]'
                                    }`}>
                                    {conv.status}
                                </span>
                                {conv.unread > 0 && (
                                    <div className="w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[8px] font-black text-black">
                                        {conv.unread}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Chat Area */}
            <div className="flex-grow glass-card flex flex-col border-white/5">
                {/* Chat Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center font-black italic">
                            S
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest italic">Sarah Mitchell</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Live on WhatsApp</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-[var(--color-silver)]">
                            <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-[var(--color-silver)]">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-grow p-8 overflow-y-auto space-y-6">
                    <div className="flex flex-col gap-4 max-w-[70%]">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">I need a deep clean for my apartment this weekend. Is anything available on Saturday?</p>
                        </div>
                        <span className="text-[8px] font-bold uppercase text-[var(--color-silver)] px-2">12:15 PM</span>
                    </div>

                    <div className="flex flex-col gap-4 max-w-[70%] self-end items-end">
                        <div className="p-4 rounded-2xl bg-[var(--color-accent)] text-black font-semibold shadow-glow">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/10">
                                <Bot className="w-3 h-3" />
                                <span className="text-[8px] font-black uppercase tracking-widest">AI Response</span>
                            </div>
                            <p className="text-xs leading-relaxed">Hi Sarah! I can certainly help with that. We have slots available this Saturday at 10 AM. Would you like to book it?</p>
                        </div>
                        <span className="text-[8px] font-bold uppercase text-[var(--color-silver)] px-2">12:15 PM</span>
                    </div>

                    <div className="flex flex-col gap-4 max-w-[70%] text-right self-end items-end">
                        <div className="p-4 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5">
                            <p className="text-xs leading-relaxed italic">Yes, 10 AM works perfectly.</p>
                        </div>
                        <span className="text-[8px] font-bold uppercase text-[var(--color-silver)] px-2 text-right">Just Now</span>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <button className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors text-[var(--color-silver)]">
                            <Filter className="w-4 h-4" />
                        </button>
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Take over from AI..."
                                className="w-full bg-[var(--color-charcoal)] border border-[var(--color-graphite)] rounded-xl py-3.5 px-5 text-sm outline-none focus:border-[var(--color-accent)] transition-colors font-semibold"
                            />
                        </div>
                        <button className="p-3.5 bg-[var(--color-accent)] text-black rounded-xl hover:brightness-110 transition-all shadow-glow">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="h-px bg-white/5 flex-grow" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--color-silver)]">End of thread Intelligence Active</span>
                        <div className="h-px bg-white/5 flex-grow" />
                    </div>
                </div>
            </div>
        </div>
    );
}
