import { useMemo } from 'react'
import { keymap } from '@codemirror/view'
import useLocalStorageState from 'use-local-storage-state'

export const useFontZoom = () => {
  const [fontSize, setFontSize] = useLocalStorageState<number>('fontSize', {
    defaultValue: 12,
  })

  const zoomKeymap = useMemo(
    () =>
      keymap.of([
        {
          key: 'Mod-=',
          run: () => {
            setFontSize((size) => Math.min(size + 1, 32))
            return true
          },
          preventDefault: true,
        },
        {
          key: 'Mod--',
          run: () => {
            setFontSize((size) => Math.max(size - 1, 8))
            return true
          },
          preventDefault: true,
        },
      ]),
    [setFontSize],
  )

  return {
    zoomKeymap,
    fontSize,
  }
}
