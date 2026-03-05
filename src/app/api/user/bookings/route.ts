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

        const bookings = await prisma.booking.findMany({
            where: { userId: session.user.id },
            orderBy: { scheduledAt: "desc" },
            include: {
                service: true
            }
        });

        const result = bookings.map((b: { id: string; service?: { name: string }; serviceId: string; scheduledAt: Date; status: string; amount: { toNumber: () => number }; address: string; channel: string; notes: string | null }) => ({
            id: b.id,
            serviceType: b.service?.name || b.serviceId,
            scheduledAt: b.scheduledAt.toISOString(),
            status: b.status,
            amount: b.amount,
            address: b.address,
            channel: b.channel,
            notes: b.notes
        }));

        return NextResponse.json(result);

    } catch (error) {
        console.error("Bookings error:", error);
        return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
    }
}
