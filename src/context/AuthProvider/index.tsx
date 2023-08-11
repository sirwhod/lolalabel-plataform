import { createContext, useEffect, useState } from 'react'
import { AuthProviderProps, ContextAuth, UserAuth } from './types'
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from './util'

export const AuthContext = createContext<ContextAuth>({} as ContextAuth)

export function AuthProvider({ children }: AuthProviderProps) {
  const [userAuth, setUserAuth] = useState<UserAuth | null>(() => {
    const storageValue = localStorage.getItem('u')

    if (storageValue) {
      return JSON.parse(storageValue)
    } else {
      return null
    }
  })
  const [wrongPassword, setWrongPassword] = useState<boolean>(false)

  function verifyIfLogged() {
    const user = getUserLocalStorage()
    if (user) {
      setUserAuth(user)
    }
  }

  useEffect(() => {
    verifyIfLogged()
  }, [])

  async function authenticate(username: string, password: string) {
    try {
      const response = await LoginRequest(username, password)

      const payload = { token: response.token, user: response.user }

      setUserAuth(payload)
      setUserLocalStorage(payload)
      setWrongPassword(false)
    } catch (err) {
      if (err) {
        setWrongPassword(true)
      }
    }
  }

  function logout() {
    setUserAuth(null)
    setUserLocalStorage(null)
  }

  return (
    <AuthContext.Provider
      value={{ userAuth, wrongPassword, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
