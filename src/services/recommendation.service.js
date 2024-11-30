// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const preferences = selectedPreferences || [];
  const features = selectedFeatures || [];

  const productMatchesCriteria = (product) => {
    const hasAllPreferences = preferences.every(preference =>
      product.preferences.includes(preference)
    );

    const hasAllFeatures = features.every(feature =>
      product.features.includes(feature)
    );

    return hasAllPreferences && hasAllFeatures;
  };

  const matchingProducts = products.filter(productMatchesCriteria);

  const getMatchScore = (product) =>
    product.preferences.length + product.features.length;

  const sortedProducts = matchingProducts.sort((a, b) =>
    getMatchScore(b) - getMatchScore(a)
  );

  return selectedRecommendationType === 'SingleProduct'
    ? sortedProducts.slice(0, 1)
    : sortedProducts;
};

export default { getRecommendations };
