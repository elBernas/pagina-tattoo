import React, { useEffect } from 'react'
import './studio.css'

export default function Modal({open,onClose,title,children}){
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose && onClose() }
    if(open){ document.body.style.overflow='hidden'; window.addEventListener('keydown',onKey) }
    return ()=>{ document.body.style.overflow=''; window.removeEventListener('keydown',onKey) }
  },[open,onClose])

  if(!open) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={(e)=>{ if(e.target.classList.contains('modal-overlay')) onClose && onClose() }}>
      <div className="modal-content">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <h3 className="gold" style={{margin:0}}>{title}</h3>
          <button className="btn" onClick={onClose} aria-label="Cerrar">Cerrar</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
