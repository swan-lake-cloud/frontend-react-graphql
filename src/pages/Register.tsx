import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/mutations';

import './Register.css';
interface RegisterFormProps {
  onRegisterSuccess?: () => void
}

type CreateUserResponse = {
  createUser: {
    id: string;
    username: string;
    email: string;
  };
};

type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  passwordHash: string;
}

export default function Register({ onRegisterSuccess }: RegisterFormProps) {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const [createUser, { loading, error }] = useMutation<CreateUserResponse, { input: UserInput }>(CREATE_USER_MUTATION, {
    onCompleted: (data) => {
      setMessage('✅ Compte créé avec succès !')
      if (onRegisterSuccess) {
        onRegisterSuccess()
      }
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    await createUser({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          username,
          passwordHash: password
        }
      }
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Prénom</span>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          required
          placeholder="John"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Nom</span>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          required
          placeholder="Doe"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="vous@exemple.com"
          autoComplete="off"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 8 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Nom d'utilisateur</span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={(e) => e.target.removeAttribute('readonly')}
          type="text"
          required
          placeholder="johndoe"
          autoComplete="new-user"
          readOnly
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>Mot de passe</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => e.target.removeAttribute('readonly')}
          type="password"
          required
          placeholder="••••••••••••••••"
          autoComplete="new-password"
          readOnly
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#2563eb', color: 'white', cursor: 'pointer' }}
      >
        {loading ? 'Inscription…' : "S'inscrire"}
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
        Déjà un compte ? <Link to="/login" style={{ color: '#2563eb' }}>Se connecter</Link>
      </div>
    </form>
  )
}