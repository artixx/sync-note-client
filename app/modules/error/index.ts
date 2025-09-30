import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const toastError = (error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error)

  if (error instanceof Error) {
    toast(error.message, { type: 'error' })
  } else {
    toast(String(error), { type: 'error' })
  }
}

export const useToastError = (error: unknown) => {
  useEffect(() => {
    if (error) {
      toastError(error)
    }
  }, [error])
}
