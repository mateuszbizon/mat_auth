import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../constants";
import { TAccessTokenPayload } from "../types";

export default function generateAccessToken({ id }: TAccessTokenPayload) {
    return jwt.sign({
        id
    }, ACCESS_TOKEN, { expiresIn: "1h" })
}