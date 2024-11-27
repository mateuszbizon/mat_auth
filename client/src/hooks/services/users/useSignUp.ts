import { signUp } from '@/lib/services/userServices'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

function useSignUp() {
    const router = useRouter()
    const { mutate: handleSignup, isPending } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            router.push("/sign-in")
        },
        onError: () => {
            console.log('something went wrong')
        }
    })

  return {
    handleSignup,
    isPending
  }
}

export default useSignUp