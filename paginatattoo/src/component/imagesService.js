const KEY = 'tattoo_images'

function defaultImages() {
  return [
    { id: Date.now(), title: 'Muestra', url: '/src/assets/hero.png' },
  ]
}

export function getImages() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const defs = defaultImages()
      localStorage.setItem(KEY, JSON.stringify(defs))
      return defs
    }
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

export function saveImages(images) {
  localStorage.setItem(KEY, JSON.stringify(images))
}

export function addImage(image) {
  const images = getImages()
  const item = { id: Date.now(), ...image }
  images.unshift(item)
  saveImages(images)
  return item
}

export function updateImage(id, data) {
  const images = getImages()
  const idx = images.findIndex((i) => i.id === id)
  if (idx >= 0) {
    images[idx] = { ...images[idx], ...data }
    saveImages(images)
  }
  return images
}

export function deleteImage(id) {
  const images = getImages().filter((i) => i.id !== id)
  saveImages(images)
  return images
}

const imagesService = { getImages, saveImages, addImage, updateImage, deleteImage }
export default imagesService
