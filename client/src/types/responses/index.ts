export type TMainError = {
    message: string;
    messageCode: string;
}

export type TSignInResponse = {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        username: string;
    }
}