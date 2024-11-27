import { MESSAGES } from '@/constants/messages'
import { signUp } from '@/lib/services/userServices'
import getMessageCodes from '@/lib/utils/getMessageCodes'
import { TMainError } from '@/types/responses'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function useSignUp() {
    const router = useRouter()
    const { mutate: handleSignup, isPending } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            router.push("/sign-in")
            toast.success(MESSAGES.user.signUpSuccess)
        },
        onError: (error: AxiosError<TMainError>) => {
            if (error.response?.status == 400) {
                toast.error(getMessageCodes(error.response.data.messageCode))
                return
            }

            toast.error(MESSAGES.user.signUpFail)
        }
    })

  return {
    handleSignup,
    isPending
  }
}

export default useSignUp