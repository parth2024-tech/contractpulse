import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { alerts as alertsData, formatDate } from '../data'

export default function Alerts() {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  const filteredAlerts = alertsData.filter(alert => {
    if (filter === 'All') return true
    return alert.status === filter
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">Alerts</h1>

      {/* Filter buttons */}
      <div className="flex items-center gap-2 mb-6">
        {['All', 'Sent', 'Scheduled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-button text-sm font-medium btn-transition ${
              filter === f
                ? 'bg-accent text-white'
                : 'bg-card border border-border text-text-secondary hover:text-white hover:border-text-disabled'
            }`}
          >
            {f === 'Scheduled' ? 'Upcoming' : f}
          </button>
        ))}
      </div>

      {/* Alert items */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className="bg-card border border-border rounded-card p-5 flex items-center justify-between hover:bg-hover-row btn-transition"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-medium text-sm">
                  {alert.vendor}
                </span>
                <span className="text-text-disabled">—</span>
                <span className="text-text-secondary text-sm">{alert.alertType}</span>
              </div>
              <div className="text-text-disabled text-xs">
                {alert.status === 'Sent' ? 'Sent on' : 'Scheduled for'}{' '}
                {formatDate(alert.date)}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                  alert.status === 'Sent'
                    ? 'bg-safe/15 text-safe border-safe/20'
                    : 'bg-warning/15 text-warning border-warning/20'
                }`}
              >
                {alert.status}
              </span>
              <button
                onClick={() => navigate(`/contract/${alert.contractId}`)}
                className="text-accent hover:text-accent/80 text-xs font-medium btn-transition flex items-center gap-1"
              >
                View Contract
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-sm">No alerts match this filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
