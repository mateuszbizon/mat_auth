import { API } from ".";

export async function getToken() {
    const { data } = await API.get("/auth/get-token")

    return data
}