export default function ImageCard({ image, onEdit, onDelete }) {
  return (
    <div className="image-card">
      <img src={image.url} alt={image.title} />
      <h3>{image.title}</h3>
      {onEdit || onDelete ? (
        <div className="card-actions">
          {onEdit && <button onClick={() => onEdit(image)}>Editar</button>}
          {onDelete && <button onClick={() => onDelete(image.id)}>Borrar</button>}
        </div>
      ) : null}
    </div>
  )
}
