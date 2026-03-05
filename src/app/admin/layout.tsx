"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    MessageSquare,
    LogOut,
    Sparkles,
    BarChart3
} from "lucide-react";

const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Clients", href: "/admin/clients", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Messaging", href: "/admin/messages", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        } else if (status === "authenticated") {
            const role = (session?.user as any)?.role;
            if (role !== "ADMIN") {
                router.push("/dashboard");
            }
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[var(--color-black)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const role = (session?.user as any)?.role;
    if (role !== "ADMIN") {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-[var(--color-black)] text-[var(--color-white)] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />

            {/* Sidebar */}
            <aside className="w-64 border-r border-[var(--color-graphite)] flex flex-col fixed inset-y-0 z-50 bg-[var(--color-jet)]">
                {/* Logo */}
                <div className="h-20 flex items-center px-8 border-b border-[var(--color-graphite)]">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                        <span className="font-bold tracking-widest text-lg uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                            PRISTINE
                        </span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-grow py-8 px-4 space-y-2">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                    ? "bg-[var(--color-accent)] text-[var(--color-black)] shadow-glow"
                                    : "text-[var(--color-silver)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-white)]"
                                    }`}
                            >
                                <link.icon className={`w-5 h-5 ${isActive ? "" : "group-hover:text-[var(--color-accent)]"}`} strokeWidth={2} />
                                <span className="text-sm font-semibold tracking-wide">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Bottom */}
                <div className="p-4 border-t border-[var(--color-graphite)]">
                    <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 w-full px-4 py-3 text-[var(--color-silver)] hover:text-red-400 transition-colors group"
                    >
                        <LogOut className="w-5 h-5" strokeWidth={2} />
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow pl-64">
                {/* Top Header */}
                <header className="h-20 border-b border-[var(--color-graphite)] flex items-center justify-between px-10 sticky top-0 bg-[var(--color-black)]/80 backdrop-blur-md z-40">
                    <h1 className="text-xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-heading)" }}>
                        Command <span className="text-[var(--color-accent)]">Center</span>
                    </h1>

                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full border border-[var(--color-graphite)] bg-[var(--color-charcoal)] flex items-center justify-center font-bold">
                            {session?.user?.name ? session.user.name[0].toUpperCase() : "A"}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
