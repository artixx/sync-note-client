import { useEffect } from 'react'

export const MyAd = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('%cContact author: @oauth', 'color: #ff9800; font-size: 24px')
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return null
}
