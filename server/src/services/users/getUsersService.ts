import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getUsersService() {
    return await prisma.user.findMany()
}