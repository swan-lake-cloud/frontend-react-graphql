import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const token = localStorage.getItem('token')
    return token ? { username: 'user' } : null
  })
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
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
              <LoginForm onLoginSuccess={setUser} />
            </div>
          </div>
        }
      />
			<Route
			  path="/register"
			  element={
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
			        <h1 style={{marginTop: 0, marginBottom: 12, fontSize: 24}}>✨ Créer un compte</h1>
			        <p style={{marginTop: 0, marginBottom: 24, color: '#94a3b8'}}>Rejoignez-nous en créant votre compte.</p>
			        <Register />
			      </div>
			    </div>
			  }
			/>
      <Route
        path="/home"
        element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}