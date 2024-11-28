import axios, { InternalAxiosRequestConfig } from "axios"

export type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
}

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
})