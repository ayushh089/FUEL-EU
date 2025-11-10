import { useState } from 'react'
import RoutesTab from './adapters/ui/components/RoutesTab'
import CompareTab from './adapters/ui/components/CompareTab'
import BankingTab from './adapters/ui/components/BankingTab'
import PoolingTab from './adapters/ui/components/PoolingTab'

const TABS = ['Routes','Compare','Banking','Pooling'] as const

function App(){
  const [tab, setTab] = useState<typeof TABS[number]>('Routes')
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Fuel EU Compliance Dashboard</h1>
        </header>

        <nav className="flex gap-2 mb-4">
          {TABS.map(t=> (
            <button key={t} className={`px-3 py-1 ${t===tab ? 'bg-blue-600 text-white' : 'bg-white border'}`} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </nav>

        <main className="bg-white shadow rounded">
          {tab === 'Routes' && <RoutesTab />}
          {tab === 'Compare' && <CompareTab />}
          {tab === 'Banking' && <BankingTab />}
          {tab === 'Pooling' && <PoolingTab />}
        </main>
      </div>
    </div>
  )
}

export default App
