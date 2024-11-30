import { useEffect, useRef, useState } from 'react'
import { Button } from '../../shared/Button'
import Checkbox from '../../shared/Checkbox'

const PreferencesFilterIcon = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const PreferencesList = ({ preferences, currentPreferences, onPreferenceChange }) => (
  <div className="space-y-3">
    {preferences.map((preference, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/50"
      >
        <Checkbox
          checked={currentPreferences.includes(preference)}
          onChange={() => onPreferenceChange(preference)}
        >
          {preference}
        </Checkbox>
      </div>
    ))}
  </div>
)

const PreferencesHeader = ({ currentPreferences, onClear }) => (
  <div className="mb-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <h3 className="font-semibold text-gray-800">Selecionar preferências</h3>
    </div>
    {currentPreferences.length > 0 && (
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

export default function Preferences({ preferences, selectedPreferences = [], onPreferenceChange }) {
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

  const handlePreferenceChange = (preference) => {
    let updatedPreferences = []

    if (selectedPreferences.includes(preference)) {
      updatedPreferences = selectedPreferences.filter((pref) => pref !== preference)
    } else {
      updatedPreferences = [...selectedPreferences, preference]
    }

    onPreferenceChange(updatedPreferences)
  }

  const handleClear = () => {
    onPreferenceChange([])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <PreferencesFilterIcon />
          <span>Preferências</span>
        </div>
        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
          {selectedPreferences.length}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-lg border bg-card p-4 shadow-lg space-y-4 bg-white">
          <PreferencesHeader
            currentPreferences={selectedPreferences}
            onClear={handleClear}
          />

          <PreferencesList
            preferences={preferences}
            currentPreferences={selectedPreferences}
            onPreferenceChange={handlePreferenceChange}
          />

        </div>
      )}
    </div>
  )
}
