import React, { useState } from 'react'
import './studio.css'

// simple client-side sanitizer to escape special chars
function sanitize(str){
  return String(str).replace(/[&<>"']/g, (s)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))
}

export default function SignupForm({onSignup}){
  const [form,setForm] = useState({name:'',email:'',phone:''})
  const [errors,setErrors] = useState({})

  function validate(){
    const e = {}
    if(!form.name.trim()) e.name = 'Nombre requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if(!form.phone.trim()) e.phone = 'Teléfono requerido'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleChange(e){
    const {name,value} = e.target
    setForm(f=>({ ...f, [name]: value }))
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!validate()) return
    const user = { name: sanitize(form.name), email: sanitize(form.email), phone: sanitize(form.phone), created: Date.now() }
    onSignup && onSignup(user)
    setForm({name:'',email:'',phone:''})
  }

  return (
    <section className="studio-panel" aria-labelledby="signup-title">
      <h3 id="signup-title" className="gold">Inscripción</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <button className="btn" type="submit">Registrarse</button>
      </form>
    </section>
  )
}
