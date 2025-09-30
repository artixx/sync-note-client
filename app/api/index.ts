import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { GetUserAuth, Tab } from '~/api/types'
import { env } from '~/config'

export const request = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
})

export type Request = <R>(
  args: AxiosRequestConfig<R>,
) => Promise<AxiosResponse<R>>

export const getAuthUser = async (): Promise<GetUserAuth> => {
  const { data } = await request.get('/auth/user')
  return data
}

export const logout = (request: Request) => async () => {
  await request({ method: 'POST', url: '/auth/logout' })
}

export const getTabs = (request: Request) => async () => {
  const { data } = await request<Tab[]>({ url: '/tabs', method: 'GET' })
  return data
}

export const createTab = (request: Request) => async (params: Tab) => {
  const { data } = await request<Tab>({
    url: '/tabs',
    method: 'POST',
    data: params,
  })
  return data
}

export const updateTab = (request: Request) => async (tab: Tab) => {
  const { data } = await request<Tab>({
    url: `/tabs/${tab.id}`,
    method: 'PUT',
    data: tab,
  })
  return data
}

export const deleteTab = (request: Request) => async (tabId: Tab['id']) => {
  const { data } = await request<{ success: true }>({
    url: `/tabs/${tabId}`,
    method: 'DELETE',
  })
  return data
}
