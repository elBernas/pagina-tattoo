import React from 'react'

export default function AccessibilityPanel({contrast, onToggleContrast, fontSize, onIncrease, onDecrease, onReset}){
  return (
    <div className="access-panel" role="region" aria-label="Accesibilidad">
      <label>
        <input type="checkbox" checked={contrast} onChange={onToggleContrast} /> Alternar alto contraste
      </label>
      <div style={{marginTop:8,color:'var(--muted)',fontSize:13}}>Tamaño de fuente</div>
      <div className="access-controls">
        <button className="btn" onClick={onDecrease} aria-label="Reducir fuente">A-</button>
        <div style={{alignSelf:'center'}}>{fontSize}px</div>
        <button className="btn" onClick={onIncrease} aria-label="Aumentar fuente">A+</button>
        <button className="btn" onClick={onReset} aria-label="Restablecer fuente">Reset</button>
      </div>
    </div>
  )
}
