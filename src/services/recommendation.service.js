// getRecommendations.js

/**
 * Serviço de recomendação de produtos
 *
 * Funcionalidades:
 * - Retorna recomendações de produtos com base nas preferências e features selecionadas
 * - Para SingleProduct: retorna apenas 1 produto, mesmo havendo múltiplos matches
 * - Para MultipleProducts: retorna todos os produtos que atendem aos critérios
 * - Em caso de empate no SingleProduct, retorna o último produto encontrado
 */



const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const isSingleProduct = selectedRecommendationType === 'SingleProduct';


  const preferences = selectedPreferences || [];
  const features = selectedFeatures || [];

  const productMatchesCriteria = (product) => {

    if (!product) {
      return false;
    }


    const hasSomePreferences = preferences.some(preference => product.preferences.includes(preference));

    const hasSomeFeatures = features.some(feature => product.features.includes(feature));


    return hasSomePreferences || hasSomeFeatures;
  };



  if (isSingleProduct) {
    const matchingProducts = products.filter(productMatchesCriteria);
    return [matchingProducts[matchingProducts.length - 1]] || [];

  }

  return products.filter(productMatchesCriteria);


};

export default { getRecommendations };
