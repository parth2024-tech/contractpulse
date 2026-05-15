import { NavLink, useNavigate } from 'react-router-dom'
import { Home, FileText, Bell, Settings, LogOut, Activity } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/contracts', label: 'Contracts', icon: FileText },
  { path: '/alerts', label: 'Alerts', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-sidebar border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <Activity size={20} className="text-accent pulse-icon" />
        <span className="text-white font-semibold text-base tracking-tight">ContractPulse</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-button text-sm btn-transition ${
                    isActive
                      ? 'bg-white/5 text-white border-l-2 border-accent pl-[10px]'
                      : 'text-text-secondary hover:text-white hover:bg-white/[0.03]'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">john@startup.io</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2 mt-3 text-text-secondary hover:text-danger text-xs btn-transition"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
