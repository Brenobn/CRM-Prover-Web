import { useAuth } from "../hooks/auth"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

import { useTheme } from "../hooks/theme"
import { PiSun, PiMoon } from "react-icons/pi"

import { ShieldCheck } from "lucide-react"
import { FaGoogle, FaGithub } from 'react-icons/fa'

export function SiginUp() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const { theme, toggleTheme } = useTheme()

  function handleLogin() {
    signIn()
    navigate('/')
  }

  return(
    <div className="relative flex min-h-screen items-center justify-center bg-gray-75 dark:bg-gray-150 transition-colors duration-300 p-4">

      <Button
        variant='ghost'
        onClick={toggleTheme}
        className="absolute top-6 h-12 w-12 right-6 rounded-full p-0 flex items-center justify-center"
      >
        {theme === 'light' ? (
          <PiMoon className="size-6" />
        ) : (
          <PiSun className="dark:text-white transition-colors duration-300 size-6 " />
        )}
      </Button>
      <div className="w-full max-w-md space-y-8 transition-colors duration-300">

        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="h-10 w-10 text-gray-150 dark:text-gray-75" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-blue-400 dark:text-white">
            Crie sua conta
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Bem-vindo ao CRM PRO.
          </p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">Nome completo</label>
              <Input id="name" type="text" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">Senha</label>
              <Input id="password" type="password" placeholder="Sua senha" />
            </div>

            <Button onClick={handleLogin} className="w-full bg-blue-400 hover:bg-blue-500 transition-colors duration-300">
             Continuar
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou cadastre-se com
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full transition-colors duration-300">
              <FaGoogle className="mr-2 h-4 w-4"/>
              Cadastrar com Google
            </Button>
            <Button variant="outline" className="w-full transition-colors duration-300">
              <FaGithub className="mr-2 h-4 w-4"/>
              Cadastrar com GitHub
            </Button>

          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <a href="/siginin" className="font-semibold text-primary underline-offset-4 hover:underline">
            Fazer login
          </a>
        </p>

      </div>
    </div>
  )
}