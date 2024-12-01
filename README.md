# Teste Técnico - Recomendador de Produtos RD Station

Este projeto é parte do teste técnico para a vaga de desenvolvedor front-end na RD Station. O objetivo principal é implementar a lógica de recomendação de produtos RD Station em uma aplicação web existente.

## Missão

Desenvolver a funcionalidade central de recomendação de produtos dentro de uma aplicação React.js pré-existente. A implementação deve permitir aos usuários selecionar suas preferências e funcionalidades desejadas, e então receber recomendações de produtos correspondentes.

## Tecnologias Utilizadas

- React.js: Para o desenvolvimento do front-end
- json-server: Para simular um servidor RESTful com dados de produtos
- Tailwind CSS: Para estilização e layout responsivo

## Critérios de Aceite

1. Formulário funcional para receber preferências do usuário
   - [x] Implementar campos de seleção para todas as preferências
   - [x] Validação de campos obrigatórios
   - [x] Feedback visual para o usuário

2. Recomendações baseadas nas preferências selecionadas
   - [x] Algoritmo de matching entre preferências e produtos
   - [x] Exibição clara dos resultados

3. Modo SingleProduct
   - [x] Implementar lógica de seleção do produto mais adequado
   - [x] Exibição detalhada do produto recomendado

4. Modo MultipleProducts
   - [x] Implementar lógica de filtro para múltiplos produtos
5. Tratamento de empates
   - [x] Implementar lógica para selecionar último produto válido
   - [x] Documentar critérios de desempate

6. Sistema modular e extensível
   - [x] Componentes reutilizáveis
   - [x] Padrões de código consistentes

7. Tratamento de combinações de preferências
   - [x] Testes para diferentes cenários
   - [x] Tratamento de casos edge
   - [x] Feedback para combinações sem resultados

## Componentes Principais

1. **Form**: Componente principal para entrada de dados do usuário.
2. **RecommendationList**: Exibe a lista de produtos recomendados.
3. **ProductsContext**: Gerencia o estado global da aplicação.
4. **RecommendationService**: Lógica de negócios para gerar recomendações.

## Fluxo de Dados

1. O usuário interage com o `Form` para selecionar preferências e características.
2. O `ProductsContext` atualiza o estado global com as seleções do usuário.
3. Quando o usuário solicita recomendações, o `RecommendationService` é chamado.
4. O `RecommendationList` exibe os resultados retornados pelo serviço.

## Extensibilidade

- Novos campos de entrada podem ser adicionados ao `Form` criando novos componentes de campo.
- O `RecommendationService` pode ser estendido para incluir algoritmos de recomendação mais complexos.
- Novos tipos de visualização podem ser adicionados criando componentes adicionais similares ao `RecommendationList`.


## Testes

O projeto inclui testes unitários para validar as funcionalidades implementadas. Execute-os com `yarn test`.

## Autor

Desenvolvido por Victor Batista

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
