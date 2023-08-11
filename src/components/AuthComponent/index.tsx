import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../../context/AuthProvider/useAuth'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

export function AuthComponent() {
  const [loggedOut, setLoggedOut] = useState(false)
  const { userAuth } = useContext(AuthContext)

  useEffect(() => {
    const checkAuthentication = () => {
      if (userAuth === null) {
        setLoggedOut(true)
      }
    }

    checkAuthentication()
  }, [])

  if (loggedOut) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
