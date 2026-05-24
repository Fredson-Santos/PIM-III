# CAPÍTULO 4 — INTEGRAÇÃO CURRICULAR E APLICAÇÃO PRÁTICA DAS DISCIPLINAS

## 4.1 INTRODUÇÃO À INTEGRAÇÃO MULTIDISCIPLINAR

O Projeto Integrador Multidisciplinar (PIM III) constitui um instrumento fundamental de síntese acadêmica, cujo propósito reside na articulação prática dos conhecimentos teóricos adquiridos ao longo do curso de Análise e Desenvolvimento de Sistemas. A concepção e o desenvolvimento do sistema de gestão financeira pessoal, gerido pela empresa fictícia Conekta, exigiram a convergência de oito disciplinas curriculares obrigatórias. 

O projeto foi conduzido sob a ótica de uma simulação empresarial realista, adotando práticas consolidadas de engenharia de software, arquitetura de sistemas e design centrado no usuário. Cada disciplina desempenhou um papel estrutural no ciclo de vida do produto, garantindo que a solução final apresentasse robustez técnica, usabilidade, segurança, escalabilidade e conformidade com os padrões de acessibilidade.

---

## 4.2 DESENVOLVIMENTO WEB RESPONSIVO

A disciplina de Desenvolvimento Web Responsivo forneceu as bases conceituais e tecnológicas para a construção da camada de apresentação do sistema Conekta. O objetivo primordial consistiu em criar uma interface de usuário que se adaptasse de forma fluida e harmoniosa a diferentes resoluções de tela e dispositivos, desde smartphones até monitores de grande porte.

No que tange à implementação prática, optou-se pela utilização de tecnologias web nativas e padronizadas, especificamente HTML5, CSS3 e JavaScript puro (Vanilla JavaScript). Essa escolha arquitetural visou assegurar o controle irrestrito sobre o código gerado e otimizar o tempo de carregamento da aplicação, mantendo-o sistematicamente inferior a dois segundos.

A arquitetura visual foi desenvolvida sob o paradigma Mobile-First. Os estilos CSS foram estruturados inicialmente para telas de 320 a 375 pixels de largura e, subsequentemente, expandidos por meio de regras de Media Queries para contemplar resoluções de tablets (768 pixels), desktops (1024 pixels) e monitores ultrawide (1920 pixels). A padronização visual foi alcançada por meio da criação de um arquivo de estilos globais (global.css), no qual foram definidas variáveis de raiz (Design Tokens) para o armazenamento centralizado da paleta de cores, tipografia, espaçamentos e sombras.

O dinamismo da interface e a comunicação assíncrona com o servidor foram implementados por meio da Fetch API nativa do JavaScript. O script principal atua na orquestração da interface, interceptando eventos do usuário, gerenciando cabeçalhos de autorização com tokens JWT e manipulando o Modelo de Objeto de Documento (DOM) para a renderização reativa de elementos como tabelas de transações, gráficos analíticos, janelas modais e notificações visuais de feedback.

---

## 4.3 ENGENHARIA DE SOFTWARE ÁGIL APLICADA

A gestão do projeto Conekta fundamentou-se nos princípios e artefatos da Engenharia de Software Ágil Aplicada, visando garantir entregas contínuas de valor, adaptabilidade a mudanças e alinhamento constante entre a equipe técnica e as necessidades do negócio. A metodologia adotada espelhou o funcionamento operacional de uma Software House moderna.

O ciclo de desenvolvimento iniciou-se com o levantamento minucioso de requisitos. Foram formalizados quinze Requisitos Funcionais, abrangendo desde a autenticação de usuários até a geração de relatórios complexos, e oito Requisitos Não-Funcionais, estipulando restrições de desempenho, segurança, compatibilidade e usabilidade.

