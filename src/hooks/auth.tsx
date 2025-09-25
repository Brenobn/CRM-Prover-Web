import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface SignInResponse {
  accessToken: string
  userToken: {
    id: string
    email: string
    claims: { type: string; value: string }[]
  }
}

interface AuthContextData {
  user: User | null
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('@ProverCRM:token')
    const storedUser = localStorage.getItem('@ProverCRM:user')

    if(token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(JSON.parse(storedUser))
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try{
      const response = await axios.post<SignInResponse>(
        'https://proverhmgapiidentidade.azurewebsites.net/api/auth/login',
        { email, password }
      )

      const { accessToken, userToken } = response.data

      const userData = {
        id: userToken.id,
        email: userToken.email,
        name: userToken.claims.find((claim: { type: string }) => claim.type === 'nome')?.value || 'Usuário'
      }

      localStorage.setItem('@ProverCRM:token', accessToken)
      localStorage.setItem('@ProverCRM:user', JSON.stringify(userData))

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      setUser(userData)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(error) {
      toast.error('Email ou senha incorretos.')
      throw new Error('Falha no login')
    }
  }

  function signOut() {
    localStorage.removeItem('@ProverCRM:token')
    localStorage.removeItem('@ProverCRM:user')
    axios.defaults.headers.common['Authorization'] = null
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