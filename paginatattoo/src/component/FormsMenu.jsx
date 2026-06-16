import React from 'react'
import './studio.css'

// Now this component only renders buttons that open modals via handlers
export default function FormsMenu({openSignup,openLogin,openContact}){
  return (
    <nav className="studio-panel" aria-label="Formularios">
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <button className="btn" onClick={openSignup}>Inscripción</button>
        <button className="btn" onClick={openLogin}>Login</button>
        <button className="btn" onClick={openContact}>Contacto</button>
      </div>
    </nav>
  )
}
