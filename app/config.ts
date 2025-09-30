export const TAB_LIMIT = 10
export const TAB_CHARACTER_LIMIT = 10000

const ensureEnv = (value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${env}`)
  }

  return value
}

export const env = {
  VITE_BACKEND_URL: ensureEnv(import.meta.env.VITE_BACKEND_URL),
  VITE_GOOGLE_CLIENT_ID: ensureEnv(import.meta.env.VITE_GOOGLE_CLIENT_ID),
}
