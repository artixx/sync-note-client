import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useCallback } from 'react'

import { request } from '~/api'
import { useAuthUser } from '~/queries/useAuthUser'

// Request with authorisation
export const useRequest = (options: { withToken?: boolean } = {}) => {
  const { withToken = true } = options

  const { data: authUserData } = useAuthUser()

  const csrfToken = authUserData?.csrfToken

  const wrappedRequest = useCallback(
    <R>(args: AxiosRequestConfig<R>): Promise<AxiosResponse<R>> =>
      request({
        headers: {
          ...(withToken && csrfToken ? { ['x-csrf-token']: csrfToken } : null),
        },
        ...args,
      }),
    [csrfToken, withToken],
  )

  return {
    request: wrappedRequest,
    isAuthenticated: !!authUserData?.isAuthenticated,
  }
}
