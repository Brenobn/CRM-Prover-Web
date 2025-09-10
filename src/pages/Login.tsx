import { useAuth } from "../hooks/auth"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  function handleLogin() {
    signIn()
    navigate('/')
  }

  return(
    <div className="flex items-center justify-center h-screen bg-gray-75 dark:bg-gray-300">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-150 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
        </div>
        <Button onClick={handleLogin} className="w-full">
          Entrar
        </Button>
      </div>
    </div>
  )
}