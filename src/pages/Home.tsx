import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from '../graphql/mutations'

import './Home.css'

interface HomeProps {
  user: {
    username: string
  }
  onLogout: () => void
}

type LogoutResponse = {
  logout: {
    success: boolean,
    message: string
  };
};

type LogoutVars = { token: string }

export default function Home({ user, onLogout }: HomeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
	const token = localStorage.getItem('token')
  const [logout, { loading }] = useMutation<LogoutResponse, LogoutVars>(LOGOUT_MUTATION, {
		variables: { token },
    onCompleted: (data) => {
      if (data?.logout?.success) {
        onLogout()
        navigate('/login')
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la déconnexion:', error)
      alert('Erreur lors de la déconnexion')
    }
  })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h2>MonApp</h2>
          </div>

          <button className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#team">Équipe</a></li>
            <li><a href="#settings">Paramètres</a></li>
          </ul>

          <div className="user-section">
            <div className="user-info">
              <span className="username">{user.username}</span>
              <div className="user-avatar">👤</div>
            </div>
            <button onClick={() => logout()}  className="logout-btn">
              {loading ? 'Déconnexion...' : 'Déconnexion'}
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <h1>Bienvenue, {user.username} 👋</h1>
          <p>Ravi de vous revoir sur votre tableau de bord</p>
        </section>

        <section className="cards">
          <div className="card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>Consultez vos statistiques</p>
          </div>
          <div className="card">
            <div className="card-icon">📁</div>
            <h3>Projets</h3>
            <p>Gérez vos projets</p>
          </div>
          <div className="card">
            <div className="card-icon">👥</div>
            <h3>Équipe</h3>
            <p>Collaborez avec votre équipe</p>
          </div>
          <div className="card">
            <div className="card-icon">⚙️</div>
            <h3>Paramètres</h3>
            <p>Configurez votre compte</p>
          </div>
        </section>
      </main>
    </div>
  )
}