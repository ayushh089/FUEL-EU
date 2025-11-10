export type Route = {
    routeId: string
    vesselType: string
    fuelType: string
    year: number
    ghgIntensity: number // gCO2e/MJ
    fuelConsumption: number // t
    distance: number // km
    totalEmissions: number // t
}

export type ComparisonRow = {
    routeId: string
    baselineGhg: number
    comparisonGhg: number
}

export type BankingKPIs = {
    cb_before: number
    applied: number
    cb_after: number
}

export type PoolMember = {
    shipId: string
    adjustedCB_before: number
    adjustedCB_after?: number
}

export type Pool = {
    id?: string
    members: PoolMember[]
}
