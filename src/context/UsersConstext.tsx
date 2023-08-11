import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { useAuth } from './AuthProvider/useAuth'

export interface User {
  id: string
  username: string
  name: string
  imgProfile: string
  departament: string
  permission: string
  active: boolean
}

interface NewUser {
  name: string
  username: string
  departament:
    | 'Tecnologia da Informação'
    | 'Marketing de Produto'
    | 'Garantia da Qualidade'
  permission: 'Administrador' | 'MKT1' | 'MKT2' | 'REGCAD1' | 'REGCAD2'
  password: string
}

interface AlterInfoUserProps {
  id: string
  departament:
    | 'Tecnologia da Informação'
    | 'Marketing de Produto'
    | 'Garantia da Qualidade'
  permission: 'Administrador' | 'MKT1' | 'MKT2' | 'REGCAD1' | 'REGCAD2'
  active: boolean
}

interface AlterMyPasswordProps {
  password: string
}

interface AlterPasswordProps {
  id: string
  password: string
}

interface UserContextType {
  usersRegistred: User[]
  searchFilteredUsers: (
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) => void
  clearSearchInputUsers: (
    page: 'Registred' | 'Validation' | 'History',
  ) => Promise<void>
  createNewUser: (data: NewUser) => Promise<void>
  alterInfoUser: (data: AlterInfoUserProps) => Promise<void>
  alterPassword: (data: AlterPasswordProps) => Promise<void>
  alterMyPassword: (data: AlterMyPasswordProps) => Promise<void>
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UsersContext = createContext({} as UserContextType)

export function UsersContextProvider({ children }: UserContextProviderProps) {
  const { userAuth } = useAuth()

  let idUser: string = ''

  if (userAuth?.user?.id) {
    idUser = userAuth.user.id
  }

  const [usersRegistred, setUsersRegistred] = useState<User[]>([])

  async function fetchUsersRegistred() {
    api.get('/pr/users/registred').then((response) => {
      setUsersRegistred(response.data)
    })
  }

  useEffect(() => {
    fetchUsersRegistred()
  }, [])

  function searchFilteredUsers(
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'Registred') {
      const filteredList = usersRegistred.filter(
        (user) =>
          user.name.includes(search) ||
          user.permission.includes(search) ||
          user.username.includes(search) ||
          user.departament.includes(search),
      )

      setUsersRegistred(filteredList)
    }
  }

  async function clearSearchInputUsers(
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'Registred') {
      await fetchUsersRegistred()
    }
  }

  async function createNewUser(data: NewUser) {
    const response = await api.post('/pr/user/new', data)

    if (response.data) {
      setUsersRegistred((state) => [response.data, ...state])
    }
  }

  async function alterInfoUser(dataUser: AlterInfoUserProps) {
    const reponse = await api.put('/pr/user/alter', dataUser)

    const newUsersList = usersRegistred.filter(
      (user) => user.id !== dataUser.id,
    )

    if (reponse.data) {
      newUsersList.unshift(reponse.data)

      setUsersRegistred(newUsersList)
    }
  }

  async function alterPassword(dataUser: AlterPasswordProps) {
    await api.put('/pr/user/alterpassword', dataUser)
  }

  async function alterMyPassword(dataUser: AlterMyPasswordProps) {
    const newPassword = { id: idUser, password: dataUser.password }

    await api.put('/pr/user/alterpassword', newPassword)
  }

  return (
    <UsersContext.Provider
      value={{
        usersRegistred,
        searchFilteredUsers,
        clearSearchInputUsers,
        createNewUser,
        alterInfoUser,
        alterPassword,
        alterMyPassword,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
