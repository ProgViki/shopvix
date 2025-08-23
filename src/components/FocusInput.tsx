import React from 'react'

export default function FocusInput() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <div className="card">
      <h3>useRef — Focus Input</h3>
      <div className="row">
        <input ref={inputRef} placeholder="Click the button or press /" />
        <button onClick={() => inputRef.current?.focus()} className="primary">Focus</button>
        <span className="badge">DOM ref</span>
      </div>
      <p className="small">Press <kbd>/</kbd> to focus (window keydown + ref).</p>
    </div>
  )
}
