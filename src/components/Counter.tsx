import React from 'react'

export default function Counter() {
  const [count, setCount] = React.useState(0)
  const inc = () => setCount(c => c + 1)
  const dec = () => setCount(c => c - 1)
  return (
    <div className="card">
      <h3>useState — Counter</h3>
      <div className="row">
        <button onClick={dec}>-</button>
        <span>Count: <b>{count}</b></span>
        <button className="primary" onClick={inc}>+</button>
      </div>
      <p className="small">Local state with updater function.</p>
    </div>
  )
}
