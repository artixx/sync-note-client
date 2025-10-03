import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRequest } from '~/modules/request'
import { createTab, updateTab, deleteTab, getTabs } from '~/api'
import { TABS_KEY } from '~/queryKeys'
import type { Tab } from '~/api/types'

export const useTabsGet = () => {
  const { request } = useRequest({ withToken: false })

  return useMutation({
    mutationFn: getTabs(request),
  })
}

export const useTabCreate = () => {
  const { request } = useRequest()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tab: Tab) => createTab(request)(tab),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TABS_KEY })
    },
  })
}

export const useTabUpdate = () => {
  const { request } = useRequest()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tab: Tab) => updateTab(request)(tab),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TABS_KEY })
    },
  })
}

export const useTabDelete = () => {
  const { request } = useRequest()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tabId: Tab['id']) => deleteTab(request)(tabId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TABS_KEY })
    },
  })
}
