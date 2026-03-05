import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    const p = getPrisma();
    if (!p) {
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    try {
        const [totalRevenue, bookingsCount, clientsCount] = await Promise.all([
            p.booking.aggregate({ _sum: { amount: true } }),
            p.booking.count(),
            p.client.count(),
        ]);

        const stats = [
            { label: "Total Revenue", value: `$${totalRevenue._sum.amount?.toLocaleString() || 0}`, trend: "+12.5%", positive: true },
            { label: "New Bookings", value: bookingsCount.toString(), trend: "+8.2%", positive: true },
            { label: "Active Clients", value: clientsCount.toString(), trend: "-2.4%", positive: false },
            { label: "AI Efficiency", value: "99.8%", trend: "Stable", positive: true },
        ];

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Fetch Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
