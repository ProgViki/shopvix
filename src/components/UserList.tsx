import React from 'react'

type User = { id: number; name: string; email: string }

export default function UserList() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => {
        if (!r.ok) throw new Error('Network error')
        return r.json()
      })
      .then((data: User[]) => { if(!cancelled) setUsers(data) })
      .catch(err => { if(!cancelled) setError(err.message) })
      .finally(() => { if(!cancelled) setLoading(false) })
    return () => { cancelled = true } // cleanup to avoid setting state on unmounted
  }, [])

  if (loading) return <div className="card"><h3>useEffect — Users</h3><p>Loading...</p></div>
  if (error) return <div className="card"><h3>useEffect — Users</h3><p>Error: {error}</p></div>

  return (
    <div className="card">
      <h3>useEffect — Users</h3>
      <ul>
        {users.slice(0,5).map(u => (
          <li key={u.id}>
            <b>{u.name}</b> — <span className="small">{u.email}</span>
          </li>
        ))}
      </ul>
      <p className="small">Fetch with cleanup to avoid setting state after unmount.</p>
    </div>
  )
}
