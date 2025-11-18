
import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../graphql/mutations'

interface LoginFormProps {
  onLoginSuccess: (user: { username: string }) => void
}

type LoginResponse = {
  login: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
};

type LoginVars = { identifier: string; password: string }

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
	const navigate = useNavigate()
  const [identifier, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const [login, { loading, error }] = useMutation<LoginResponse, LoginVars>(LOGIN_MUTATION, {
		variables: { identifier, password },
		onCompleted: (data) => {
		  const token = data?.login?.token
		  const username = data?.login?.user?.username
		  if (token) {
		    localStorage.setItem('token', token)
		    setMessage('✅ Vous êtes connecté')
        onLoginSuccess({ username })
        // ✅ Délai de 1.5s avant redirection
        setTimeout(() => {
          navigate('/home')
        }, 700)
		  } else {
		    setMessage("ℹ️ Login effectué mais aucun token n'a été renvoyé.")
		  }
		},
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    await login({ variables: { identifier, password } })
  }

  return (
    <form onSubmit={onSubmit}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Nom d'utilisateur ou email</span>
        <input
          value={identifier}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          required
          placeholder="Votre nom d'utilisateur ou email"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Mot de passe</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="••••••••"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#2563eb', color: 'white', cursor: 'pointer' }}
      >
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>

      {error && (
        <p style={{ color: '#fda4af', marginTop: 12 }}>
          ❌ Erreur: {error.message}
        </p>
      )}
      {message && (
        <p style={{ color: '#86efac', marginTop: 12 }}>
          {message}
        </p>
      )}

      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>
        Pas encore de compte ? <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>Créer un nouveau compte</Link>
			</div>
    </form>
  )
}
