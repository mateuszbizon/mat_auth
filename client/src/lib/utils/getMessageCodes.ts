import { MESSAGES } from "@/constants/messages"

export default function getMessageCodes(message: string): string {
    const messages: { [key: string]: string } = {
        "EMAIL_TAKEN" : MESSAGES.user.emailTaken,
        "USERNAME_TAKEN" : MESSAGES.user.usernameTaken,
        "INVALID_CREDENTIALS" : MESSAGES.auth.invalidCredentials,
        "VALIDATION_FAIL" : message,
    }

    return messages[message] || "Something bad happened"
}