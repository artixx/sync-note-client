import {
  type ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'

export type ThemeType = 'dark' | 'light'

const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)')
const getTheme = (): ThemeType => (darkModeMedia.matches ? 'dark' : 'light')
const ThemeContext = createContext(getTheme())

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme())

  useLayoutEffect(() => {
    const listener = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }

    darkModeMedia.addEventListener('change', listener)

    return () => void darkModeMedia.removeEventListener('change', listener)
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeType => useContext(ThemeContext)
