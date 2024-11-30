import { useAuthContext } from '@/components/context/AuthContext'
import { MESSAGES } from '@/constants/messages'
import { signIn } from '@/lib/services/userServices'
import getMessageCodes from '@/lib/utils/getMessageCodes'
import { TMainError, TSignInResponse } from '@/types/responses'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function useSignIn() {
    const { saveUser } = useAuthContext()
    const router = useRouter()
    const { mutate: handleSignIn, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: (data: TSignInResponse) => {
            saveUser(data)
            router.push("/dashboard")
        },
        onError: (error: AxiosError<TMainError>) => {
            if (error.response?.status == 400) {
                toast.error(getMessageCodes(error.response.data.messageCode))
                return
            }

            toast.error(MESSAGES.auth.signInFail)
        }
    })

  return {
    handleSignIn,
    isPending,
  }
}

export default useSignIn