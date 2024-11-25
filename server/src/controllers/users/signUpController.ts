import { NextFunction, Request, Response } from "express";
import { signUpSchema, TSignUpSchema } from "../../dtos/signUpSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { getUserByUsernameService } from "../../services/users/getUserByUsernameService";
import { MESSAGES } from "../../constants/messages";
import { getUserByEmailService } from "../../services/users/getUserByEmailService";
import bcrypt from "bcryptjs"
import { createUserService } from "../../services/users/createUserService";

export async function signUpController(req: Request<{}, {}, TSignUpSchema>, res: Response, next: NextFunction) {
    const { name, username, email, password } = req.body

    try {
        const validationResult = signUpSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const existingUsername = await getUserByUsernameService(username)

        if (existingUsername) {
            return next(new BadRequestError(MESSAGES.user.usernameTaken))
        }

        const existingEmail = await getUserByEmailService(email)

        if (existingEmail) {
            return next(new BadRequestError(MESSAGES.user.emailTaken))
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const createdUser = await createUserService({ name, username, email, password: hashedPassword })

        res.status(201).json({
            message: "User signed up"
        })
    } catch (error) {
        console.error(error)
    }
}