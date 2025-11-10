import type { RoutesPort, BankingPort, PoolingPort } from '../../core/ports/outbound'
import type { Route, ComparisonRow, BankingKPIs, PoolMember, Pool } from '../../core/domain/types'

const base = '' // assume same origin; adjust if needed

async function handleResp(res: Response) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) return res.json()
  return null
}

export const apiClient: RoutesPort & BankingPort & PoolingPort = {
  async getRoutes(filters) {
    const params = new URLSearchParams()
    if (filters?.vesselType) params.set('vesselType', filters.vesselType)
    if (filters?.fuelType) params.set('fuelType', filters.fuelType)
    if (filters?.year) params.set('year', String(filters.year))
    const url = `${base}/routes${params.toString() ? `?${params.toString()}` : ''}`
    const res = await fetch(url)
    const data = await handleResp(res)
    return (data as Route[] | null) ?? []
  },

  async setBaseline(routeId) {
    const res = await fetch(`${base}/routes/${encodeURIComponent(routeId)}/baseline`, {
      method: 'POST'
    })
    await handleResp(res)
  },

  async getComparison() {
    const res = await fetch(`${base}/routes/comparison`)
    const data = await handleResp(res)
    return (data as ComparisonRow[] | null) ?? []
  },

  async getCb(year) {
    const res = await fetch(`${base}/compliance/cb?year=${encodeURIComponent(String(year))}`)
    return (await handleResp(res)) as { cb: number }
  },

  async bank(amount) {
    const res = await fetch(`${base}/banking/bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    })
    return (await handleResp(res)) as BankingKPIs
  },

  async apply(amount) {
    const res = await fetch(`${base}/banking/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    })
    return (await handleResp(res)) as BankingKPIs
  },

  async getAdjustedCb(year) {
    const res = await fetch(`${base}/compliance/adjusted-cb?year=${encodeURIComponent(String(year))}`)
    const data = await handleResp(res)
    return (data as PoolMember[] | null) ?? []
  },

  async createPool(members: PoolMember[]) {
    const res = await fetch(`${base}/pools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ members })
    })
    return (await handleResp(res)) as Pool
  }
}

export default apiClient
