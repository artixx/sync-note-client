import { useCallback } from 'react'

import { Editor } from './components/Editor'
import { Tabs } from './components/Tabs'
import { useTabLogic } from '~/routes/home/hooks/useTabLogic'
import { Menu } from '~/routes/home/components/Menu'

export const meta = () => {
  return [
    { title: 'Sync Note' },
    { name: 'description', content: 'Welcome to Sync Note!' },
  ]
}

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

  return (
    <main className="flex flex-col justify-center grow items-stretch">
      <div className="flex">
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
        <Editor value={activeTab.content} onChange={onChange} />
      ) : (
        <div className="grow flex flex-col" />
      )}
    </main>
  )
}

export default Home