Para a operacionalização do desenvolvimento, o escopo global foi particionado em três ciclos iterativos (Sprints), geridos por meio de um Backlog rigorosamente priorizado segundo o valor de negócio:
a) Sprint 1 (Produto Mínimo Viável - MVP): Concentrou-se no estabelecimento da infraestrutura básica, implementação da autenticação JWT e construção da tela de painel de controle (Dashboard).
b) Sprint 2 (MVP): Dedicou-se à modelagem e persistência de dados, desenvolvimento do CRUD de despesas e categorias, além da consolidação da comunicação entre o frontend e o backend.
c) Sprint 3: Focou na elaboração de relatórios dinâmicos, rotinas automáticas de alertas, simulação de algoritmos de inteligência artificial para geração de conselhos financeiros, execução de testes automatizados ponta a ponta (E2E) e elaboração da documentação técnica.

A rastreabilidade dos requisitos e o monitoramento do progresso foram mantidos por meio de documentos de controle e quadros de tarefas no repositório, assegurando transparência e embasamento para tomadas de decisão arquiteturais.

---

## 4.4 MODELAGEM DE BANCO DE DADOS E NOSQL

A disciplina de Modelagem de Banco de Dados orientou a estruturação da camada de persistência do sistema Conekta. Tratando-se de uma aplicação financeira, em que a precisão de cálculos, a integridade referencial e a consistência transacional são premissas inegociáveis, realizou-se um estudo comparativo pormenorizado entre os modelos Relacional (SQL) e Não-Relacional (NoSQL).

A justificativa técnica para a seleção do modelo Relacional fundamentou-se na exigência de conformidade com as propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade) e na necessidade frequente de operações de junção de tabelas e agregações matemáticas complexas para a consolidação de relatórios financeiros. Estruturas NoSQL, embora altamente escaláveis para dados não estruturados, foram consideradas inadequadas para a natureza estritamente tabular e inter-relacionada do domínio financeiro em questão.

O projeto conceitual foi elaborado por meio do Diagrama Entidade-Relacionamento (DER), mapeando cinco entidades centrais: Usuários, Categorias, Transações, Orçamentos e Alertas. A transição para o modelo lógico e físico contemplou a definição de chaves primárias e estrangeiras para garantir a integridade relacional.

Para otimizar o tempo de resposta das consultas do painel de controle, foram implementados índices compostos nas tabelas de transações e orçamentos, baseados nas chaves de busca mais frequentes (identificador do usuário e período aquisitivo). Além disso, adotou-se o tipo de dado decimal exato (com duas casas decimais) para todas as colunas monetárias, prevenindo os erros de arredondamento inerentes ao uso de tipos de ponto flutuante. A persistência física foi concretizada por meio do framework Entity Framework Core, utilizando o banco de dados relacional SQLite para facilitar a portabilidade e a execução em ambientes de avaliação.

---

## 4.5 PROGRAMAÇÃO ORIENTADA A OBJETOS COM C#

A construção da Interface de Programação de Aplicações (API REST) do sistema Conekta baseou-se nos conceitos de Programação Orientada a Objetos com a linguagem C# e o ecossistema ASP.NET Core. O objetivo acadêmico consistiu na aplicação de princípios avançados de design de software, com ênfase no encapsulamento de regras de negócio, baixo acoplamento e alta coesão.

A arquitetura do backend foi estruturada em camadas lógicas distintas:
a) Camada de Controladores (Controllers): Responsável por interceptar as requisições HTTP, realizar a validação sintática preliminar, aplicar filtros de autorização e orquestrar as respostas padronizadas da API.
b) Camada de Serviços (Services): Contém a lógica central do domínio da aplicação. É nesta camada que residem as regras corporativas complexas, como o cálculo de agregação de relatórios, a validação de limites orçamentários e a geração de alertas automáticos.
c) Camada de Repositórios (Repositories): Isola a comunicação direta com o banco de dados por meio do padrão de projeto Repository, permitindo que a camada de serviços realize consultas limpas e desacopladas da tecnologia de banco de dados subjacente.
d) Camada de Modelos e Objetos de Transferência (Models e DTOs): Separa as entidades de domínio mapeadas no banco de dados dos objetos utilizados para o tráfego de informações nas requisições e respostas HTTP, aumentando a segurança e flexibilidade da API.

