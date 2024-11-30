import { useEffect, useRef, useState } from 'react'
import { Button } from '../../shared/Button'
import Checkbox from '../../shared/Checkbox'

const FeatureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const FeatureList = ({ features, currentFeatures, onFeatureChange }) => (
  <div className="space-y-3">
    {features.map((feature, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/50"
      >
        <Checkbox
          checked={currentFeatures.includes(feature)}
          onChange={() => onFeatureChange(feature)}
        >
          {feature}
        </Checkbox>
      </div>
    ))}
  </div>
)

const FeatureHeader = ({ currentFeatures, onClear }) => (
  <div className="mb-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <h3 className="font-semibold text-gray-800 ">Selecionar funcionalidades</h3>
    </div>
    {currentFeatures.length > 0 && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Limpar
      </Button>
    )}
  </div>
)



export default function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFeatureChange = (feature) => {
    let updatedFeatures = []

    if (selectedFeatures.includes(feature)) {
      updatedFeatures = selectedFeatures.filter((feat) => feat !== feature)
    } else {
      updatedFeatures = [...selectedFeatures, feature]
    }

    onFeatureChange(updatedFeatures)
  }

  const handleClear = () => {
    onFeatureChange([])
  }



  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <FeatureIcon />
          <span>Funcionalidades</span>
        </div>
        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
          {selectedFeatures.length}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-lg border bg-card p-4 shadow-lg space-y-4 bg-white">
          <FeatureHeader
            currentFeatures={selectedFeatures}
            onClear={handleClear}
          />

          <FeatureList
            features={features}
            currentFeatures={selectedFeatures}
            onFeatureChange={handleFeatureChange}
          />


        </div>
      )}
    </div>
  )
}
