import { TSignUpSchema } from "@/validations/signUpSchema";
import { API } from ".";

export async function signUp(user: TSignUpSchema) {
    const { data } = await API.post(`/users/sign-up`, user)

    return data
}