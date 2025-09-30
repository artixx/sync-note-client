import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { type Tab } from '~/api/types'
import { useAuthUser } from '~/queries/useAuthUser'
import {
  isTempTab,
  DELETED_TABS_KEY,
  ACTIVE_TAB_KEY,
  TABS_KEY,
  generateTempId,
} from './helpers'
import { useStorageSync } from './useStorageSync'

type UseTabStorage = () => {
  tabs: Tab[]
  createTab: () => Tab
  editTab: (editedTab: Omit<Tab, 'updated'>) => void
  deleteTab: (tabId: Tab['id']) => void
}

const useTabStorage: UseTabStorage = () => {
  const [tabs, setTabs] = useLocalStorageState<Tab[]>(TABS_KEY, {
    defaultValue: [],
  })
  const [, setDeletedIds] = useLocalStorageState<string[]>(DELETED_TABS_KEY, {
    defaultValue: [],
  })

  const { data: authData, isLoading } = useAuthUser()
  const { sync } = useStorageSync()
  const isAuthenticated = !!authData?.isAuthenticated

  useEffect(() => {
    if (isAuthenticated) {
      sync()
    } else if (!isLoading) {
      setTabs((tabs) => tabs.filter((one) => isTempTab(one)))
    }
  }, [isAuthenticated, isLoading, setTabs, sync])

  const authSync = useCallback(() => {
    if (isAuthenticated) {
      setTimeout(sync, 0)
    }
  }, [sync, isAuthenticated])

  return {
    tabs,
    createTab: () => {
      const newTab = {
        id: generateTempId(),
        title: '',
        content: '',
        updated: Date.now(),
      }
      setTabs((prevTabs) => {
        return [...prevTabs, newTab]
      })
      authSync()
      return newTab
    },
    editTab: useCallback(
      (editedTab) => {
        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === editedTab.id
              ? {
                  ...editedTab,
                  updated: Date.now(),
                }
              : tab,
          ),
        )
        authSync()
      },
      [setTabs, authSync],
    ),
    deleteTab: (tabId: Tab['id']) => {
      setDeletedIds((prev) => [...new Set([...prev, tabId])])
      setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId))
      authSync()
    },
  }
}

export const useTabLogic = () => {
  const { tabs, editTab, deleteTab, createTab } = useTabStorage()
  const [activeTabId, setActiveTabId] = useLocalStorageState<string | null>(
    ACTIVE_TAB_KEY,
    {
      defaultValue: null,
    },
  )

  const handleTabSelect = (tabId: Tab['id']) => {
    setActiveTabId(tabId)
  }

  const handleTabClose = (tabIdToClose: Tab['id']) => {
    const hasData = Boolean(
      tabs.find((tab) => tab.id === tabIdToClose)?.content,
    )

    if (!hasData || confirm('Delete tab?')) {
      deleteTab(tabIdToClose)

      if (activeTabId === tabIdToClose && tabs.length > 1) {
        const nextActiveTab = tabs
          .slice()
          .reverse()
          .find((tab) => tab.id !== tabIdToClose)
        setActiveTabId(nextActiveTab?.id || null)
      } else if (tabs.length === 1) {
        setActiveTabId(null)
      }
    }
  }

  const handleTabCreate = () => {
    const { id } = createTab()
    setActiveTabId(id)
  }

  const activeTab = activeTabId
    ? tabs.find((tab) => tab.id === activeTabId) || null
    : null

  const handleTabEdit = useCallback(
    (tab: Omit<Tab, 'updated'>) => {
      editTab(tab)
    },
    [editTab],
  )

  return {
    tabs,
    activeTabId,
    activeTab,
    handleTabSelect,
    handleTabClose,
    handleTabCreate,
    handleTabEdit,
  }
}
