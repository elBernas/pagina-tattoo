import React, { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import AccessibilityPanel from './AccessibilityPanel'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import ContactForm from './ContactForm'

export default function Header({onSignup,onLogin,onMessage,users=[], contrast=false, fontSize=16, onToggleContrast, onIncrease, onDecrease, onReset}){
  const [open,setOpen] = useState(false)
  const [formsOpen,setFormsOpen] = useState(false)
  const [activeForm,setActiveForm] = useState('signup')
  const inactivityTimer = useRef(null)
  const interacted = useRef(false)

  function toggleOpen(){ setOpen(o=>!o) }
  function handleToggleContrast(){ onToggleContrast && onToggleContrast() }
  function increase(){ onIncrease && onIncrease() }
  function decrease(){ onDecrease && onDecrease() }
  function reset(){ onReset && onReset() }

  function openForms(which){ setActiveForm(which); setFormsOpen(true) }
  function closeForms(){ setFormsOpen(false) }

  function clearInactivity(){ if(inactivityTimer.current){ clearTimeout(inactivityTimer.current); inactivityTimer.current = null } }
  function startInactivity(){ interacted.current = false; clearInactivity(); inactivityTimer.current = setTimeout(()=>{ if(!interacted.current) closeForms() }, 10000) }
  function handleActivity(){ interacted.current = true; clearInactivity() }

  useEffect(()=>{
    if(formsOpen) startInactivity()
    return ()=> clearInactivity()
  },[formsOpen])

  return (
    <header className="studio-header" role="banner">
      <div className="brand header-brand">
        <img src="/src/assets/images/banner.jpg" alt="Banner Umbral" className="header-logo" />
        <div className="brand-text">
          <div style={{color:'var(--muted)',fontSize:22}}>Tatuajes • Arte • Tradición</div>
        </div>
      </div>
      <div style={{position:'absolute',right:16,top:12}}>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>openForms('signup')} aria-label="Abrir inscripción">Inscribirse</button>
          <button className="btn" onClick={()=>openForms('login')} aria-label="Abrir login">Login</button>
          <button className="btn" onClick={()=>openForms('contact')} aria-label="Abrir contacto">Contacto</button>
          <button className="btn" onClick={toggleOpen} aria-haspopup="true" aria-expanded={open} aria-label="Accesibilidad" title="Accesibilidad">Acces.</button>
        </div>
        {open && (
          <AccessibilityPanel
            contrast={contrast}
            onToggleContrast={handleToggleContrast}
            fontSize={fontSize}
            onIncrease={increase}
            onDecrease={decrease}
            onReset={reset}
          />
        )}

        {formsOpen && (
          <Modal open={formsOpen} onClose={closeForms} title={activeForm==='signup' ? 'Inscripción' : activeForm==='login' ? 'Login' : 'Contacto'} onActivity={handleActivity}>
            <div style={{display:'flex',gap:8,marginBottom:8}}>
              <button className="btn" onClick={()=>setActiveForm('signup')}>Inscripción</button>
              <button className="btn" onClick={()=>setActiveForm('login')}>Login</button>
              <button className="btn" onClick={()=>setActiveForm('contact')}>Contacto</button>
              <button className="btn" onClick={closeForms}>Cerrar</button>
            </div>
            <div>
              {activeForm==='signup' && <SignupForm onSignup={(u)=>{ onSignup && onSignup(u); closeForms() }} />}
              {activeForm==='login' && <LoginForm users={users} onLogin={(u)=>{ onLogin && onLogin(u); closeForms() }} />}
              {activeForm==='contact' && <ContactForm onMessage={(m)=>{ onMessage && onMessage(m); closeForms() }} />}
            </div>
          </Modal>
        )}
      </div>
    </header>
  )
}
