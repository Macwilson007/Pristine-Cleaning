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

        const payments = await prisma.payment.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" }
        });

        const result = payments.map(p => ({
            id: p.id,
            amount: p.amount,
            paymentMethod: p.paymentMethod,
            status: p.status,
            transactionId: p.transactionId,
            createdAt: p.createdAt.toISOString(),
            bookingId: p.bookingId
        }));

        return NextResponse.json(result);

    } catch (error) {
        console.error("Payments error:", error);
        return NextResponse.json({ error: "Failed to load payments" }, { status: 500 });
    }
}
