import jwt from "jsonwebtoken"
import { REFRESH_TOKEN } from "../constants";
import { TRefreshTokenPayload } from "../types";

export default function generateRefreshToken({ id, name, username, email }: TRefreshTokenPayload) {
    return jwt.sign({
        id, username, name, email
    }, REFRESH_TOKEN, { expiresIn: "7d" })
}