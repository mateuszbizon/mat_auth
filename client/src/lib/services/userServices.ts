import { TSignUpSchema } from "@/validations/signUpSchema";
import { API } from ".";
import { TSignInSchema } from "@/validations/signInSchema";

export async function signUp(user: TSignUpSchema) {
    const { data } = await API.post(`/users/sign-up`, user)

    return data
}

export async function signIn(user: TSignInSchema) {
    const { data } = await API.post(`/users/sign-in`, user)

    return data
}