import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getUserByUsernameService(username: string) {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    })
}