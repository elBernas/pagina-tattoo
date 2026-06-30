import React, { useState, useEffect } from 'react'
import './App.css'
import './component/studio.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './component/Nav'
import Admin from './component/Admin'
import Home from './component/Home'
import { Navigate } from 'react-router-dom'

function App() {
  const [contrast, setContrast] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [users, setUsers] = useState([])
  const USERS_KEY = 'tattoo_users'

  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (err) {
      return []
    }
  })
  const [messages, setMessages] = useState([])
  const [logged, setLogged] = useState(null)

  const ADMIN_EMAIL = 'admin@admin.com'

  useEffect(() => {
    let mounted = true
    async function ensureAdmin() {
      const exists = (users || []).find(u => u.email === ADMIN_EMAIL)
      if (exists) return
      try {
        const pw = 'admin'
        const enc = new TextEncoder()
        const data = enc.encode(pw)
        const hashBuffer = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        const admin = { name: 'admin', email: ADMIN_EMAIL, phone: '', passwordHash, created: Date.now() }
        if (!mounted) return
        setUsers(u => [admin, ...u])
      } catch (err) {
        // ignore
      }
    }
    ensureAdmin()
    return () => { mounted = false }
  }, [])

  // persist users to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users || []))
    } catch (err) {
      // ignore
    }
  }, [users])

  function onToggleContrast(){ setContrast(c=>!c) }
  function increase(){ setFontSize(s=>Math.min(24,s+1)) }
  function decrease(){ setFontSize(s=>Math.max(12,s-1)) }
  function reset(){ setFontSize(16); setContrast(false) }

  function handleSignup(user){ setUsers(u => [ ...u, user ]) }
  function handleLogin(user){ setLogged(user) }
  function handleMessage(msg){ setMessages(m => [ ...m, msg ]) }
  function handleLogout(){ setLogged(null) }

  return (
    <div className={`app ${contrast ? 'high-contrast' : ''} root-font`} style={{ '--root-font-size': `${fontSize}px` }}>
      <Nav users={users} logged={logged} onLogout={handleLogout} adminEmail={ADMIN_EMAIL} />
      <main>
        <Routes>
          <Route path="/" element={<Home contrast={contrast} fontSize={fontSize} onToggleContrast={onToggleContrast} onIncrease={increase} onDecrease={decrease} onReset={reset} users={users} onSignup={handleSignup} onLogin={handleLogin} onMessage={handleMessage} logged={logged} />} />
          <Route path="/admin" element={logged && logged.email === ADMIN_EMAIL ? <Admin /> : <Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
