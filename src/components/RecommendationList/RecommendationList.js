import React from 'react';
import { useProductsContext } from '../../contexts/products.context';

function RecommendationList() {
  const { recommendations } = useProductsContext();

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600 text-lg">
          Nenhuma recomendação disponível. Por favor, preencha o formulário e clique em "Obter recomendação".
        </p>
      </div>
    );
  }


  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recommendations.map((product) => (
        <li key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-blue-900">{product.name}</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Funcionalidades</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Preferências atendidas</h4>
                <ul className="space-y-2">
                  {product.preferences.map((preference, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                      </svg>
                      {preference}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RecommendationList;
