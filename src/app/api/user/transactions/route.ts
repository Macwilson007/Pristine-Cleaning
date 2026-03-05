import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import getPrisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prisma = getPrisma();
        if (!prisma) {
            return NextResponse.json({ error: "Database not configured" }, { status: 500 });
        }

        const userId = session.user.id;

        const bookings = await prisma.booking.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const payments = await prisma.payment.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const transactions = [
            ...bookings.map((b: { id: string; serviceId: string; amount: number; status: string; createdAt: Date }) => ({
                id: `BK-${b.id}`,
                type: "BOOKING" as const,
                description: `Booking: ${b.serviceId}`,
                amount: b.amount,
                status: b.status,
                createdAt: b.createdAt.toISOString(),
                referenceId: b.id
            })),
            ...payments.map((p: { id: string; amount: number; status: string; createdAt: Date; bookingId: string | null }) => ({
                id: `PY-${p.id}`,
                type: "PAYMENT" as const,
                description: `Payment for booking`,
                amount: p.amount,
                status: p.status,
                createdAt: p.createdAt.toISOString(),
                referenceId: p.bookingId || undefined
            }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(transactions);

    } catch (error) {
        console.error("Transactions error:", error);
        return NextResponse.json({ error: "Failed to load transactions" }, { status: 500 });
    }
}
