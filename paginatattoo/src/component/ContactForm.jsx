import React, { useState } from 'react'
import './studio.css'

function sanitize(str){
  return String(str).replace(/[&<>"']/g, (s)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))
}

export default function ContactForm({onMessage}){
  const [form,setForm] = useState({name:'',email:'',message:''})
  const [errors,setErrors] = useState({})

  function handleChange(e){
    const {name,value} = e.target
    setForm(f=>({ ...f, [name]: value }))
  }

  function validate(){
    const e={}
    if(!form.name.trim()) e.name='Nombre requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if(!form.message.trim()) e.message='Mensaje requerido'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!validate()) return
    const payload = { name: sanitize(form.name), email: sanitize(form.email), message: sanitize(form.message), date: Date.now() }
    onMessage && onMessage(payload)
    setForm({name:'',email:'',message:''})
  }

  return (
    <section className="studio-panel" aria-labelledby="contact-title">
      <h3 id="contact-title" className="gold">Contacto</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="contact-name">Nombre</label>
          <input id="contact-name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Mensaje</label>
          <textarea id="contact-message" name="message" rows={4} value={form.message} onChange={handleChange} />
          {errors.message && <div className="error">{errors.message}</div>}
        </div>
        <button className="btn" type="submit">Enviar</button>
      </form>
    </section>
  )
}
