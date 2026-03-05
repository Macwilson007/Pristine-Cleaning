import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import getPrisma from "@/lib/prisma";

export async function GET() {
    try {
        const prisma = getPrisma();
        if (!prisma) {
            return NextResponse.json({ error: "Database not configured" }, { status: 500 });
        }

        let settings = await prisma.siteSettings.findUnique({
            where: { id: "default" }
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: "default" }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Settings error:", error);
        return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const role = (session.user as any)?.role;
        if (role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const prisma = getPrisma();
        if (!prisma) {
            return NextResponse.json({ error: "Database not configured" }, { status: 500 });
        }

        const body = await req.json();
        const { email, phone, address, twitter, instagram, linkedin } = body;

        const settings = await prisma.siteSettings.upsert({
            where: { id: "default" },
            update: { email, phone, address, twitter, instagram, linkedin },
            create: { id: "default", email, phone, address, twitter, instagram, linkedin }
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
