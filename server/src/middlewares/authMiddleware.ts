import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { ACCESS_TOKEN } from "../constants";
import { TAccessTokenPayload } from "../types";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return next(new ForbiddenError())
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN) as TAccessTokenPayload

        res.locals.userId = decodedToken.id

        next()
    } catch (error) {
        console.error(error)

        if (error instanceof TokenExpiredError) {
            return next(new ForbiddenError())
        }

        if (error instanceof JsonWebTokenError) {
            return next(new ForbiddenError())
        }

        next(new ForbiddenError())
    }
}