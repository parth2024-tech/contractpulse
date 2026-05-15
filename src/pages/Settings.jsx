import { useState } from 'react'

export default function SettingsPage() {
  const [name, setName] = useState('John Doe')
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    alert90: true,
    alert60: true,
    alert30: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative w-10 h-[22px] rounded-full btn-transition ${
        checked ? 'bg-accent' : 'bg-border'
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white btn-transition ${
          checked ? 'translate-x-[18px]' : 'translate-x-0'
        }`}
      />
    </button>
  )

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="bg-card border border-border rounded-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-white font-medium">Profile</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border rounded-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-accent btn-transition"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                value="john@startup.io"
                readOnly
                className="w-full bg-background border border-border rounded-input px-3.5 py-2.5 text-sm text-text-disabled cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-white text-black px-4 py-2.5 rounded-button text-sm font-medium hover:bg-white/90 btn-transition"
            >
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-white font-medium">Notifications</h2>
          </div>
          <div className="p-5 space-y-5">
            {[
              { key: 'weeklyDigest', label: 'Weekly digest email every Monday' },
              { key: 'alert90', label: 'Alert at 90 days before Dead-Line' },
              { key: 'alert60', label: 'Alert at 60 days before Dead-Line' },
              { key: 'alert30', label: 'Alert at 30 days before Dead-Line' },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-sm text-white">{item.label}</span>
                <Toggle
                  checked={notifications[item.key]}
                  onChange={() =>
                    setNotifications(prev => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                />
              </label>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-danger/30 rounded-card">
          <div className="px-5 py-4 border-b border-danger/30">
            <h2 className="text-danger font-medium">Danger Zone</h2>
          </div>
          <div className="p-5">
            <p className="text-text-secondary text-sm mb-4">
              This will permanently delete all your contracts and data.
            </p>
            <button className="bg-danger/15 text-danger border border-danger/30 px-4 py-2.5 rounded-button text-sm font-medium hover:bg-danger/25 btn-transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
