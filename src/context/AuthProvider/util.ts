import { api } from '../../lib/axios'
import { UserAuth } from './types'

export function setUserLocalStorage(user: UserAuth | null) {
  localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('u')

  if (!json) {
    return null
  }

  const user = JSON.parse(json)
  return user
}

export async function LoginRequest(username: string, password: string) {
  try {
    const headers = {
      username,
      password,
    }
    const request = await api.post('/auth', {}, { headers })

    return request.data
  } catch (err) {
    console.log(err)

    return null
  }
}
