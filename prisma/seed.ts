import { PrismaClient, ServiceType, BookingStatus, Channel, Sentiment } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Create Services
    const resiService = await prisma.service.upsert({
        where: { id: 'service-resi' },
        update: {},
        create: {
            id: 'service-resi',
            name: 'Premium Residential',
            type: ServiceType.RESIDENTIAL,
            basePrice: 299,
            description: 'Deep cleans, recurring maintenance, move-in/move-out.',
        },
    });

    const commService = await prisma.service.upsert({
        where: { id: 'service-comm' },
        update: {},
        create: {
            id: 'service-comm',
            name: 'Enterprise Office',
            type: ServiceType.COMMERCIAL,
            basePrice: 1200,
            description: 'Professional-grade cleaning for offices and retail spaces.',
        },
    });

    const rentalService = await prisma.service.upsert({
        where: { id: 'service-rental' },
        update: {},
        create: {
            id: 'service-rental',
            name: 'Airbnb Turnover',
            type: ServiceType.SHORT_TERM_RENTAL,
            basePrice: 149,
            description: 'Lightning-fast turnovers between guests.',
        },
    });

    // 2. Create Clients
    const client1 = await prisma.client.upsert({
        where: { email: 'sarah.m@gmail.com' },
        update: {},
        create: {
            name: 'Sarah Mitchell',
            email: 'sarah.m@gmail.com',
            phone: '+1 (555) 123-4567',
            address: '123 Maple St, Los Angeles',
        },
    });

    const client2 = await prisma.client.upsert({
        where: { email: 'ops@techvault.com' },
        update: {},
        create: {
            name: 'TechVault Inc.',
            email: 'ops@techvault.com',
            phone: '+1 (555) 900-8000',
            address: '900 Corporate Way, Irvine',
        },
    });

    // 3. Create Bookings
    await prisma.booking.create({
        data: {
            clientId: client1.id,
            serviceId: resiService.id,
            status: BookingStatus.CONFIRMED,
            scheduledAt: new Date('2026-03-05T14:30:00'),
            amount: 299,
            channel: Channel.WEB,
            address: '123 Maple St, Los Angeles',
        },
    });

    await prisma.booking.create({
        data: {
            clientId: client2.id,
            serviceId: commService.id,
            status: BookingStatus.PENDING,
            scheduledAt: new Date('2026-03-06T18:00:00'),
            amount: 1200,
            channel: Channel.WHATSAPP,
            address: '900 Corporate Way, Irvine',
        },
    });

    // 4. Create AI Logs
    await prisma.aILog.create({
        data: {
            channel: Channel.WHATSAPP,
            userMessage: 'I need a deep clean for my apartment this weekend.',
            aiResponse: 'Hi Sarah! I can certainly help with that. We have slots available this Saturday at 10 AM.',
            intent: 'Booking Inquiry',
            actionTaken: 'Checking Availability',
            sentiment: Sentiment.POSITIVE,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
