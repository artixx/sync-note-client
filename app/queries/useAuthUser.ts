import { useQuery } from '@tanstack/react-query'

import { getAuthUser } from '~/api'
import { AUTH_USER_KEY } from '~/queryKeys'

export const useAuthUser = () => {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: AUTH_USER_KEY,
    queryFn: () => getAuthUser(),
  })
}
