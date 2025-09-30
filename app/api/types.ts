export type User = {
  id: string
  email: string
  name: string
}

export type Tab = {
  id: string
  title: string
  content: string
  updated: number
}

export type GetUserAuth =
  | {
      isAuthenticated: true
      user: User
      csrfToken: string
    }
  | {
      isAuthenticated: false
      user: null
      csrfToken: null
    }
