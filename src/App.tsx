
import React from 'react'
import LoginForm from './components/LoginForm'

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'
    }}>
      <div style={{width: 380, background: '#111827', padding: 24, borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>
        <h1 style={{marginTop: 0, marginBottom: 12, fontSize: 24}}>🔐 Login GraphQL</h1>
        <p style={{marginTop: 0, marginBottom: 24, color: '#94a3b8'}}>Entrez vos identifiants pour récupérer un token.</p>
        <LoginForm />
      </div>
    </div>
  )
}
