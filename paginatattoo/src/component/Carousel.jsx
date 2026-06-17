import React, { useState, useEffect, useRef } from 'react'

export default function Carousel({images=[]}){
  const [index,setIndex] = useState(0)
  const [paused,setPaused] = useState(false)
  const total = images.length || 0
  const intervalRef = useRef(null)

  function prev(){ if(total>0) setIndex((i)=> (i-1+total)%total) }
  function next(){ if(total>0) setIndex((i)=> (i+1)%total) }

  useEffect(()=>{
    // clear any existing interval
    if(intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    if(!paused && total>1){
      intervalRef.current = setInterval(()=>{
        setIndex(i => (i+1) % total)
      }, 3000)
    }
    return ()=>{ if(intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null } }
  },[paused,total])

  useEffect(()=>{
    // ensure index is within bounds if images change
    if(index >= total && total>0) setIndex(0)
  },[total])

  if(total===0) return null

  return (
    <section className="studio-panel studio-carousel" aria-roledescription="carousel" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <img src={images[index]} alt={`Tatuaje ${index+1}`} />
      <div className="carousel-controls">
        <button className="btn" onClick={prev} aria-label="Anterior">Anterior</button>
        <div style={{color:'var(--muted)',alignSelf:'center'}} aria-live="polite"> {index+1} / {total} </div>
        <button className="btn" onClick={next} aria-label="Siguiente">Siguiente</button>
      </div>
    </section>
  )
}
