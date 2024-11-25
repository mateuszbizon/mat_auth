import { PrismaClient } from "@prisma/client";
import { TSignUpSchema } from "../../dtos/signUpSchema";

const prisma = new PrismaClient()

export async function createUserService(user: TSignUpSchema) {
    return await prisma.user.create({
        data: {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
        }
    })
}