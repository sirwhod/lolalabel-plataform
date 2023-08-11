import { User } from 'phosphor-react'
import {
  UserContainer,
  RegistredUserContainer,
  RegistredUserContent,
} from './styles'
import { UserRegistred } from './components/UserRegistred'
import { useContext } from 'react'
import { UsersContext } from '../../../context/UsersConstext'
import { SearchForm } from '../../../components/SearchForm'
import { useAuth } from '../../../context/AuthProvider/useAuth'
import { Navigate } from 'react-router-dom'

export function RegistredUser() {
  const { usersRegistred } = useContext(UsersContext)
  const { userAuth } = useAuth()

  if (userAuth?.user?.permission !== 'Administrador') {
    return <Navigate to="/home" />
  }

  return (
    <RegistredUserContainer>
      <RegistredUserContent>
        <header>
          <h1>
            <User size={32} weight="fill" />
            Usuários cadastrados
          </h1>

          <span>Visualize todos os usuários cadastrados</span>
        </header>

        <SearchForm page="Registred" type="Users" />

        <UserContainer>
          {usersRegistred ? (
            usersRegistred.map((user) => {
              return <UserRegistred key={user.id} userData={user} />
            })
          ) : (
            <>
              <div>nada</div>
            </>
          )}
        </UserContainer>
      </RegistredUserContent>
    </RegistredUserContainer>
  )
}
