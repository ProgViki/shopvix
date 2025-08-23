import React from 'react'

const ListItem: React.FC<{ item: number; onSelect: (n: number) => void }> = React.memo(({ item, onSelect }) => {
  return <button onClick={() => onSelect(item)}>{item}</button>
})

export default function CallbackDemo() {
  const [selected, setSelected] = React.useState<number | null>(null)
  const [multiplier, setMultiplier] = React.useState(2)
  const items = React.useMemo(() => Array.from({ length: 6 }, (_, i) => i + 1), [])

  const handleSelect = React.useCallback((n: number) => {
    setSelected(n)
  }, [])

  const computed = React.useMemo(() => (selected ?? 0) * multiplier, [selected, multiplier])

  return (
    <div className="card">
      <h3>useCallback + React.memo + useMemo</h3>
      <div className="row">
        {items.map(n => <ListItem key={n} item={n} onSelect={handleSelect} />)}
      </div>
      <div className="row">
        <label>Multiplier:</label>
        <input type="number" value={multiplier} onChange={e => setMultiplier(Number(e.target.value) || 0)} />
        <span>Selected: <b>{selected ?? 'None'}</b></span>
        <span>Result: <b>{computed}</b></span>
      </div>
      <p className="small">Memoize handlers to avoid unnecessary child re-renders.</p>
    </div>
  )
}
