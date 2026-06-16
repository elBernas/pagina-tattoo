import React from 'react'
import './studio.css'

export default function Banner(){
  return (
    <section className="studio-banner" aria-label="Banner de bienvenida">
      <img src="/src/assets/images/logo.jpeg" alt="Logo Umbral Tattoo Studio" />
      <div className="banner-text">
        <h2>Umbral Tattoo Studio</h2>
        <p>Arte corporal con estilo y profesionalismo</p>
      </div>
    </section>
  )
}
