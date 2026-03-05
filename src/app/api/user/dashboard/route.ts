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
            orderBy: { createdAt: "desc" },
            take: 10,
            include: {
                service: true
            }
        });

        const payments = await prisma.payment.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const stats = {
            totalBookings: bookings.length,
            totalSpent: payments
                .filter((p: { status: string }) => p.status === "COMPLETED")
                .reduce((sum: number, p: { amount: { toNumber: () => number } }) => sum + Number(p.amount), 0),
            pendingBookings: bookings.filter((b: { status: string }) => b.status === "PENDING").length,
            completedBookings: bookings.filter((b: { status: string }) => b.status === "COMPLETED").length
        };

        const recentBookings = bookings.slice(0, 5).map((b: { id: string; service?: { name: string }; serviceId: string; scheduledAt: Date; status: string; amount: { toNumber: () => number }; address: string }) => ({
            id: b.id,
            serviceType: b.service?.name || b.serviceId,
            scheduledAt: b.scheduledAt.toISOString(),
            status: b.status,
            amount: b.amount,
            address: b.address
        }));

        return NextResponse.json({
            stats,
            recentBookings
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
    }
}
