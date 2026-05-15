import { Link } from 'react-router-dom'
import { ArrowRight, Upload, Cpu, BellRing, Activity } from 'lucide-react'

const stats = [
  { value: '$2.4M', label: 'saved across contracts tracked' },
  { value: '94%', label: 'extraction accuracy' },
  { value: '2 min', label: 'to first insight' },
]

const steps = [
  {
    num: '01',
    title: 'Upload',
    description: 'Drop any SaaS contract PDF. We handle the rest.',
    icon: Upload,
  },
  {
    num: '02',
    title: 'Extract',
    description: 'AI pulls every critical date and dollar amount automatically.',
    icon: Cpu,
  },
  {
    num: '03',
    title: 'Act',
    description: 'Get alerted before your cancellation window closes.',
    icon: BellRing,
  },
]

const mockData = [
  { vendor: 'Salesforce', spend: '$72,000/yr', end: 'Mar 1, 2025', deadline: 'Jan 30, 2025', days: 12, status: 'Act Now' },
  { vendor: 'HubSpot', spend: '$48,000/yr', end: 'Jun 15, 2025', deadline: 'Apr 16, 2025', days: 42, status: 'Coming Up' },
  { vendor: 'Zoom', spend: '$18,000/yr', end: 'Sep 1, 2025', deadline: 'Aug 2, 2025', days: 150, status: 'Safe' },
  { vendor: 'Notion', spend: '$9,600/yr', end: 'Nov 1, 2025', deadline: 'Oct 2, 2025', days: 211, status: 'Safe' },
]

const statusBadge = (status) => {
  const colors = {
    'Act Now': 'bg-danger/15 text-danger border-danger/20',
    'Coming Up': 'bg-warning/15 text-warning border-warning/20',
    'Safe': 'bg-safe/15 text-safe border-safe/20',
  }
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${colors[status]}`
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-accent" />
          <span className="text-white font-semibold text-lg tracking-tight">ContractPulse</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/auth"
            className="text-text-secondary hover:text-white text-sm btn-transition"
          >
            Sign In
          </Link>
          <Link
            to="/auth"
            className="bg-white text-black px-4 py-2 rounded-button text-sm font-medium hover:bg-white/90 btn-transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          Stop Paying for Software<br />You Forgot to Cancel.
        </h1>
        <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          ContractPulse tracks every SaaS renewal deadline and alerts you before the point of no return. Never get blindsided by an auto-renewal again.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link
            to="/upload"
            className="bg-white text-black px-6 py-3 rounded-button text-sm font-medium hover:bg-white/90 btn-transition flex items-center gap-2"
          >
            Upload Your First Contract
            <ArrowRight size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="border border-white/20 text-white px-6 py-3 rounded-button text-sm font-medium hover:bg-white/5 btn-transition"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border">
        <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-2xl font-semibold text-white mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-card border border-border rounded-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-accent font-mono text-sm font-semibold">{step.num}</span>
                <step.icon size={18} className="text-text-secondary" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You See */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">What You See</h2>
        <div className="bg-card border border-border rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Vendor</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Annual Spend</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Contract End</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Dead-Line</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Days Left</th>
                  <th className="text-left px-5 py-3.5 text-text-secondary font-medium text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-hover-row btn-transition">
                    <td className="px-5 py-3.5 text-white font-medium">{row.vendor}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{row.spend}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{row.end}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{row.deadline}</td>
                    <td className={`px-5 py-3.5 font-mono ${row.days < 30 ? 'text-danger font-semibold' : row.days <= 60 ? 'text-warning font-semibold' : 'text-safe'}`}>
                      {row.days}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={statusBadge(row.status)}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-text-disabled text-sm">
          ContractPulse © 2025. Built for operators who don't want surprises.
        </p>
      </footer>
    </div>
  )
}
