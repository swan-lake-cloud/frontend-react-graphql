
import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

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

export default function LoginForm() {
  const [identifier, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState<string | null>(null)

  const [login, { loading, error }] = useMutation<LoginResponse, LoginVars>(LOGIN, {
		variables: { identifier, password },
		onCompleted: (data) => {
		  const token = data?.login?.token
		  if (token) {
		    localStorage.setItem('token', token)
		    setMessage('✅ Connecté ! Le token a été enregistré dans localStorage.')
		  } else {
		    setMessage("ℹ️ Login effectué mais aucun token n'a été renvoyé.")
		  }
		},
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    await login({ variables: { identifier, password } })
  }

  return (
    <form onSubmit={onSubmit}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Username or Email</span>
        <input
          value={identifier}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="vous@exemple.com"
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
        Astuce: modifiez la mutation dans <code>src/graphql/mutations.ts</code> si votre schéma diffère.
      </div>
    </form>
  )
}
