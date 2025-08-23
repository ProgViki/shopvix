import React from 'react'

type Todo = { id: string; title: string; done: boolean }
type Action =
  | { type: 'add'; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear' }

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add': return [{ id: crypto.randomUUID(), title: action.title, done: false }, ...state]
    case 'toggle': return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
    case 'remove': return state.filter(t => t.id !== action.id)
    case 'clear': return []
    default: return state
  }
}

export default function Todos() {
  const [todos, dispatch] = React.useReducer(reducer, [] as Todo[])
  const [text, setText] = React.useState('')

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) dispatch({ type: 'add', title: text.trim() })
    setText('')
  }

  const remaining = React.useMemo(() => todos.filter(t => !t.done).length, [todos])

  return (
    <div className="card">
      <h3>useReducer + useMemo — Todos <span className="badge">{remaining} remaining</span></h3>
      <form onSubmit={add} className="row">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add todo..." />
        <button className="primary">Add</button>
        <button type="button" onClick={() => dispatch({ type: 'clear' })}>Clear</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: 'toggle', id: t.id })} />{' '}
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
            </label>
            {' '}<button onClick={() => dispatch({ type: 'remove', id: t.id })}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
