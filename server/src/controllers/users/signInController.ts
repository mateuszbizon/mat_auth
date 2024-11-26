import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { signInSchema, TSignInSchema } from "../../dtos/signInSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { MESSAGE_CODES } from "../../constants/messageCodes";
import { getUserByUsernameService } from "../../services/users/getUserByUsernameService";
import { MESSAGES } from "../../constants/messages";
import bcrypt from "bcryptjs"
import generateRefreshToken from "../../utils/generateRefreshToken";
import generateAccessToken from "../../utils/generateAccessToken";
import { TOKEN } from "../../constants";
import { TSignInResponse } from "../../types/responses/userResponse";

export async function signInController(req: Request<{}, {}, TSignInSchema>, res: Response<TSignInResponse>, next: NextFunction) {
    const { username, password } = req.body

    try {
        const validationResult = signInSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message, MESSAGE_CODES.validationFail))
        }

        const existingUsername = await getUserByUsernameService(username)

        if (!existingUsername) {
            return next(new BadRequestError(MESSAGES.auth.invalidCredentials, MESSAGE_CODES.invalidCredentials))
        }

        const passwordCorrect = await bcrypt.compare(password, existingUsername.password)

        if (!passwordCorrect) {
            return next(new BadRequestError(MESSAGES.auth.invalidCredentials, MESSAGE_CODES.invalidCredentials))
        }

        const refreshToken = generateRefreshToken({
            id: existingUsername.id,
            name: existingUsername.name,
            username: existingUsername.username,
            email: existingUsername.email
        })

        const accessToken = generateAccessToken({
            id: existingUsername.id
        })

        res.cookie(TOKEN, refreshToken, {
            httpOnly: true,    
        })

        res.status(200).json({
            token: accessToken,
            user: {
                id: existingUsername.id,
                name: existingUsername.name,
                username: existingUsername.username,
                email: existingUsername.email
            }
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError())
    }
}