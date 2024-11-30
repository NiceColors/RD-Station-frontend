import React from 'react';
import { useProductsContext } from '../../contexts/products.context';

const CheckIcon = () => (
  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
)

const CheckSmallIcon = () => (
  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
  </svg>
)

const EmptyState = () => (
  <div className="bg-gray-50 rounded-lg p-8 text-center">
    <p className="text-gray-600 text-lg">
      Sem recomendações. Preencha o formulário para obter sugestões.
    </p>
  </div>
)

const ProductCard = ({ product }) => (
  <li className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
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
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Preferências</h4>
          <ul className="space-y-2">
            {product.preferences.map((preference, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <CheckSmallIcon />
                {preference}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </li>
)

function RecommendationList() {
  const { recommendations } = useProductsContext();

  if (!recommendations?.length) {
    return <EmptyState />;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recommendations.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default RecommendationList;
