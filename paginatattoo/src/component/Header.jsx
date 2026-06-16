import React, { useState, useEffect } from 'react'
import './studio.css'
import AccessibilityPanel from './AccessibilityPanel'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import ContactForm from './ContactForm'

export default function Header({onSignup,onLogin,onMessage,users=[]}){
  const [open,setOpen] = useState(false)
  const [contrast,setContrast] = useState(false)
  const [fontSize,setFontSize] = useState(16)
  const [formsOpen,setFormsOpen] = useState(false)
  const [activeForm,setActiveForm] = useState('signup')

  useEffect(()=>{
    // apply contrast
    if(contrast) document.documentElement.classList.add('high-contrast')
    else document.documentElement.classList.remove('high-contrast')
    // apply font size via CSS variable on root
    document.documentElement.style.setProperty('--root-font-size', `${fontSize}px`)
    // apply body class to use the variable
    if(!document.body.classList.contains('root-font')) document.body.classList.add('root-font')
  },[contrast,fontSize])

  function toggleOpen(){ setOpen(o=>!o) }
  function onToggleContrast(){ setContrast(c=>!c) }
  function increase(){ setFontSize(s=>Math.min(24,s+1)) }
  function decrease(){ setFontSize(s=>Math.max(12,s-1)) }
  function reset(){ setFontSize(16); setContrast(false) }

  function openForms(which){ setActiveForm(which); setFormsOpen(true) }
  function closeForms(){ setFormsOpen(false) }

  return (
    <header className="studio-header" role="banner">
      <div className="brand">
        <img src="/src/assets/images/logo.jpeg" alt="Umbral logo" style={{height:48,borderRadius:6,objectFit:'cover'}}/>
        <div>
          <h1>Umbral Tattoo Studio</h1>
          <div style={{color:'var(--muted)',fontSize:12}}>Tatuajes • Arte • Tradición</div>
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
            onToggleContrast={onToggleContrast}
            fontSize={fontSize}
            onIncrease={increase}
            onDecrease={decrease}
            onReset={reset}
          />
        )}

        {formsOpen && (
          <div className="header-forms-panel" role="region" aria-label="Formularios en header">
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
          </div>
        )}
      </div>
    </header>
  )
}
