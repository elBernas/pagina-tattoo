import { useEffect, useState } from 'react'
import imagesService from './imagesService'
import ImageCard from './ImageCard'

export default function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(imagesService.getImages())
  }, [])

  return (
    <section className="gallery">
      {images.length === 0 ? (
        <p>No hay imágenes.</p>
      ) : (
        <div className="grid">
          {images.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>
      )}
    </section>
  )
}
