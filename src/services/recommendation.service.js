// getRecommendations.js

/**
 * Serviço de recomendação de produtos
 *
 * Funcionalidades:
 * - Retorna recomendações de produtos com base nas preferências e features selecionadas
 * - Para SingleProduct: retorna apenas 1 produto, mesmo havendo múltiplos matches
 * - Para MultipleProducts: retorna todos os produtos que atendem aos critérios
 * - Em caso de empate no SingleProduct, retorna o último produto encontrado
 * - Ignora produtos inválidos
 */


const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products = []
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const isSingleProduct = selectedRecommendationType === 'SingleProduct';
  const preferences = selectedPreferences || [];
  const features = selectedFeatures || [];

  const productMatchesCriteria = (product) => {

    if (!products) {
      return false;
    }

    if (preferences.length === 0 && features.length === 0) {
      return true
    }


    if (preferences.length === 0) {
      return features.some(feature => product.features.includes(feature));
    }

    if (features.length === 0) {
      return preferences.some(preference => product.preferences.includes(preference));
    }

    const hasSomePreferences = preferences.some(preference => product.preferences.includes(preference));
    const hasSomeFeatures = features.some(feature => product.features.includes(feature));

    return hasSomePreferences && hasSomeFeatures;
  };

  const validProducts = products.filter(product => product && product.name && product.preferences && product.features);
  const matchingProducts = validProducts.filter(productMatchesCriteria);

  if (isSingleProduct) {
    return matchingProducts.length > 0 ? [matchingProducts[matchingProducts.length - 1]] : [];
  }

  return matchingProducts;
};

export default { getRecommendations };
