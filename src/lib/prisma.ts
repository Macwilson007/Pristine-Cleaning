import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const getPrisma = () => {
    if (typeof window !== "undefined") return null as any;
    if (!process.env.DATABASE_URL) return null as any;
    if (!globalThis.prisma) {
        globalThis.prisma = prismaClientSingleton();
    }
    return globalThis.prisma;
};

export default getPrisma;
