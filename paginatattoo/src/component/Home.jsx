import React, { useState } from 'react'
import Header from './Header'
import Banner from './Banner'
import Carousel from './Carousel'
import Footer from './Footer'

export default function Home({ contrast, fontSize, onToggleContrast, onIncrease, onDecrease, onReset, users = [], onSignup, onLogin, onMessage, logged = null }){
  const [modal, setModal] = useState({ which: null })

  function openModal(which){ setModal({ which }) }
  function closeModal(){ setModal({ which: null }) }

  // load all images from the images folder (Vite glob)
  const modules = import.meta.glob('/src/assets/images/*.{jpg,jpeg,png,webp,gif}', { eager: true })
  const images = Object.keys(modules).sort().map(k => modules[k].default || k)

  return (
    <div>
      <Header onSignup={onSignup} onLogin={onLogin} onMessage={onMessage} users={users} contrast={contrast} fontSize={fontSize} onToggleContrast={onToggleContrast} onIncrease={onIncrease} onDecrease={onDecrease} onReset={onReset} />
      <main className="studio-main">
        <Banner />
        <div className="studio-grid">
          <div>
            <Carousel images={images} />
            <section className="studio-panel" style={{marginTop:16}}>
              <h3 className="gold">Bienvenido a Umbral</h3>
              <p style={{color:'var(--muted)'}}>Estudio dedicado al tatuaje artístico. Navega el carrusel, inscríbete o envía un mensaje.</p>
            </section>
          </div>
          <aside>
            {/* Users panel moved to Nav */}
          </aside>
        </div>
        <Footer />
      </main>
    </div>
  )
}
