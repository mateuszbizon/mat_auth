export type TSignInResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        username: string;
        email: string
    }
}