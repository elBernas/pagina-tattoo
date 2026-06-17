import React, { useState } from 'react'

// simple client-side sanitizer to escape special chars (for fields that may be rendered)
function sanitize(str){
  return String(str).replace(/[&<>"']/g, (s)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))
}

async function hashPassword(pw){
  if(!pw) return ''
  const enc = new TextEncoder()
  const data = enc.encode(pw)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b=>b.toString(16).padStart(2,'0')).join('')
}

export default function SignupForm({onSignup}){
  const [form,setForm] = useState({name:'',email:'',phone:'',password:'',confirmPassword:''})
  const [errors,setErrors] = useState({})

  function validate(){
    const e = {}
    if(!form.name.trim()) e.name = 'Nombre requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if(!form.phone.trim()) e.phone = 'Teléfono requerido'
    // password: at least 7 chars, one uppercase, one number, no spaces
    if(!form.password) e.password = 'Contraseña requerida'
    else if(!/^(?=.*[A-Z])(?=.*\d)[^\s]{7,}$/.test(form.password)) e.password = 'La contraseña debe tener al menos 7 caracteres, incluir una mayúscula y un número, y no contener espacios.'
    if(form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleChange(e){
    const {name,value} = e.target
    setForm(f=>({ ...f, [name]: value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!validate()) return
    // hash password before sending to parent
    const passwordHash = await hashPassword(form.password)
    const user = { name: sanitize(form.name), email: sanitize(form.email), phone: sanitize(form.phone), passwordHash, created: Date.now() }
    onSignup && onSignup(user)
    setForm({name:'',email:'',phone:'',password:'',confirmPassword:''})
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
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Repetir contraseña</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        <button className="btn" type="submit">Registrarse</button>
      </form>
    </section>
  )
}
