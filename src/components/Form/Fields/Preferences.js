import { useState } from 'react'
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
    <h3 className="font-semibold">Filtrar por preferências</h3>
    {currentPreferences.length > 0 && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
      >
        Limpar
      </Button>
    )}
  </div>
)

const PreferencesActions = ({ onClose }) => (
  <div className="mt-4 flex items-center justify-end gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={onClose}
    >
      Cancelar
    </Button>
    <Button
      size="sm"
      onClick={onClose}
    >
      Aplicar filtros
    </Button>
  </div>
)

export default function Preferences({ preferences, selectedPreferences = [], onPreferenceChange }) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences)
  const [isOpen, setIsOpen] = useState(false)

  const handlePreferenceChange = (preference) => {
    let updatedPreferences = []

    if (currentPreferences.includes(preference)) {
      updatedPreferences = currentPreferences.filter((pref) => pref !== preference);
    } else {
      updatedPreferences = [...currentPreferences, preference];
    }

    setCurrentPreferences(updatedPreferences)
    onPreferenceChange(updatedPreferences)
  }

  return (
    <div className="relative ">
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
          {currentPreferences.length}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-lg border bg-card p-4 shadow-lg space-y-4 bg-white">
          <PreferencesHeader
            currentPreferences={currentPreferences}
            onClear={() => {
              setCurrentPreferences([])
              onPreferenceChange([])
            }}
          />

          <PreferencesList
            preferences={preferences}
            currentPreferences={currentPreferences}
            onPreferenceChange={handlePreferenceChange}
          />

          <PreferencesActions onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  )
}
