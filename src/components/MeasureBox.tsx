import React from 'react'

export default function MeasureBox() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = React.useState<{w:number; h:number}>({ w: 0, h: 0 })

  React.useLayoutEffect(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect()
      setRect({ w: Math.round(r.width), h: Math.round(r.height) })
    }
  })

  return (
    <div className="card">
      <h3>useLayoutEffect — Measure</h3>
      <div ref={ref} style={{ width: 200, padding: 12, border: '1px solid #2a2a33', borderRadius: 12 }}>
        Resize the window and notice measured size updates before paint. <span className="badge">{rect.w}×{rect.h}</span>
      </div>
      <p className="small">Measure DOM synchronously.</p>
    </div>
  )
}
