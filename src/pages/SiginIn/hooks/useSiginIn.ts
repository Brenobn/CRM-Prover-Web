import { useState } from 'react'
import { useAuth } from '../../../hooks/auth'
import { useNavigate } from 'react-router-dom'

const useSiginIn = () => {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin() {
    if (!email || !password) {
      return alert('Por favor, preencha e-mail e senha.')
    }

    try {
      await signIn({ email, password })
      navigate('/')
    } catch {
     //TODO
    }
  }
  return {
    handleLogin,
    setPassword,
    setEmail,
  }
}

export default useSiginIn
