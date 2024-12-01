import React, { useState } from 'react';
import { Button } from '../../shared/Button';

const SingleProductIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-600"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const MultipleProductsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-600"
  >
    <rect x="2" y="2" width="14" height="14" rx="2" />
    <rect x="8" y="8" width="14" height="14" rx="2" />
  </svg>
);

function RecommendationType({ onRecommendationTypeChange }) {
  const [selected, setSelected] = useState('MultipleProducts');

  const handleSelect = (type) => {
    setSelected(type);
    onRecommendationTypeChange(type);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col md:flex-row gap-3 ">
        <Button
          variant={'outline'}
          className={`w-full lg:w-auto py-4 space-x-2 transition-transform ${selected === 'SingleProduct' ? 'border-blue-500 shadow-lg' : ''
            }`}
          onClick={() => handleSelect('SingleProduct')}
        >
          <div className="rounded-full bg-blue-100 p-2">
            <SingleProductIcon />
          </div>
          <span className="block font-semibold text-md">Produto Único</span>
        </Button>

        <Button
          variant={'outline'}
          className={`w-full lg:w-auto py-4 space-x-2 transition-transform ${selected === 'MultipleProducts' ? 'border-blue-500 shadow-lg' : ''}`}
          onClick={() => handleSelect('MultipleProducts')}
        >
          <div className="rounded-full bg-blue-100 p-2">
            <MultipleProductsIcon />
          </div>
          <span className="block font-semibold text-md">Múltiplos Produtos</span>
        </Button>
      </div>
    </div>
  );
}

export default RecommendationType;
