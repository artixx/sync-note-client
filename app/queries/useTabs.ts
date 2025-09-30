import { useQuery } from '@tanstack/react-query'

import { getTabs } from '~/api'
import { useRequest } from '~/modules/request'
import { TABS_KEY } from '~/queryKeys'

export const useTabs = () => {
  const { isAuthenticated, request } = useRequest({ withToken: false })

  return useQuery({
    staleTime: 1000 * 60,
    queryKey: TABS_KEY,
    queryFn: () => getTabs(request)(),
    enabled: isAuthenticated,
  })
}
