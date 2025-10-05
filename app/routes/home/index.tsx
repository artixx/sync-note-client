import { useCallback } from 'react'

import { Editor } from './components/Editor'
import { Tabs } from './components/Tabs'
import { useTabLogic } from '~/routes/home/hooks/useTabLogic'
import { Menu } from '~/routes/home/components/Menu'
import { useStorageSync } from '~/routes/home/hooks/useTabLogic/useStorageSync'
import { SaveButton } from '~/routes/home/components/SaveButton'
import { useCheckTabInSync } from '~/routes/home/hooks/useCheckTabInSync'

export const meta = () => {
  return [
    { title: 'Sync Note' },
    { name: 'description', content: 'Welcome to Sync Note!' },
  ]
}

const emptyFunction = () => {}

const Home = () => {
  const {
    tabs,
    activeTabId,
    handleTabSelect,
    handleTabClose,
    handleTabCreate,
    activeTab,
    handleTabEdit,
  } = useTabLogic()
  const { sync } = useStorageSync()
  const { checkTabInSync } = useCheckTabInSync()

  const onChange = useCallback(
    (text: string) => {
      if (!activeTab) {
        return
      }

      handleTabEdit({
        id: activeTab.id,
        content: text,
        title: activeTab.title,
      })
    },
    [handleTabEdit, activeTab],
  )

  const isSaveRequired = !tabs.every(checkTabInSync)

  return (
    <main className="flex flex-col justify-center grow items-stretch">
      <div className="flex">
        <SaveButton isActive={!tabs.every(checkTabInSync)} onSave={sync} />
        <Tabs
          tabs={tabs}
          activeTabId={activeTabId}
          onTabSelect={handleTabSelect}
          onTabClose={handleTabClose}
          onTabCreate={handleTabCreate}
        />
        <Menu />
      </div>
      {activeTab ? (
        <Editor
          value={activeTab.content}
          onChange={onChange}
          onSave={isSaveRequired ? sync : emptyFunction}
        />
      ) : (
        <div className="grow flex flex-col bg-back-1" />
      )}
    </main>
  )
}

export default Home
