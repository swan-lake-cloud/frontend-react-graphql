import { useNavigate } from 'react-router-dom'

interface HomeProps {
  user: {
    username: string
  }
  onLogout: () => void
}

export default function Home({ user, onLogout }: HomeProps) {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Bienvenue</h1>
        <div className="user-section">
          <span className="username">{user.username}</span>
          <div className="user-icon">👤</div>
          <button onClick={onLogout} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </header>
      <main>
        <p>Vous êtes connecté en tant que {user.username}</p>
      </main>
    </div>
  )
}