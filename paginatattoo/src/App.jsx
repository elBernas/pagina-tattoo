import React, { useState } from 'react'
import './App.css'
import './component/studio.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './component/Nav'
import Admin from './component/Admin'
import Home from './component/Home'

function App() {
  const [contrast, setContrast] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [logged, setLogged] = useState(null)

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
      <Nav users={users} logged={logged} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home contrast={contrast} fontSize={fontSize} onToggleContrast={onToggleContrast} onIncrease={increase} onDecrease={decrease} onReset={reset} users={users} onSignup={handleSignup} onLogin={handleLogin} onMessage={handleMessage} logged={logged} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
