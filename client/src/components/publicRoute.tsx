"use client"

import { useEffect } from "react"
import { useAuthContext } from "./context/AuthContext"
import { redirect } from "next/navigation"

export default function publicRoute(Component: any) {
    return function PublicComponent(props: any) {
        const { isSignedIn } = useAuthContext()

        useEffect(() => {
            if (isSignedIn == true) {
                redirect("/dashboard")
            }
        }, [isSignedIn])

        if (isSignedIn) {
            return null
        }

        return <Component {...props} />
    }
}