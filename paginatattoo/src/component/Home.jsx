import React, { useState } from 'react'
import Header from './Header'
import Banner from './Banner'
import Carousel from './Carousel'
import Footer from './Footer'
import './studio.css'

export default function Home(){
  const [users,setUsers] = useState([])
  const [messages,setMessages] = useState([])
  const [logged,setLogged] = useState(null)
  const [modal, setModal] = useState({ which: null })

  function handleSignup(user){
    // store user object in array state
    setUsers(u => [ ...u, user ])
  }

  function handleLogin(user){
    setLogged(user)
  }

  function handleMessage(msg){
    setMessages(m => [ ...m, msg ])
  }

  function openModal(which){ setModal({ which }) }
  function closeModal(){ setModal({ which: null }) }

  const images = [
    '/src/assets/images/tattoo1.jpeg',
    '/src/assets/images/tattoo6.jpeg',
    '/src/assets/images/tattoo9.jpeg'
  ]

  return (
    <div>
      <Header />
      <main className="studio-main">
        <Header onSignup={handleSignup} onLogin={handleLogin} onMessage={handleMessage} users={users} />
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
            <div className="studio-panel">
              <h4 className="gold">Usuarios inscritos</h4>
              <div className="users-list">
                {users.length===0 ? <div style={{color:'var(--muted)'}}>No hay usuarios</div> : (
                  <ul>
                    {users.map((u,idx)=>(<li key={idx} style={{color:'var(--white)'}}>{u.name} — {u.email}</li>))}
                  </ul>
                )}
              </div>
            </div>
            {logged && (
              <div className="studio-panel" style={{marginTop:12}}>
                <div style={{color:'var(--muted)'}}>Conectado como</div>
                <div style={{fontWeight:700}}>{logged.name}</div>
              </div>
            )}
          </aside>
        </div>
        <Footer />
      </main>
    </div>
  )
}
