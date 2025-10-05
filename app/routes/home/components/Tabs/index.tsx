import { type FC } from 'react'
import cx from 'classnames'

import { type Tab } from '~/api/types'
import styles from './index.module.css'
import { TAB_LIMIT } from '~/config'
import { useCheckTabInSync } from '../../hooks/useCheckTabInSync'

export const Tabs: FC<{
  tabs: Tab[]
  activeTabId: Tab['id'] | null
  onTabSelect: (id: Tab['id']) => void
  onTabClose: (id: Tab['id']) => void
  onTabCreate: () => void
}> = ({ tabs, activeTabId, onTabSelect, onTabClose, onTabCreate }) => {
  const { checkTabInSync } = useCheckTabInSync()

  return (
    <div className="flex grow flex-row bg-back-2 overflow-hidden pt-1 min-h-8.5">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={cx(
            styles.tab,
            { [styles.tabActive]: activeTabId === tab.id },
            `relative text-text-1 flex items-center pl-3 py-1.5 min-w-0 text-xs transition-background duration-100 select-none rounded-t-md
              ${
                activeTabId === tab.id
                  ? 'bg-back-1 shadow-lg'
                  : 'bg-back-2 hover:bg-back-3'
              }
            `,
          )}
          onClick={() => onTabSelect(tab.id)}
        >
          <span className="truncate flex-1">
            {tab.title || tab.content.split('\n')[0] || 'untitled'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onTabClose(tab.id)
            }}
            className={cx(
              styles.closeButton,
              { [styles.closeButtonOutSync]: !checkTabInSync(tab) },
              'py-1 px-1 mx-1 rounded text-text-1 opacity-66 hover:opacity-100 transition-color duration-100 flex-shrink-0',
            )}
          >
            <svg
              className={cx(styles.editedIndicator, 'w-2.5 h-2.5')}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
            </svg>
            <svg
              className={cx(styles.closeIndicator, 'w-2.5 h-2.5')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      {tabs.length < TAB_LIMIT && (
        <button
          onClick={() => {
            onTabCreate()
          }}
          className="py-1 px-2 rounded text-text-1 opacity-66 hover:opacity-100 transition-color duration-100 flex-shrink-0"
        >
          <svg
            className="w-2.5 h-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 6v12M6 12h12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