A segurança da aplicação foi reforçada pela implementação de um middleware de autenticação baseado em JSON Web Tokens (JWT), assegurando que apenas requisições contendo tokens válidos e não expirados tenham acesso aos dados financeiros. As validações de integridade de domínio foram automatizadas por meio da biblioteca FluentValidation, garantindo a consistência das entidades antes de qualquer transação de persistência.

---

## 4.6 UX E UI DESIGN

A disciplina de UX e UI Design norteou o desenvolvimento da experiência do usuário e a interface visual do sistema. A metodologia adotada priorizou a compreensão empática do público-alvo e a criação de uma interface intuitiva, ergonômica e esteticamente sofisticada.

A fase de pesquisa em Experiência do Usuário (UX) envolveu a elaboração de três Personas detalhadas, representando os principais perfis de usuários da plataforma: o estudante universitário com dificuldades de organização, o trabalhador autônomo focado no controle de fluxo de caixa e a jovem profissional interessada em planejamento e investimentos. Para cada persona, foram desenvolvidos Mapas de Empatia, mapeamentos de jornada e análises de tarefas.

Com base nas pesquisas de UX, foi concebido o Design System oficial do projeto, estabelecendo diretrizes claras para a Interface do Usuário (UI):
a) Cores e Semântica: Definição do verde floresta como cor primária, transmitindo segurança e crescimento financeiro; utilização do tom teal para botões de ação principal; padronização de cores de status em tons de âmbar para advertências e vermelho para erros ou despesas elevadas.
b) Tipografia e Hierarquia: Seleção da fonte serifada DM Serif Display para cabeçalhos e títulos de destaque, conferindo elegância editorial, combinada com a fonte sem serifa DM Sans para o corpo de texto e exibições numéricas, garantindo excelente legibilidade.
c) Padronização de Componentes: Criação de especificações rigorosas para o estado visual e interativo de botões, campos de entrada de dados, janelas modais e cartões informativos, garantindo que o usuário encontre consistência de navegação em todas as telas do sistema.

---

## 4.7 MACHINE LEARNING E ANÁLISE DE DADOS

A inserção da disciplina de Machine Learning e Análise de Dados teve como propósito capacitar o sistema a transformar o volume de transações financeiras brutas em informações estratégicas e preditivas para auxiliar a tomada de decisão do usuário.

No escopo da Análise de Dados, o backend foi equipado com serviços dedicados à consolidação de indicadores-chave de desempenho (KPIs). Rotinas de agregação processam o histórico financeiro para apresentar, em tempo real, o somatório total de despesas, o saldo remanescente frente às receitas cadastradas, a identificação automática do maior gasto individual e o traçado da curva de tendência de consumo referente aos últimos seis meses.

No que tange aos conceitos de Machine Learning, implementou-se um mecanismo de Inteligência Artificial Simulada voltado para a geração de conselhos proativos (Insights). Este módulo opera inspecionando continuamente o padrão de despesas do usuário sob dois prismas:
a) Detecção de Anomalias: Algoritmos de monitoramento identificam transações singulares que destoem significativamente da média habitual de gastos do usuário (como despesas imprevistas superiores a determinado limiar), gerando notificações de alerta imediato.
b) Recomendações de Otimização: O sistema calcula o percentual de comprometimento de renda por categoria de gasto. Caso seja detectado que categorias de consumo flexível, como lazer ou alimentação em restaurantes, ultrapassem a margem recomendada de quarenta por cento do orçamento mensal, o sistema gera automaticamente sugestões personalizadas de readequação financeira e metas sugeridas de economia.

---

## 4.8 COMUNICAÇÃO, LIDERANÇA E NEGOCIAÇÃO

A disciplina de Comunicação, Liderança e Negociação forneceu o arcabouço conceitual para a governança do projeto, gestão de conflitos, tomada de decisão técnica e relacionamento interpessoal dentro do ambiente simulado da Software House Conekta.

