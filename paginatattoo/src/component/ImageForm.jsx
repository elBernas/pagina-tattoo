import { useState } from 'react'

export default function ImageForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [url, setUrl] = useState(initial?.url || '')
  const [preview, setPreview] = useState(initial?.url || '')

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setUrl(reader.result)
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function submit(e) {
    e.preventDefault()
    if (!url) return alert('La imagen es requerida')
    onSubmit({ title, url })
  }

  return (
    <form className="image-form" onSubmit={submit}>
      <div>
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Buscar imagen local</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div>
        <label>URL de la imagen (opcional)</label>
        <input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            setPreview(e.target.value)
          }}
        />
      </div>
      {preview && (
        <div className="image-preview">
          <p>Vista previa:</p>
          <img src={preview} alt="Vista previa" />
        </div>
      )}
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
