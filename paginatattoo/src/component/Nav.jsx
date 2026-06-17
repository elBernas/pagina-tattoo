import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'

export default function Nav({ users = [], logged = null, onLogout }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  function toggle(){ setOpen(o => !o) }

  useEffect(()=>{
    function onDoc(e){ if(panelRef.current && !panelRef.current.contains(e.target)) setOpen(false) }
    if(open) document.addEventListener('mousedown', onDoc)
    return ()=> document.removeEventListener('mousedown', onDoc)
  },[open])

  return (
    <header className="site-header">
      <div className="container">
        <h1 className="brand">Tatuajes</h1>
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/admin">Administración</Link>
        </nav>
        <div className="nav-users" ref={panelRef}>
          <button className="nav-users-btn btn" aria-expanded={open} aria-haspopup="true" onClick={toggle}>Usuarios ({users.length})</button>
          {open && (
            <div className="nav-users-panel" role="dialog" aria-label="Usuarios inscritos">
              <div className="studio-panel" style={{margin:0}}>
                <h4 className="gold">Usuarios inscritos</h4>
                <div className="users-list">
                  {users.length===0 ? <div style={{color:'var(--muted)'}}>No hay usuarios</div> : (
                    <ul>
                      {users.map((u,idx)=>(<li key={idx} style={{color:'var(--white)'}}>{u.name} — {u.email}</li>))}
                    </ul>
                  )}
                </div>
                {logged && (
                  <div style={{marginTop:12}}>
                    <div style={{color:'var(--muted)'}}>Conectado como</div>
                    <div style={{fontWeight:700}}>{logged.name}</div>
                    <div style={{marginTop:8}}><button className="btn" onClick={()=>{ onLogout && onLogout(); setOpen(false) }}>Cerrar sesión</button></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