A organização da equipe técnica pautou-se na atribuição clara de papéis e responsabilidades. O Líder Técnico (Tech Lead) assumiu a responsabilidade pelas definições arquiteturais, revisão de padrões de código e condução da integração contínua do sistema. O Dono do Produto (Product Owner) gerenciou a comunicação e negociação de escopo com os *stakeholders* fictícios, mantendo o foco na entrega de valor e na priorização das funcionalidades essenciais para o Produto Mínimo Viável.

Os processos de negociação de escopo foram documentados formalmente por meio de Registros de Decisão Arquitetural (ADRs). Questões como o adiamento da funcionalidade de criação de categorias personalizadas para versões futuras e a escolha de um banco de dados embutido foram debatidas e acordadas visando assegurar o cumprimento do cronograma de entrega sem comprometer a estabilidade do sistema.

A padronização da comunicação interna e da gestão da qualidade foi materializada por meio da criação de guias e artefatos de governança, incluindo manuais passo a passo para a execução de testes ponta a ponta, procedimentos padronizados para o relato e classificação de falhas de software e checklists de validação de critérios de aceitação.

---

## 4.9 LÍNGUA BRASILEIRA DE SINAIS (LIBRAS) E ACESSIBILIDADE

A disciplina de Língua Brasileira de Sinais (LIBRAS) promoveu a conscientização e a aplicação prática de diretrizes de acessibilidade e inclusão digital no desenvolvimento de software, garantindo que a plataforma Conekta seja plenamente utilizável por cidadãos com deficiências sensoriais ou limitações motoras.

A acessibilidade foi enquadrada como um Requisito Não-Funcional de prioridade máxima. No desenvolvimento da interface web, aplicaram-se rigorosamente as diretrizes de acessibilidade do consórcio W3C (WCAG 2.1 - Nível AA):
a) Semântica e Assistência Tecnológica: Utilização estrita de marcação HTML5 semântica para definir seções de navegação, conteúdo principal e rodapés. Implementou-se uma extensa camada de atributos semânticos ARIA (Accessible Rich Internet Applications), permitindo que leitores de tela populares transmitam corretamente o propósito de botões iconográficos e anunciem dinamicamente o surgimento de mensagens de erro ou sucesso sem a necessidade de recarregar a página.
b) Ergonomia Motor e Teclado: A interface foi inteiramente adaptada para navegação exclusiva por teclado. Implementaram-se atalhos de navegação para salto direto ao conteúdo principal e lógicas de aprisionamento de foco (Focus Trap) em janelas modais, impedindo que o usuário se perca nos elementos de fundo enquanto preenche um formulário de despesa.
c) Contraste Visual: As cores da aplicação foram submetidas a testes de rácio de contraste, assegurando o cumprimento da proporção mínima exigida por norma para garantir a legibilidade por pessoas com daltonismo ou baixa visão.

No que concerne especificamente à Língua Brasileira de Sinais, o projeto adotou uma abordagem de especificação arquitetural conceitual. A documentação do sistema prevê e detalha o modelo de integração da plataforma com ferramentas assistivas de tradução automática baseadas em avatares tridimensionais. O documento técnico especifica como essas ferramentas interpretam a árvore estrutural e os atributos semânticos da página web para realizar a tradução fidedigna do conteúdo financeiro para a LIBRAS, promovendo a inclusão efetiva da comunidade surda.

---

## 4.10 SÍNTESE DA CORRELAÇÃO CURRICULAR E REQUISITOS

A articulação entre as disciplinas acadêmicas e os requisitos técnicos do projeto Conekta evidencia a completude da solução desenvolvida. A interface web responsiva atende aos requisitos de apresentação e usabilidade em múltiplos dispositivos; a modelagem relacional e a programação em C# sustentam a integridade e a lógica das transações financeiras; as práticas de UX e análise de dados agregam valor estratégico ao usuário final; enquanto a governança ágil e as diretrizes de acessibilidade garantem a qualidade do processo de desenvolvimento e a responsabilidade social do software entregue. Desta forma, o sistema consolida com êxito os objetivos pedagógicos estipulados para o Projeto Integrador Multidisciplinar.
