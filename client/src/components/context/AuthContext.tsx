import { API, CustomAxiosRequestConfig } from '@/lib/services'
import { getToken } from '@/lib/services/authServices'
import { TUser } from '@/types'
import { TSignInResponse } from '@/types/responses'
import React, { createContext, PropsWithChildren, useContext, useEffect, useLayoutEffect, useState } from 'react'

type TAuthContext = {
    userData: TUser | null;
    isSignedIn: boolean | null;
    saveUser: (data: TSignInResponse) => void;
    clearUser: () => void;
}

const AuthContext = createContext<TAuthContext>({
    userData: null,
    isSignedIn: false,
    saveUser: () => {},
    clearUser: () => {},
})

export function useAuthContext() {
    return useContext(AuthContext)
}

function AuthContextProvider({ children }: PropsWithChildren) {
    const [userData, setUserData] = useState<TUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)

    function saveUser(data: TSignInResponse) {
        setToken(data.token)
        setUserData(data.user)
        setIsSignedIn(true)
    }

    function clearUser() {
        setToken(null)
        setUserData(null)
        setIsSignedIn(false)
    }

    useEffect(() => {
        const handleGetToken = async () => {
            try {
                const response: TSignInResponse = await getToken()

                saveUser(response)
            } catch {
                clearUser()
            }
        }

        handleGetToken()
    }, [])

    useLayoutEffect(() => {
        const authInterceptor = API.interceptors.request.use((config: CustomAxiosRequestConfig) => {
            config.headers.Authorization = token && !config._retry ? `Bearer ${token}` : config.headers.Authorization

            return config
        })

        return () => {
            API.interceptors.request.eject(authInterceptor)
        }
    }, [token])

    useLayoutEffect(() => {
        const refreshInterceptor = API.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest: CustomAxiosRequestConfig = error.config

                if (error.response.status == 403) {
                    try {
                        const response: TSignInResponse = await getToken()

                        saveUser(response)
                        originalRequest.headers.Authorization = `Bearer ${response.token}`
                        originalRequest._retry = true

                        return API(originalRequest)
                    } catch {
                        clearUser()
                    }
                }

                return Promise.reject(error)
            }
        )

        return () => {
            API.interceptors.response.eject(refreshInterceptor)
        }
    }, [])

    const value: TAuthContext = {
        userData,
        isSignedIn,
        saveUser,
        clearUser,
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider