import { UserDTO } from '@dtos/UserDTO'
import { ReactNode, createContext } from 'react'

export type AuthContextDataProps = {
  user: UserDTO
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Bruna',
          email: 'brunaporato@email.com',
          avatar: 'bruna.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
