import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRequest } from '~/modules/request'
import { logout } from '~/api'
import { AUTH_USER_KEY } from '~/queryKeys'

export const useLogout = () => {
  const { request } = useRequest()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: AUTH_USER_KEY })
    },
  })
}
