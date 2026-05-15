import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-[240px] min-h-screen bg-[#0d0d0d]">
        <Outlet />
      </main>
    </div>
  )
}
