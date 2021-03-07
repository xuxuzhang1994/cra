import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { http, authHttp } from '../utils/http'

interface AuthForm {
  username: string,
  password: string
}

interface User {
  username: string,
  token: string
}

const initalUser = async () => {
  let user = null
  // const token = localStorage.getItem('token')
  const data = await authHttp('user/userInfo', {})
  if(data.code == 200){
    user = data.data
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  isFetching: boolean
} | undefined>(undefined)

export const AuthProvider = ({children}:{children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isFetching, setIsFetching]= useState(true)
  useEffect(() => {
    setIsFetching(true)
    initalUser().then(user => {
      setUser(user)
      setIsFetching(false)
    })
  },[])
  
  const login = (form: AuthForm) => fetchLogin(form).then(user => {
    setUser(user)
  })

  return <AuthContext.Provider value={{user, login, isFetching}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context){
    throw new Error('userAuth必须在AuthProvider中使用')
  }
  return context
}

const fetchLogin = (data: {username: string, password: string}) => {
  return http('/login', {
    method: 'POST',
    data: data
  },).then(res => {
    if(res.code == '200'){
      return handleUserResponse(res.data)
    }else{
      return Promise.reject(res.msg)
    }
  })
}

const handleUserResponse = (user: User) => {
  localStorage.setItem('token', user.token)
  return user
}
