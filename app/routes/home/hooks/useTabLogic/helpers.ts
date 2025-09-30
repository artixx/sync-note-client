import { v4 as uuidv4 } from 'uuid'
import type { Tab } from '~/api/types'

export const generateTempId = () => `temp_${uuidv4()}`
export const isTempId = (id: string) => id.startsWith('temp_')
export const isTempTab = (tab: Tab) => isTempId(tab.id)

export const TABS_KEY = 'tabs'
export const DELETED_TABS_KEY = 'deletedTabs'
export const ACTIVE_TAB_KEY = 'activeTabId'
export const getLocalStorageData = <T>(key: string): T | undefined => {
  const str = localStorage.getItem(key)

  if (typeof str === 'string') {
    return JSON.parse(str)
  }

  return undefined
}
