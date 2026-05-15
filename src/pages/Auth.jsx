import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Auth() {
  const [tab, setTab] = useState('signin')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Activity size={22} className="text-accent" />
          <span className="text-white font-semibold text-xl tracking-tight">ContractPulse</span>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-card">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-3.5 text-sm font-medium btn-transition ${
                tab === 'signin'
                  ? 'text-white border-b-2 border-accent'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-3.5 text-sm font-medium btn-transition ${
                tab === 'signup'
                  ? 'text-white border-b-2 border-accent'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full bg-background border border-border rounded-input px-3.5 py-2.5 text-sm text-white placeholder:text-text-disabled focus:outline-none focus:border-accent btn-transition"
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Work Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-background border border-border rounded-input px-3.5 py-2.5 text-sm text-white placeholder:text-text-disabled focus:outline-none focus:border-accent btn-transition"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-input px-3.5 py-2.5 text-sm text-white placeholder:text-text-disabled focus:outline-none focus:border-accent btn-transition"
              />
              {tab === 'signin' && (
                <button type="button" className="text-accent text-xs mt-2 hover:underline">
                  Forgot password?
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-2.5 rounded-button text-sm font-medium hover:bg-white/90 btn-transition mt-2"
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>

            {tab === 'signup' && (
              <p className="text-text-disabled text-xs text-center mt-3">
                By signing up you agree to our{' '}
                <span className="text-text-secondary hover:text-white cursor-pointer">Terms</span>{' '}
                and{' '}
                <span className="text-text-secondary hover:text-white cursor-pointer">Privacy Policy</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
