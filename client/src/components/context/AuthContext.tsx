import { TUser } from '@/types'
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

type TAuthContext = {
    userData: TUser | null
}

const AuthContext = createContext<TAuthContext>({
    userData: null,
})

export function useAuthContext() {
    return useContext(AuthContext)
}

function AuthContextProvider({ children }: PropsWithChildren) {
    const [userData, setUserData] = useState<TUser | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const value: TAuthContext = {
        userData
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider