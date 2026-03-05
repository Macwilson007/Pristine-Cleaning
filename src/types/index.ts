export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled" | "AI Booking";
export type BookingChannel = "WhatsApp" | "Voice Call" | "Web";

export interface Booking {
    id: string;
    clientName: string;
    clientEmail?: string;
    clientPhone?: string;
    serviceType: "Residential" | "Commercial" | "Short-Term Rental";
    date: string;
    time: string;
    status: BookingStatus;
    amount: number;
    channel: BookingChannel;
    address: string;
    notes?: string;
}

export interface AILog {
    id: string;
    time: string;
    channel: BookingChannel;
    userIntent: string;
    actionTaken: string;
    sentiment: "Positive" | "Neutral" | "Negative";
    rawInput?: string;
    response?: string;
}
