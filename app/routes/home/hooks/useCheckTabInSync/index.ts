import { useTabs } from '~/queries/useTabs'
import type { Tab } from '~/api/types'

export const useCheckTabInSync = () => {
  const { data: serverTabs } = useTabs()

  const checkTabInSync = (clientTab: Tab) => {
    if (!serverTabs) return true

    const serverTab = serverTabs.find((one) => one.id === clientTab.id)

    return (
      serverTab &&
      serverTab.title === clientTab.title &&
      serverTab.content === clientTab.content
    )
  }

  return {
    checkTabInSync,
  }
}
