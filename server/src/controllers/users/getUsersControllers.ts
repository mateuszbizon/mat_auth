import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { getUsersService } from "../../services/users/getUsersService";

export async function getUsersController(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getUsersService()

        res.status(200).json({
            users: users
        })
    } catch (error) {
        console.error(error)

        next(new DatabaseError())
    }
}