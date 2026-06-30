import React, { useState, useEffect } from 'react'

export default function LocationSearch() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    async function fetchAddress() {
      try {
        const q = 'Umbral Tattoo Studio, Santiago, Chile'
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
          { headers: { Accept: 'application/json' } }
        )
        if (!res.ok) throw new Error('API response not OK')
        const data = await res.json()
        if (!mounted) return
        if (data && data.length > 0) {
          setAddress(data[0].display_name)
        } else {
          setError(true)
        }
      } catch (err) {
        if (!mounted) return
        setError(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchAddress()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="studio-panel" aria-label="Dirección del estudio">
      {loading ? (
        <div>Cargando dirección...</div>
      ) : error ? (
        <div>
          <div className="error">No se pudo cargar la dirección desde la API.</div>
          <a
            href="https://www.google.com/maps/place/Umbral+Tattoo+Studio/@-33.535778,-70.6662325,17z/data=!3m1!4b1!4m6!3m5!1s0x9662da55dd9e7e8b:0xa6e446bea01ae2bb!8m2!3d-33.5357825!4d-70.6636576!16s%2Fg%2F11bx8b0frj?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{ marginTop: 8, display: 'inline-block' }}
          >
            Ver en Google Maps
          </a>
        </div>
      ) : (
        <div>{address}</div>
      )}
    </section>
  )
}
