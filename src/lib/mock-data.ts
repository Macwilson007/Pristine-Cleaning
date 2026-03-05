import { Booking, AILog } from "@/types";

export const mockBookings: Booking[] = [
    {
        id: "BK-2401",
        clientName: "Sarah Mitchell",
        serviceType: "Residential",
        date: "2026-03-05",
        time: "14:30",
        status: "Confirmed",
        amount: 50000,
        channel: "Web",
        address: "123 Maple St, Los Angeles"
    },
    {
        id: "BK-2402",
        clientName: "TechVault Inc.",
        serviceType: "Commercial",
        date: "2026-03-06",
        time: "18:00",
        status: "Pending",
        amount: 1200000,
        channel: "WhatsApp",
        address: "900 Corporate Way, Irvine"
    },
    {
        id: "BK-2403",
        clientName: "James Rivera",
        serviceType: "Short-Term Rental",
        date: "2026-03-06",
        time: "11:00",
        status: "AI Booking",
        amount: 35000,
        channel: "WhatsApp",
        address: "450 Ocean Ave, Santa Monica"
    },
    {
        id: "BK-2404",
        clientName: "Elena Kozlova",
        serviceType: "Residential",
        date: "2026-03-07",
        time: "09:00",
        status: "Confirmed",
        amount: 25000,
        channel: "Voice Call",
        address: "789 Pine Rd, Beverly Hills"
    },
    {
        id: "BK-2405",
        clientName: "Marcello Rossi",
        serviceType: "Commercial",
        date: "2026-03-08",
        time: "20:00",
        status: "Completed",
        amount: 150000,
        channel: "Web",
        address: "101 Ferrari Dr, Lake Forest"
    }
];

export const mockAILogs: AILog[] = [
    {
        id: "LOG-101",
        time: "Just Now",
        channel: "WhatsApp",
        userIntent: "Booking Inquiry",
        actionTaken: "Checking Availability",
        sentiment: "Positive",
        rawInput: "I need a deep clean for my apartment this weekend.",
        response: "Hi Sarah! I can certainly help with that. We have slots available this Saturday at 10 AM. Would you like to book it?"
    },
    {
        id: "LOG-102",
        time: "5m Ago",
        channel: "Voice Call",
        userIntent: "Reschedule Clean",
        actionTaken: "Updated DB",
        sentiment: "Neutral",
        rawInput: "Can we move my booking from Friday to Monday?",
        response: "Certainly. I've updated your booking BK-2402 to Monday, March 9th at 3 PM."
    },
    {
        id: "LOG-103",
        time: "12m Ago",
        channel: "WhatsApp",
        userIntent: "New Lead (Enterprise)",
        actionTaken: "Auto-Draft Quote",
        sentiment: "Positive",
        rawInput: "Looking for daily office maintenance for our new 5,000 sq ft facility.",
        response: "That sounds like a great project! I've drafted a custom quote for our enterprise team to review. You'll hear from an agent shortly."
    }
];

export const mockClients = [
    {
        id: "CL-01",
        name: "Sarah Mitchell",
        email: "sarah.m@gmail.com",
        phone: "+1 (555) 123-4567",
        address: "123 Maple St, Los Angeles",
        totalBookings: 12,
        totalSpent: 600000,
        status: "Active"
    },
    {
        id: "CL-02",
        name: "TechVault Inc.",
        email: "ops@techvault.com",
        phone: "+1 (555) 900-8000",
        address: "900 Corporate Way, Irvine",
        totalBookings: 45,
        totalSpent: 54000000,
        status: "High Value"
    },
    {
        id: "CL-03",
        name: "James Rivera",
        email: "james.riv@outlook.com",
        phone: "+1 (555) 450-1010",
        address: "450 Ocean Ave, Santa Monica",
        totalBookings: 8,
        totalSpent: 280000,
        status: "Active"
    },
    {
        id: "CL-04",
        name: "Elena Kozlova",
        email: "elena.k@me.com",
        phone: "+1 (555) 789-2222",
        address: "789 Pine Rd, Beverly Hills",
        totalBookings: 3,
        totalSpent: 75000,
        status: "New"
    }
];
