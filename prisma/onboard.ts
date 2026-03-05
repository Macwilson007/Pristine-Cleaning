import * as dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function main() {
    console.log("📡 Initializing Security Protocol (V-6 Stable)...");

    if (!process.env.DATABASE_URL) {
        console.error("❌ Critical Error: DATABASE_URL not found in environment.");
        process.exit(1);
    }

    // Standard v6 client initialization
    const prisma = new PrismaClient();

    const email = process.env.ADMIN_EMAIL || "admin@pristine.agency";
    const password = process.env.ADMIN_PASSWORD || "Pristine2026!";

    console.log(`🚀 Registering Security Clearance for: ${email}`);

    try {
        await prisma.$connect();
        console.log("🟢 Connection established. Syncing identity matrix...");

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                name: "Senior Operations Lead",
                email,
                password: hashedPassword,
            },
        });

        console.log("✅ Onboarding Complete. Security Layer V-12 Synchronized.");
        console.log(`🔗 Access Portal: /auth/login with password: ${password}`);
    } catch (error: any) {
        console.error("❌ Database Connection Failed.");
        console.error("Reason:", error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error("💀 Fatal Crash:");
    console.error(e);
    process.exit(1);
});
