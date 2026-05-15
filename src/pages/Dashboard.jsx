import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Clock, DollarSign, ArrowUpRight } from 'lucide-react'
import { sortedContracts, contracts, formatCurrency, formatDate, getStatusColor, getDaysColor } from '../data'

const recentlyAdded = contracts
  .sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded))
  .slice(0, 3)

export default function Dashboard() {
  const navigate = useNavigate()
  const hasContracts = true // toggle for empty state

  const totalContracts = contracts.length
  const actionRequired = contracts.filter(c => c.daysRemaining < 30).length
  const totalSpend = contracts.reduce((sum, c) => sum + c.annualSpend, 0)

  if (!hasContracts) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6">
            <FileText size={24} className="text-text-secondary" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No contracts yet</h2>
          <p className="text-text-secondary text-sm mb-6">Upload your first contract to see your renewal deadlines</p>
          <button
            onClick={() => navigate('/upload')}
            className="bg-white text-black px-5 py-2.5 rounded-button text-sm font-medium hover:bg-white/90 btn-transition flex items-center gap-2"
          >
            <Upload size={16} />
            Upload Contract
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <button
          onClick={() => navigate('/upload')}
          className="bg-white text-black px-4 py-2.5 rounded-button text-sm font-medium hover:bg-white/90 btn-transition flex items-center gap-2"
        >
          <Upload size={16} />
          Upload Contract
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-card border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-secondary text-sm">Total Contracts</span>
            <FileText size={16} className="text-text-disabled" />
          </div>
          <div className="text-3xl font-bold text-white">{totalContracts}</div>
          <div className="text-text-disabled text-xs mt-1">across all vendors</div>
        </div>
        <div className="bg-card border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-secondary text-sm">Action Required</span>
            <Clock size={16} className="text-danger" />
          </div>
          <div className="text-3xl font-bold text-danger">{actionRequired}</div>
          <div className="text-text-disabled text-xs mt-1">within 30 days</div>
        </div>
        <div className="bg-card border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-secondary text-sm">Total Spend Tracked</span>
            <DollarSign size={16} className="text-text-disabled" />
          </div>
          <div className="text-3xl font-bold text-white">{formatCurrency(totalSpend)}/yr</div>
          <div className="text-text-disabled text-xs mt-1">annual committed spend</div>
        </div>
      </div>

      {/* Upcoming Deadlines table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Upcoming Dead-Lines</h2>
        <div className="bg-card border border-border rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Vendor</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Annual Spend</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Contract End</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Dead-Line</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Days Remaining</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Auto-Renewal</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    onClick={() => navigate(`/contract/${contract.id}`)}
                    className="border-b border-border last:border-0 hover:bg-hover-row btn-transition cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                          style={{ backgroundColor: contract.color + '22', color: contract.color }}
                        >
                          {contract.initial}
                        </div>
                        <span className="text-white font-medium">{contract.vendor}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{formatCurrency(contract.annualSpend)}/yr</td>
                    <td className="px-5 py-3.5 text-text-secondary">{formatDate(contract.contractEnd)}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{formatDate(contract.deadlineDate)}</td>
                    <td className={`px-5 py-3.5 font-mono ${getDaysColor(contract.daysRemaining)}`}>
                      {contract.daysRemaining}
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{contract.autoRenewal ? 'Yes' : 'No'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/contract/${contract.id}`)
                        }}
                        className="text-accent hover:text-accent/80 text-xs font-medium btn-transition flex items-center gap-1"
                      >
                        Review
                        <ArrowUpRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recently Added */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recently Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentlyAdded.map((contract) => (
            <div key={contract.id} className="bg-card border border-border rounded-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ backgroundColor: contract.color + '22', color: contract.color }}
                >
                  {contract.initial}
                </div>
                <span className="text-white font-medium">{contract.vendor}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Uploaded</span>
                  <span className="text-text-secondary">{formatDate(contract.dateUploaded)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Confidence</span>
                  <span className="text-white">{contract.extractionConfidence}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5 mt-1">
                  <div
                    className="bg-accent h-1.5 rounded-full"
                    style={{ width: `${contract.extractionConfidence}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => navigate(`/contract/${contract.id}`)}
                className="text-accent hover:text-accent/80 text-xs font-medium mt-4 btn-transition flex items-center gap-1"
              >
                View Details
                <ArrowUpRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
