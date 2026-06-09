import { useEffect, useState } from 'react'
import imagesService from './imagesService'
import ImageForm from './ImageForm'
import ImageCard from './ImageCard'

export default function Admin() {
  const [images, setImages] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => setImages(imagesService.getImages()), [])

  function refresh() {
    setImages(imagesService.getImages())
  }

  function handleAdd(data) {
    imagesService.addImage(data)
    refresh()
    setShowForm(false)
  }

  function handleUpdate(id, data) {
    imagesService.updateImage(id, data)
    refresh()
    setEditing(null)
    setShowForm(false)
  }

  function handleDelete(id) {
    if (confirm('¿Eliminar imagen?')) {
      imagesService.deleteImage(id)
      refresh()
    }
  }

  return (
    <section className="admin">
      <div className="admin-actions">
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
        >
          Añadir imagen
        </button>
      </div>

      {showForm && (
        <ImageForm
          initial={editing}
          onSubmit={(data) => (editing ? handleUpdate(editing.id, data) : handleAdd(data))}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
        />
      )}

      <div className="admin-grid">
        {images.map((img) => (
          <ImageCard key={img.id} image={img} onEdit={(i) => { setEditing(i); setShowForm(true) }} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  )
}
