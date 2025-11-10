import type { Route, ComparisonRow, BankingKPIs, Pool, PoolMember } from '../domain/types'

export interface RoutesPort {
  getRoutes(filters?: { vesselType?: string; fuelType?: string; year?: number }): Promise<Route[]>
  setBaseline(routeId: string): Promise<void>
  getComparison(): Promise<ComparisonRow[]>
}

export interface BankingPort {
  getCb(year: number): Promise<{ cb: number }>
  bank(amount: number): Promise<BankingKPIs>
  apply(amount: number): Promise<BankingKPIs>
}

export interface PoolingPort {
  getAdjustedCb(year: number): Promise<PoolMember[]>
  createPool(members: PoolMember[]): Promise<Pool>
}
