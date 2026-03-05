import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    const p = getPrisma();
    if (!p) {
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    try {
        const clients = await p.client.findMany({
            include: {
                _count: {
                    select: { bookings: true }
                },
                bookings: {
                    select: { amount: true }
                }
            }
        });

        const formattedClients = clients.map((c: any) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            address: c.address,
            totalBookings: c._count.bookings,
            totalSpent: c.bookings.reduce((sum: number, b: any) => sum + Number(b.amount), 0),
            status: c._count.bookings > 20 ? "High Value" : c._count.bookings > 0 ? "Active" : "New"
        }));

        return NextResponse.json(formattedClients);
    } catch (error) {
        console.error("Fetch Clients Error:", error);
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
    }
}
