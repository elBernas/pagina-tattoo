import { Link } from 'react-router-dom'
import './nav.css'

export default function Nav() {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="brand">Tatuajes</h1>
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/admin">Administración</Link>
        </nav>
      </div>
    </header>
  )
}
