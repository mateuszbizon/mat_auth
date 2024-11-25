import { z } from "zod"
import { EMAIL_MESSAGE, NO_WHITESPACE_REGEX, PASSWORD_LENGTH_MESSAGE, PASSWORD_MIN_LENGTH, USER_NAME_LENGTH_MESSAGE, USER_NAME_MIN_LENGTH, USERNAME_LENGTH_MESSAGE, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, USERNAME_WHITESPACE_MESSAGE } from "../constants/validations"

export const signUpSchema = z.object({
    name: z.string().min(USER_NAME_MIN_LENGTH, USER_NAME_LENGTH_MESSAGE),
    username: z.string().min(USERNAME_MIN_LENGTH, USERNAME_LENGTH_MESSAGE).max(USERNAME_MAX_LENGTH, USERNAME_LENGTH_MESSAGE)
        .refine(value => {
            return !NO_WHITESPACE_REGEX.test(value)
        }, USERNAME_WHITESPACE_MESSAGE),
    email: z.string().email(EMAIL_MESSAGE),
    password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_MESSAGE)
})

export type TSignUpSchema = z.infer<typeof signUpSchema>