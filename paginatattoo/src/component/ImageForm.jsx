import { useState } from 'react'

export default function ImageForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [url, setUrl] = useState(initial?.url || '')

  function submit(e) {
    e.preventDefault()
    if (!url) return alert('La URL es requerida')
    onSubmit({ title, url })
  }

  return (
    <form className="image-form" onSubmit={submit}>
      <div>
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>URL de la imagen</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
