export type TAccessTokenPayload = {
    id: string;
}

export type TRefreshTokenPayload = {
    id: string;
    username: string;
    name: string;
    email: string;
}