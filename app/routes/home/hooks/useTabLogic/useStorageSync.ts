import useLocalStorageState from 'use-local-storage-state'
import { isEqual } from 'lodash'

import type { Tab } from '~/api/types'
import {
  ACTIVE_TAB_KEY,
  DELETED_TABS_KEY,
  getLocalStorageData,
  isTempId,
  isTempTab,
  TABS_KEY,
} from '~/routes/home/hooks/useTabLogic/helpers'
import {
  useTabCreate,
  useTabDelete,
  useTabsGet,
  useTabUpdate,
} from '~/mutations/useTabMutations'
import { toastError } from '~/modules/error'
import { useCallback } from 'react'

const mergeTabs = (server: Tab[], local: Tab[], deleted: string[]): Tab[] => {
  const filteredServer = server.filter((sTab) => !deleted.includes(sTab.id))
  const filteredLocal = local.filter(
    (lTab) =>
      isTempTab(lTab) || filteredServer.some((sTab) => sTab.id === lTab.id),
  )

  return filteredServer.reduce(
    (merged, sTab) => {
      const existingTab = merged.find((lTab) => lTab.id === sTab.id)

      if (!existingTab) {
        return [...merged, sTab]
      }

      if (existingTab.updated > sTab.updated) {
        return merged
      }

      return merged.map((lTab) =>
        lTab.id === sTab.id ? { ...lTab, ...sTab } : lTab,
      )
    },
    [...filteredLocal],
  )
}

export const useStorageSync = () => {
  const { mutateAsync: getTabs } = useTabsGet()
  const { mutateAsync: createTab } = useTabCreate()
  const { mutateAsync: updateTab } = useTabUpdate()
  const { mutateAsync: deleteTab } = useTabDelete()
  const [, setLocalTabs] = useLocalStorageState<Tab[]>(TABS_KEY, {
    defaultValue: [],
  })
  const [, setDeletedIds] = useLocalStorageState<string[]>(DELETED_TABS_KEY, {
    defaultValue: [],
  })
  const [, setActiveTabId] = useLocalStorageState<string | null>(ACTIVE_TAB_KEY)

  const sync = useCallback(async () => {
    try {
      const serverTabs = await getTabs()
      const localTabs = getLocalStorageData<Tab[]>(TABS_KEY) || []
      const deletedIds = getLocalStorageData<string[]>(DELETED_TABS_KEY) || []

      if (isEqual(serverTabs, localTabs)) {
        return
      }

      const merged = mergeTabs(serverTabs, localTabs, deletedIds)
      setLocalTabs(merged)

      await Promise.all(
        merged.map(async (lTab) => {
          const serverTab = serverTabs.find((s) => s.id === lTab.id)
          const serverUpdated = serverTab?.updated || 0

          if (isTempTab(lTab)) {
            const newTab = await createTab(lTab)
            setLocalTabs((prev) =>
              prev.map((t) => (t.id === lTab.id ? { ...t, id: newTab.id } : t)),
            )
            setActiveTabId((activeTabId) =>
              activeTabId === lTab.id ? newTab.id : activeTabId,
            )
          } else if (lTab.updated > serverUpdated) {
            await updateTab(lTab)
          }
        }),
      )

      await Promise.all(
        deletedIds.map(async (delId) => {
          if (
            !isTempId(delId) &&
            serverTabs.find((sTab) => sTab.id === delId)
          ) {
            await deleteTab(delId)
            setDeletedIds((prev) => prev.filter((id) => id !== delId))
          } else {
            setDeletedIds((prev) => prev.filter((id) => id !== delId))
          }
        }),
      )
    } catch (error) {
      toastError(error)
    }
  }, [
    getTabs,
    updateTab,
    deleteTab,
    createTab,
    setLocalTabs,
    setActiveTabId,
    setDeletedIds,
  ])

  return { sync }
}
