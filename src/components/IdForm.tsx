import React from 'react'

export default function IdForm() {
  const nameId = React.useId()
  const emailId = React.useId()

  return (
    <div className="card">
      <h3>useId — Accessible Labels</h3>
      <div className="row">
        <label htmlFor={nameId}>Name</label>
        <input id={nameId} placeholder="Jane Doe" />
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} placeholder="jane@doe.com" />
      </div>
      <p className="small">Stable, unique IDs for SSR/CSR.</p>
    </div>
  )
}
