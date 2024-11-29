import { getUsers } from '@/lib/services/userServices'
import { TGetUsers } from '@/types/responses'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

function useGetUsers() {
    const { data: users, mutate: handleGetUsers, isPending } = useMutation<TGetUsers>({
        mutationFn: getUsers,
        onError: () => {
            toast.error("Special 403 forbidden error")
        }
    })

  return {
    users,
    handleGetUsers,
    isPending,
  }
}

export default useGetUsers