import { type FC, useRef, useMemo } from 'react'
import { debounce } from '@tanstack/react-pacer'
import CodeMirror, { EditorView, EditorState } from '@uiw/react-codemirror'
import { basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { monokai } from '@uiw/codemirror-theme-monokai'
import { vscodeLight } from '@uiw/codemirror-theme-vscode'

import { useFontZoom } from './hooks/useFontZoom'
import { useDynamicHeight } from './hooks/useDynamicHeight'
import { useTheme } from '~/modules/theme'
import { toastError } from '~/modules/error'
import { TAB_CHARACTER_LIMIT } from '~/config'

const disableOutline = EditorView.theme({
  '&.cm-focused': {
    outline: 'none',
  },
})

const characterLimit = EditorState.changeFilter.of((tr) => {
  const isInLimit = tr.newDoc.length <= TAB_CHARACTER_LIMIT

  if (!isInLimit) {
    toastError(
      `The character limit of ${TAB_CHARACTER_LIMIT} has been exceeded.`,
    )
  }

  return isInLimit
})

export const Editor: FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const onChangeDebounced = useMemo(
    () =>
      debounce(onChange, {
        wait: 333,
      }),
    [onChange],
  )

  const { height } = useDynamicHeight({ containerRef })

  const { zoomKeymap, fontSize } = useFontZoom()

  const extensions = useMemo(
    () => [basicSetup, markdown(), zoomKeymap, disableOutline, characterLimit],
    [zoomKeymap],
  )

  const theme = useTheme()

  return (
    <div ref={containerRef} className="grow flex flex-col">
      <CodeMirror
        style={{ fontSize: `${fontSize}pt` }}
        value={value}
        height={`${height}px`}
        extensions={extensions}
        onChange={onChangeDebounced}
        autoFocus={true}
        theme={theme === 'light' ? vscodeLight : monokai}
      />
    </div>
  )
}
