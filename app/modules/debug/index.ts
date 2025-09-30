import { useEffect } from 'react'

export const useLog = (...args: unknown[]) =>
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(...args)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...args])
