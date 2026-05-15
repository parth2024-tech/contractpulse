import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { sortedContracts, formatCurrency, formatDate, getStatusColor, getDaysColor } from '../data'

export default function Contracts() {
  const navigate = useNavigate()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">Contracts</h1>

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
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
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
  )
}
