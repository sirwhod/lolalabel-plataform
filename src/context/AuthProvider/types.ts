import { ReactNode } from 'react'

interface User {
  id: string
  name: string
  imgProfile: string
  departament: string
  permission: string
}

export interface UserAuth {
  user?: User
  token?: string
}

export interface ContextAuth extends UserAuth {
  userAuth: UserAuth | null
  wrongPassword: boolean
  authenticate: (username: string, password: string) => Promise<void>
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
