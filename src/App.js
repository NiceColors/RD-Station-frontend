import React from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import { ProductsProvider } from './contexts/products.context';

function App() {
  return (
    <ProductsProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-blue-900 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-normal">Recomendador de Produtos RD Station</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-4">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-3">Bem-vindo ao seu assistente de produtos</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
            </p>
          </section>


          <div className="grid grid-cols-1 lg:grid-cols-1">
            <div>
              <Form />
            </div>
            <div className="py-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-6">Recomendações</h2>
              <RecommendationList />
            </div>

          </div>
        </main>
      </div>
    </ProductsProvider>
  );
}

export default App;
