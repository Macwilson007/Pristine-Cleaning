import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import getPrisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const prisma = getPrisma();
        if (!prisma) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        const { name, email, password, phone, address, role = "USER" } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userRole = role === "ADMIN" ? "ADMIN" : "USER";
        
        console.log("Creating user with role:", userRole);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: userRole as any,
            }
        });
        
        console.log("User created:", user.id, user.role);

        if (phone || address) {
            await prisma.client.create({
                data: {
                    name: name || email,
                    email,
                    phone,
                    address,
                    userId: user.id
                }
            });
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { error: "Registration failed: " + errorMessage },
            { status: 500 }
        );
    }
}
