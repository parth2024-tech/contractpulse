import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileUp, Check, Loader2, FileText } from 'lucide-react'
import { useToast } from '../components/Toast'

const steps = [
  { label: 'Upload', icon: UploadIcon },
  { label: 'Extracting', icon: Loader2 },
  { label: 'Review', icon: Check },
]

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const { addToast } = useToast()

  const handleFile = (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      addToast('Please upload a PDF file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      addToast('File size must be under 10MB.')
      return
    }

    setFileName(file.name)
    setCurrentStep(1)
    addToast('Contract received. Extraction in progress...')

    // Simulate extraction
    setTimeout(() => {
      setCurrentStep(2)
      setTimeout(() => {
        navigate('/contract/1')
      }, 1500)
    }, 2500)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white">Upload Contract</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Upload zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`border-2 border-dashed rounded-card p-16 text-center cursor-pointer btn-transition ${
            isDragging
              ? 'border-accent bg-accent/5'
              : currentStep > 0
              ? 'border-safe/30 bg-safe/5'
              : 'border-border hover:border-text-disabled bg-card'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleInputChange}
            className="hidden"
          />

          {currentStep === 0 && (
            <>
              <FileUp size={40} className="text-text-secondary mx-auto mb-4" />
              <p className="text-white font-medium text-lg mb-1">Drop your contract PDF here</p>
              <p className="text-text-secondary text-sm mb-4">or click to browse files</p>
              <p className="text-text-disabled text-xs">PDF files only, max 10MB</p>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Loader2 size={40} className="text-accent mx-auto mb-4 animate-spin" />
              <p className="text-white font-medium text-lg mb-1">Extracting data from {fileName}</p>
              <p className="text-text-secondary text-sm">AI is analyzing your contract...</p>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="w-12 h-12 rounded-full bg-safe/15 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-safe" />
              </div>
              <p className="text-white font-medium text-lg mb-1">Extraction complete</p>
              <p className="text-text-secondary text-sm">Redirecting to review...</p>
            </>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-0 mt-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border btn-transition ${
                    i < currentStep
                      ? 'bg-safe/15 border-safe/30 text-safe'
                      : i === currentStep
                      ? 'bg-accent/15 border-accent/30 text-accent'
                      : 'bg-card border-border text-text-disabled'
                  }`}
                >
                  {i < currentStep ? (
                    <Check size={16} />
                  ) : i === currentStep && i === 1 ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <step.icon size={16} />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    i <= currentStep ? 'text-white' : 'text-text-disabled'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-24 h-px mx-3 mb-5 ${
                    i < currentStep ? 'bg-safe/30' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p className="text-text-disabled text-xs text-center mt-8">
          Your contract is processed to extract dates and spend only. Raw files are not stored after processing.
        </p>
      </div>
    </div>
  )
}
