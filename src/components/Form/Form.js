import React from 'react';
import { useProductsContext } from '../../contexts/products.context';
import { Features, Preferences, RecommendationType } from './Fields';

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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Obter recomendação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
