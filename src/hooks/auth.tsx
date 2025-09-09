import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function signIn() {
    const fakeUser = { name: 'Usuário Prover', email: 'user@prover.com' }
    setUser(fakeUser)
  }

  function signOut() {
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  return context
}