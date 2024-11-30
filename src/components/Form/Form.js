import React from 'react';
import { useProductsContext } from '../../contexts/products.context';
import { Features, Preferences, RecommendationType } from './Fields';

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

function Form() {
  const {
    preferences,
    features,
    formData,
    handleChange,
    generateRecommendations
  } = useProductsContext();


  const handleButtonClick = (e) => {
    e.stopPropagation();
    generateRecommendations();
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <Preferences
              preferences={preferences}
              selectedPreferences={formData.selectedPreferences}
              onPreferenceChange={(selected) =>
                handleChange('selectedPreferences', selected)
              }
            />
          </div>
          <div className="col-span-3">
            <Features
              features={features}
              selectedFeatures={formData.selectedFeatures}
              onFeatureChange={(selected) =>
                handleChange('selectedFeatures', selected)
              }
            />
          </div>
          <div className="col-span-4">
            <RecommendationType
              onRecommendationTypeChange={(selected) =>
                handleChange('selectedRecommendationType', selected)
              }
            />
          </div>
          <div className="col-span-2">
            <button
              type="button"
              onClick={handleButtonClick}
              className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Obter recomendação
            </button>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap gap-2">
        {formData.selectedPreferences?.map((pref) => (
          <span key={pref} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
            #{pref}
            <button
              onClick={() => handleChange('selectedPreferences', formData.selectedPreferences.filter(p => p !== pref))}
              className="ml-1 hover:text-blue-600"
            >
              <CloseIcon />
            </button>
          </span>
        ))}
        {formData.selectedFeatures?.map((feat) => (
          <span key={feat} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
            #{feat}
            <button
              onClick={() => handleChange('selectedFeatures', formData.selectedFeatures.filter(f => f !== feat))}
              className="ml-1 hover:text-green-600"
            >
              <CloseIcon />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Form;
