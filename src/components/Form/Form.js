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
    <div className="space-y-6 rounded-lg bg-white p-4 md:p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
          <div className="md:col-span-1 xl:col-span-3 min-w-0">
            <Preferences
              preferences={preferences}
              selectedPreferences={formData.selectedPreferences}
              onPreferenceChange={(selected) =>
                handleChange('selectedPreferences', selected)
              }
            />
          </div>
          <div className="md:col-span-1 xl:col-span-3 min-w-0">
            <Features
              features={features}
              selectedFeatures={formData.selectedFeatures}
              onFeatureChange={(selected) =>
                handleChange('selectedFeatures', selected)
              }
            />
          </div>
          <div className="md:col-span-2 xl:col-span-4 min-w-0">
            <RecommendationType
              onRecommendationTypeChange={(selected) =>
                handleChange('selectedRecommendationType', selected)
              }
            />
          </div>
          <div className="md:col-span-2 xl:col-span-2 min-w-0">
            <button type="button" onClick={handleButtonClick} className="w-full h-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors">
              Obter recomendação
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {formData.selectedPreferences?.map((pref) => (
          <span key={pref} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center break-all">
            #{pref}
            <button
              onClick={() => handleChange('selectedPreferences', formData.selectedPreferences.filter(p => p !== pref))}
              className="ml-1 hover:text-blue-600 flex-shrink-0"
            >
              <CloseIcon />
            </button>
          </span>
        ))}
        {formData.selectedFeatures?.map((feat) => (
          <span key={feat} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center break-all">
            #{feat}
            <button
              onClick={() => handleChange('selectedFeatures', formData.selectedFeatures.filter(f => f !== feat))}
              className="ml-1 hover:text-green-600 flex-shrink-0"
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
