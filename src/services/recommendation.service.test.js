import mockProducts from '../mocks/mockProducts';
import recommendationService from './recommendation.service';

describe('recommendationService', () => {
  describe('SingleProduct recommendations', () => {
    test('Retorna recomendação correta com base nas preferências selecionadas', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna apenas um produto quando há múltiplos matches', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });

    test('Retorna o último match em caso de empate', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna array vazio quando não há matches', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Feature inexistente'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
      expect(recommendations).toEqual([]);
    });
  });

  describe('MultipleProducts recommendations', () => {
    test('Retorna recomendações corretas com base nas preferências e features', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

    test('Retorna todos os produtos quando matches apenas por features', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: ['Rastreamento de interações com clientes'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations.length).toBeGreaterThan(0);
      recommendations.forEach(product => {
        expect(product.features).toContain('Rastreamento de interações com clientes');
      });
    });

    test('Retorna array vazio quando não há matches', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Feature inexistente'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
      expect(recommendations).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    test('Lida corretamente com formData vazio', () => {
      const recommendations = recommendationService.getRecommendations(
        {},
        mockProducts
      );

      expect(Array.isArray(recommendations)).toBe(true);
    });

    test('Lida corretamente com arrays vazios de preferências e features', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations).toHaveLength(mockProducts.length);
    });

    test('Lida corretamente com produtos inválidos', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Rastreamento de interações com clientes'],
        selectedRecommendationType: 'MultipleProducts',
      };

      const invalidProducts = [null, undefined, {}, ...mockProducts];

      const recommendations = recommendationService.getRecommendations(
        formData,
        invalidProducts
      );

      expect(Array.isArray(recommendations)).toBe(true);
      recommendations.forEach(product => {
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('preferences');
        expect(product).toHaveProperty('features');
      });
    });
  });
});
