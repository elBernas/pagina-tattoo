import React, { useState } from 'react'

export default function LoginForm({users=[],onLogin}){
  const [form,setForm] = useState({email:'',password:''})
  const [error,setError] = useState('')

  function handleChange(e){
    const {name,value} = e.target
    setForm(f=>({ ...f, [name]: value }))
  }

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    if(!form.email || !form.password){ setError('Campos requeridos'); return }
    // simple auth: check email exists
    const found = users.find(u=>u.email===form.email)
    if(!found){ setError('Usuario no encontrado'); return }
    onLogin && onLogin(found)
    setForm({email:'',password:''})
  }

  return (
    <section className="studio-panel" aria-labelledby="login-title">
      <h3 id="login-title" className="gold">Login</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" value={form.password} onChange={handleChange} />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Entrar</button>
      </form>
    </section>
  )
}
