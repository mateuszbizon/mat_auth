import { NextFunction, Request, Response } from "express";
import { REFRESH_TOKEN, TOKEN } from "../../constants";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { MESSAGES } from "../../constants/messages";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"
import { TRefreshTokenPayload } from "../../types";
import generateAccessToken from "../../utils/generateAccessToken";
import { TSignInResponse } from "../../types/responses/userResponse";

export async function getTokenController(req: Request, res: Response<TSignInResponse>, next: NextFunction) {
    try {
        const token = req.cookies[TOKEN]

        if (!token) {
            return next(new AuthenticationError(MESSAGES.auth.invalidToken))
        }

        const decodedToken = jwt.verify(token, REFRESH_TOKEN) as TRefreshTokenPayload

        const accessToken = generateAccessToken({
            id: decodedToken.id
        })

        res.status(200).json({
            token: accessToken,
            user: {
                id: decodedToken.id,
                name: decodedToken.name,
                username: decodedToken.username,
                email: decodedToken.email
            }
        })
    } catch (error) {
        console.error(error)

        if (error instanceof TokenExpiredError) {
            return next(new AuthenticationError(MESSAGES.auth.tokenExpired))
        }

        if (error instanceof JsonWebTokenError) {
            return next(new AuthenticationError(MESSAGES.auth.invalidToken))
        }

        next(new AuthenticationError())
    }
}