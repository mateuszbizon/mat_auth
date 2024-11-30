"use client"

import { useEffect } from "react"
import { useAuthContext } from "./context/AuthContext"
import { redirect } from "next/navigation"

export default function protectRoute(Component: any) {
    return function ProtectedComponent(props: any) {
        const { isSignedIn } = useAuthContext()

        useEffect(() => {
            if (isSignedIn == false) {
                redirect("/")
            }
        }, [isSignedIn])

        if (!isSignedIn) {
            return null
        }

        return <Component {...props} />
    }
}