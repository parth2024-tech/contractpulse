import { useNavigate } from 'react-router-dom'
import { FileX, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <FileX size={40} className="text-accent" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-white mb-2 tracking-tight">404</h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-white mb-3">Page Not Found</h2>
        <p className="text-text-secondary text-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-button border border-border text-text-secondary hover:text-white hover:border-white/20 text-sm btn-transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-button bg-accent hover:bg-accent/90 text-white text-sm font-medium btn-transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
