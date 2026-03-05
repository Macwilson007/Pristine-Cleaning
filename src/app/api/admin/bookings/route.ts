import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    const p = getPrisma();
    if (!p) {
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    try {
        const bookings = await p.booking.findMany({
            include: {
                client: true,
                service: true,
            },
            orderBy: {
                scheduledAt: 'desc',
            },
        });

        // Map to simpler format for frontend
        const formattedBookings = bookings.map((b: any) => ({
            id: b.id,
            clientName: (b.client as any).name,
            serviceType: (b.service as any).name,
            date: b.scheduledAt.toLocaleDateString(),
            time: b.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: b.status,
            amount: Number(b.amount),
            channel: b.channel,
            address: b.address,
        }));

        return NextResponse.json(formattedBookings);
    } catch (error) {
        console.error("Fetch Bookings Error:", error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}
