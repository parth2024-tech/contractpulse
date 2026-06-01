import { FileText } from 'lucide-react'

/**
 * EmptyState - Displays a friendly empty state when a list or page has no content.
 *
 * Props:
 *  - icon: A Lucide React icon component (default: FileText)
 *  - title: Main heading text (default: 'Nothing here yet')
 *  - description: Supporting text below the title
 *  - action: Optional { label: string, onClick: fn } for a CTA button
 */
export default function EmptyState({
  icon: Icon = FileText,
  title = 'Nothing here yet',
  description = 'No items to display at the moment.',
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Icon container */}
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-5">
        <Icon size={28} className="text-text-secondary" />
      </div>

      {/* Text */}
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-text-secondary text-sm max-w-xs leading-relaxed">{description}</p>

      {/* Optional CTA */}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 px-5 py-2.5 rounded-button bg-accent hover:bg-accent/90 text-white text-sm font-medium btn-transition"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
