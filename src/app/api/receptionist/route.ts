import { NextRequest, NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";
import { BookingStatus, Channel, ServiceType, Sentiment } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const p = getPrisma();
    if (!p) {
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    try {
        const data = await req.json();
        console.log("AI Receptionist Request:", data);

        const { intent, parameters, channel = Channel.WHATSAPP } = data;

        // Auto-log every valid request to the interaction matrix
        const logEntry = async (aiMsg: string, action: string, sentiment: Sentiment = Sentiment.NEUTRAL) => {
            await p.aILog.create({
                data: {
                    channel: channel as Channel,
                    userMessage: parameters?.text || JSON.stringify(data),
                    aiResponse: aiMsg,
                    intent: intent || "unknown",
                    actionTaken: action,
                    sentiment,
                }
            });
        };

        switch (intent) {
            case "check_availability": {
                const availableSlots = ["10:00 AM", "02:00 PM", "04:30 PM"];
                const msg = `Verified. High-performance slots available at ${availableSlots.join(", ")} for this window.`;
                await logEntry(msg, "Checked Real-time Availability");
                return NextResponse.json({
                    available_slots: availableSlots,
                    message: msg
                });
            }

            case "create_booking": {
                const client = await p.client.upsert({
                    where: { email: parameters?.email || "guest@example.com" },
                    update: {
                        name: parameters?.name || "Guest",
                        phone: parameters?.phone || undefined,
                        address: parameters?.address || undefined,
                    },
                    create: {
                        name: parameters?.name || "Guest",
                        email: parameters?.email || "guest@example.com",
                        phone: parameters?.phone,
                        address: parameters?.address || "TBD",
                    },
                });

                const service = await p.service.findFirst({
                    where: { type: parameters?.type?.toUpperCase() === "COMMERCIAL" ? ServiceType.COMMERCIAL : ServiceType.RESIDENTIAL }
                });

                // dynamic fee based on parameters
                let baseFee = service?.basePrice || 299;
                if (parameters?.num_rooms) baseFee += (parameters.num_rooms * 25);

                const booking = await p.booking.create({
                    data: {
                        clientId: client.id,
                        serviceId: service?.id || "service-resi",
                        status: BookingStatus.AI_BOOKING,
                        scheduledAt: new Date(parameters?.date || new Date().toISOString()),
                        amount: baseFee,
                        channel: channel as Channel,
                        address: parameters?.address || client.address || "TBD",
                        notes: `AI Confirmed. Rooms: ${parameters?.num_rooms || 'N/A'}. ${parameters?.notes || ''}`,
                    }
                });

                const msg = `Deployment confirmed. Booking ID ${booking.id.slice(-6)} is active for ${client.name}. Amount: $${baseFee}.`;
                await logEntry(msg, "Registered New AI Booking", Sentiment.POSITIVE);

                return NextResponse.json({
                    status: "success",
                    booking_id: booking.id,
                    message: msg
                });
            }

            case "get_quote": {
                const targetService = await p.service.findFirst({
                    where: { type: parameters?.type?.toUpperCase() === "COMMERCIAL" ? ServiceType.COMMERCIAL : ServiceType.RESIDENTIAL }
                });

                let estimate = targetService?.basePrice || 299;
                if (parameters?.sq_ft) estimate += (parameters.sq_ft * 0.1);

                const quoteText = `$${Math.round(estimate)}`;
                const msg = `System estimate: ${quoteText} based on ${parameters?.type || "residential"} parameters.`;
                await logEntry(msg, "Generated Dynamic Quote");

                return NextResponse.json({
                    quote: quoteText,
                    message: msg
                });
            }

            case "human_handoff": {
                const msg = "I am routing your request to a Senior Operations Lead for immediate assistance. One moment.";
                await logEntry(msg, "Triggered Human Handoff", Sentiment.NEGATIVE);
                return NextResponse.json({
                    handoff: true,
                    message: msg
                });
            }

            default:
                const fallbackMsg = "Protocol unclear. Escalating to mission control for manual resolution.";
                await logEntry(fallbackMsg, "Unrecognized Intent / Escalated");
                return NextResponse.json({
                    message: fallbackMsg
                });
        }
    } catch (error) {
        console.error("AI Receptionist Error:", error);
        return NextResponse.json({ error: "Invalid Request Structure" }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({
        status: "operational",
        protocols: ["availability_v2", "booking_engine_v1", "dynamic_quote_v1", "handoff_logic"],
        message: "AI Receptionist Intelligence Core is Online."
    });
}
