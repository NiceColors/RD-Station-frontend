import React, { createContext, useContext } from 'react';
import useForm from '../hooks/useForm';
import useProducts from '../hooks/useProducts';
import useRecommendations from '../hooks/useRecommendations';

const ProductsContext = createContext();

const initialFormState = {
  category: '',
  features: [],
  preferences: [],
  recommendationType: 'MultipleProducts',
};

export const ProductsProvider = ({ children }) => {

  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm(initialFormState);
  const { recommendations, getRecommendations, setRecommendations } = useRecommendations(products);

  const generateRecommendations = () => {
    const newRecommendations = getRecommendations(formData);
    setRecommendations(newRecommendations);
  };

  return (
    <ProductsContext.Provider
      value={{
        preferences,
        features,
        products,
        formData,
        handleChange,
        recommendations,
        generateRecommendations,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('É necessário usar o hook useProductsContext dentro do componente ProductsProvider');
  }
  return context;
};

export default ProductsContext;
