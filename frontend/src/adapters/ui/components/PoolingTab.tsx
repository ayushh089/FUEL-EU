import { useEffect, useState } from 'react'
import apiClient from '../../infrastructure/apiClient'
import type { PoolMember } from '../../../core/domain/types'

export default function PoolingTab(){
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [members, setMembers] = useState<PoolMember[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [createdPool, setCreatedPool] = useState<any | null>(null)

  async function load(){
    setLoading(true); setError(null)
    try{
      const data = await apiClient.getAdjustedCb(year)
      setMembers(data)
      const map: Record<string, boolean> = {}
      data.forEach(m=> map[m.shipId] = true)
      setSelected(map)
    }catch(err: unknown){ setError(err instanceof Error ? err.message : String(err)) }
    finally{ setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{ load() }, [year])

  const selectedMembers = members.filter(m=> selected[m.shipId])
  const sum = selectedMembers.reduce((s, m)=> s + m.adjustedCB_before, 0)

  const canCreate = sum >= 0 && selectedMembers.length > 0

  async function create(){
    if (!canCreate) return
    try{
      const result = await apiClient.createPool(selectedMembers)
      setCreatedPool(result)
      // server should return adjusted afters; otherwise refetch
      await load()
    }catch(err: unknown){ setError(err instanceof Error ? err.message : String(err)) }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Pooling (Article 21)</h2>
      <div className="mb-3"><label>Year: <input className="border p-1 ml-2" value={year} onChange={e=>setYear(Number(e.target.value))} aria-label="pool-year" /></label></div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="mb-3">Pool Sum: <strong className={sum>=0 ? 'text-green-600' : 'text-red-600'}>{sum.toFixed(2)}</strong></div>

      <div className="overflow-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2">sel</th>
            <th className="border px-2">shipId</th>
            <th className="border px-2">adjustedCB_before</th>
            <th className="border px-2">adjustedCB_after</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m=> (
            <tr key={m.shipId}>
              <td className="border px-2"><input aria-label={`select-${m.shipId}`} type="checkbox" checked={!!selected[m.shipId]} onChange={e=>setSelected(s=>({...s,[m.shipId]: e.target.checked}))} /></td>
              <td className="border px-2">{m.shipId}</td>
              <td className="border px-2">{m.adjustedCB_before}</td>
              <td className="border px-2">{m.adjustedCB_after ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="mt-4">
        <button className="bg-blue-600 text-white px-3" onClick={create} disabled={!canCreate}>Create Pool</button>
        {!canCreate && <div className="text-sm text-red-600 mt-2">Pool invalid: sum must be ≥ 0 and members selected.</div>}
      </div>

      {createdPool && (
        <div className="mt-4 border p-3">
          <div>Pool created: {JSON.stringify(createdPool)}</div>
        </div>
      )}
    </div>
  )
}
