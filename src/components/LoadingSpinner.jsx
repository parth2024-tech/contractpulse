/**
 * LoadingSpinner - A reusable loading indicator component.
 *
 * Props:
 *  - size: 'sm' | 'md' | 'lg' (default: 'md')
 *  - label: optional accessible text (default: 'Loading...')
 *  - fullScreen: if true, centers spinner in the full viewport (default: false)
 */
export default function LoadingSpinner({ size = 'md', label = 'Loading...', fullScreen = false }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-14 h-14 border-[3px]',
  }

  const spinner = (
    <div
      role="status"
      aria-label={label}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div
        className={`${sizeMap[size]} rounded-full border-white/10 border-t-accent animate-spin`}
      />
      {size !== 'sm' && (
        <p className="text-text-secondary text-xs">{label}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}
