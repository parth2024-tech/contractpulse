import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pencil, Check, X } from 'lucide-react'
import { contracts, formatCurrency, formatDate, getDaysColor } from '../data'

export default function ContractDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const contract = contracts.find(c => c.id === parseInt(id))
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [alerts, setAlerts] = useState({
    alert90: true,
    alert60: true,
    alert30: true,
  })

  if (!contract) {
    return (
      <div className="p-8">
        <p className="text-text-secondary">Contract not found.</p>
      </div>
    )
  }

  const fields = [
    { key: 'vendor', label: 'Vendor Name', value: contract.vendor },
    { key: 'annualSpend', label: 'Annual Spend', value: formatCurrency(contract.annualSpend) },
    { key: 'contractStart', label: 'Contract Start Date', value: formatDate(contract.contractStart) },
    { key: 'contractEnd', label: 'Contract End Date', value: formatDate(contract.contractEnd) },
    { key: 'noticePeriod', label: 'Notice Period', value: contract.noticePeriod },
    {
      key: 'deadline',
      label: 'Dead-Line',
      value: formatDate(contract.deadlineDate),
      highlight: contract.daysRemaining < 30,
    },
    {
      key: 'autoRenewal',
      label: 'Auto-Renewal Clause',
      value: contract.autoRenewal,
      isBadge: true,
    },
    { key: 'noticeMethod', label: 'Notice Delivery Method', value: contract.noticeMethod },
    {
      key: 'confidence',
      label: 'Extraction Confidence',
      value: contract.extractionConfidence,
      isProgress: true,
    },
  ]

  const getRecommendation = () => {
    if (contract.daysRemaining < 30) {
      return {
        text: `Send cancellation notice immediately. Deadline is in ${contract.daysRemaining} days.`,
        color: 'text-danger',
        bg: 'bg-danger/10 border-danger/20',
      }
    }
    if (contract.daysRemaining <= 60) {
      return {
        text: 'Begin vendor negotiation. You have leverage.',
        color: 'text-warning',
        bg: 'bg-warning/10 border-warning/20',
      }
    }
    return {
      text: 'No action needed. Monitor monthly.',
      color: 'text-safe',
      bg: 'bg-safe/10 border-safe/20',
    }
  }

  const getCountdownColor = () => {
    if (contract.daysRemaining < 30) return 'text-danger'
    if (contract.daysRemaining <= 60) return 'text-warning'
    return 'text-safe'
  }

  const recommendation = getRecommendation()

  const startEdit = (key, value) => {
    setEditingField(key)
    setEditValue(typeof value === 'boolean' ? '' : String(value))
  }

  const cancelEdit = () => {
    setEditingField(null)
    setEditValue('')
  }

  const saveEdit = () => {
    // In a real app, this would save to backend
    setEditingField(null)
    setEditValue('')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-text-secondary hover:text-white text-sm mb-6 btn-transition"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ backgroundColor: contract.color + '22', color: contract.color }}
          >
            {contract.initial}
          </div>
          <h1 className="text-2xl font-semibold text-white">{contract.vendor}</h1>
        </div>
        <p className="text-text-secondary text-sm ml-[52px]">
          {formatDate(contract.contractStart)} — {formatDate(contract.contractEnd)}
        </p>
      </div>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Extracted Data */}
        <div className="lg:w-[60%]">
          <div className="bg-card border border-border rounded-card">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-white font-medium">Extracted Data</h2>
            </div>
            <div className="divide-y divide-border">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className="px-5 py-3.5 flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <span className="text-text-secondary text-sm">{field.label}</span>
                    <div className="mt-0.5">
                      {editingField === field.key ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-background border border-accent rounded-input px-2.5 py-1.5 text-sm text-white focus:outline-none w-full max-w-xs"
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="text-safe hover:text-safe/80 btn-transition"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-text-secondary hover:text-white btn-transition"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : field.isBadge ? (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${
                            field.value
                              ? 'bg-danger/10 text-danger border-danger/20'
                              : 'bg-safe/10 text-safe border-safe/20'
                          }`}
                        >
                          {field.value ? 'True' : 'False'}
                        </span>
                      ) : field.isProgress ? (
                        <div className="flex items-center gap-3">
                          <span className="text-white text-sm font-medium">{field.value}%</span>
                          <div className="w-32 bg-background rounded-full h-1.5">
                            <div
                              className="bg-accent h-1.5 rounded-full"
                              style={{ width: `${field.value}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            field.highlight ? 'text-danger' : 'text-white'
                          }`}
                        >
                          {field.value}
                        </span>
                      )}
                    </div>
                  </div>
                  {editingField !== field.key && !field.isProgress && (
                    <button
                      onClick={() => startEdit(field.key, field.value)}
                      className="text-text-disabled opacity-0 group-hover:opacity-100 hover:text-text-secondary btn-transition"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:w-[40%] space-y-5">
          {/* Time Remaining */}
          <div className="bg-card border border-border rounded-card p-5">
            <h3 className="text-text-secondary text-sm mb-4">Time Remaining</h3>
            <div className={`text-5xl font-bold ${getCountdownColor()} mb-1`}>
              {contract.daysRemaining}
            </div>
            <div className="text-text-secondary text-sm">days until Dead-Line</div>
          </div>

          {/* Recommended Action */}
          <div className={`border rounded-card p-5 ${recommendation.bg}`}>
            <h3 className="text-text-secondary text-sm mb-3">Recommended Action</h3>
            <p className={`text-sm font-medium leading-relaxed ${recommendation.color}`}>
              {recommendation.text}
            </p>
          </div>

          {/* Alert Settings */}
          <div className="bg-card border border-border rounded-card p-5">
            <h3 className="text-text-secondary text-sm mb-4">Alert Settings</h3>
            <div className="space-y-4">
              {[
                { key: 'alert90', label: 'Email alert at 90 days' },
                { key: 'alert60', label: 'Email alert at 60 days' },
                { key: 'alert30', label: 'Email alert at 30 days' },
              ].map((alert) => (
                <label
                  key={alert.key}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-sm text-white">{alert.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={alerts[alert.key]}
                    onClick={() =>
                      setAlerts(prev => ({ ...prev, [alert.key]: !prev[alert.key] }))
                    }
                    className={`relative w-10 h-[22px] rounded-full btn-transition ${
                      alerts[alert.key] ? 'bg-accent' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white btn-transition ${
                        alerts[alert.key] ? 'translate-x-[18px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
