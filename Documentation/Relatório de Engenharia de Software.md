# **Projeto Mind&Learn** - **Relatório de Engenharia de Software**

## Integrantes
Guilherme Rodrigues dos Santos, RA: 081220010

Kauê de Souza Silva, RA: 081220003

Marcos Felipe Correa Soares, RA: 081220020

Roger Freitas Pereira RA: 081220023

## 1. **Introdução e Contexto**

O projeto **Mind&Learn** é uma aplicação educacional voltada ao **combate ao analfabetismo funcional no Brasil**, propondo um **ambiente digital gamificado** de aprendizado por meio de **quizzes e exercícios interativos**. Este relatório aborda especificamente os aspectos de **Engenharia de Software** do projeto, evidenciando o uso de **metodologias ágeis**, **planejamento de sprints**, **requisitos**, **arquitetura técnica**, **testes** e **integração interdisciplinar**. O foco é demonstrar a **aplicação prática dos conceitos teóricos** da disciplina, bem como o domínio das **etapas essenciais** de um processo moderno de desenvolvimento de software.

## 2. **Objetivos do Documento**

O objetivo deste relatório é **documentar de forma estruturada** o processo de engenharia de software aplicado ao desenvolvimento do Mind&Learn, destacando a **adoção de metodologias ágeis**, a **definição dos requisitos**, a **modelagem arquitetural** e as **práticas de testes**. O documento também busca demonstrar a **integração do projeto com as disciplinas** de Gestão de Projetos e Redes de Computadores, evidenciando sua **natureza interdisciplinar**.

## 3. **Metodologias Ágeis Estudadas**

Durante o planejamento do projeto, foram estudadas diferentes **abordagens ágeis**: **Scrum**, **Kanban**, **SAFe** e **XP (Extreme Programming)**. O grupo optou pela aplicação de um **Scrum adaptado**, adequado à realidade acadêmica e à **curta duração do projeto (3 meses)**. No entanto, também foram analisadas as demais metodologias e como poderiam ser aplicadas ao Mind&Learn:

- **Scrum**: **Adotado como base do projeto**, com **quatro sprints principais**, **backlog priorizado** e **reuniões semanais**. O **Product Owner** define as funcionalidades prioritárias, enquanto os demais membros executam as tarefas e revisam o progresso.
- **Kanban**: Poderia ser aplicado para **controle visual contínuo** de tarefas e fluxos de trabalho, ideal em **fases de manutenção**.
- **SAFe**: Indicaria uma **escalabilidade maior** do projeto, permitindo a coordenação de **múltiplos times** caso o Mind&Learn fosse expandido.
- **XP (Extreme Programming)**: Reforçaria **boas práticas de codificação** e **testes automatizados**, sendo parcialmente incorporado na rotina do time.

## 4. **Time Scrum e Papéis**

| **Integrante** | **Papel no Scrum** | **Responsabilidades Principais** |
|----------------|-------------------|----------------------------------|
| **Guilherme** | **Product Owner** | Definição de requisitos, priorização do backlog, validação das entregas com stakeholders |
| **Kauê** | **Scrum Master** | Facilitação das cerimônias, remoção de impedimentos, garantia do processo ágil |
| **Marcos** | **Desenvolvedor Full Stack** | Implementação frontend e backend, integração de APIs, banco de dados |
| **Roger** | **Desenvolvedor Full Stack** | Desenvolvimento de funcionalidades, testes, documentação técnica |

## 5. **Backlog do Produto e Histórias de Usuário**

### 5.1 **Épicos Principais**
- **EP01**: Gerenciamento de Usuários e Autenticação
- **EP02**: Sistema de Quizzes e Exercícios
- **EP03**: Gamificação e Progresso do Aluno
- **EP04**: Painel Administrativo e Relatórios
- **EP05**: Infraestrutura e Deploy

### 5.2 **Histórias de Usuário Prioritárias**

#### **EP01 - Gerenciamento de Usuários**
**US01**: Como aluno, quero me cadastrar no sistema para acessar os quizzes
- **Critérios de Aceitação**:
  - [x] Formulário com nome, email, senha
  - [x] Validação de email único
  - [x] Confirmação por email
  - [x] Senha com mínimo 8 caracteres

**US02**: Como usuário, quero fazer login para acessar meu perfil
- **Critérios de Aceitação**:
  - [x] Autenticação com email/senha
  - [x] Token JWT válido por 24h
  - [x] Redirecionamento para dashboard
  - [x] Logout seguro

#### **EP02 - Sistema de Quizzes**
**US03**: Como aluno, quero responder quizzes para testar meu conhecimento
- **Critérios de Aceitação**:
  - [x] Interface responsiva para quizzes
  - [x] Temporizador por questão
  - [x] Feedback imediato
  - [x] Pontuação por acerto

**US04**: Como professor, quero criar quizzes para meus alunos
- **Critérios de Aceitação**:
  - [x] Editor de questões múltipla escolha
  - [x] Definição de tempo por questão
  - [x] Categorização por matéria
  - [x] Preview do quiz

#### **EP03 - Gamificação**
**US05**: Como aluno, quero ver meu progresso para me motivar
- **Critérios de Aceitação**:
  - [x] Barra de progresso visual
  - [x] Sistema de pontos
  - [x] Ranking entre colegas
  - [x] Histórico de atividades

**US06**: Como aluno, quero ganhar insígnias para comemorar conquistas
- **Critérios de Aceitação**:
  - [x] Insígnias por completar quizzes
  - [x] Insígnias por performance
  - [x] Coleção visível no perfil
  - [x] Notificação ao conquistar

## 6. **Cerimônias Scrum Implementadas**

### 6.1 **Daily Stand-up Meetings**
- **Frequência**: Diária (15 minutos)
- **Participantes**: Time completo
- **Formato**: O que fiz, o que farei, impedimentos
- **Ferramenta**: Discord

### 6.2 **Sprint Planning**
- **Frequência**: Início de cada sprint
- **Duração**: 2 horas
- **Objetivo**: Definir Sprint Backlog e tarefas
- **Entregas**: User Stories detalhadas com tasks

### 6.3 **Sprint Review**
- **Frequência**: Final de cada sprint
- **Duração**: 1 hora
- **Objetivo**: Demonstrar funcionalidades concluídas
- **Participantes**: Time completo + stakeholders

### 6.4 **Sprint Retrospective**
- **Frequência**: Final de cada sprint
- **Duração**: 45 minutos
- **Formato**: Start, Stop, Continue
- **Objetivo**: Melhoria contínua do processo

## 7. **Planejamento de Desenvolvimento (Sprints)**

O projeto foi dividido em **quatro sprints principais**, com duração média de **três semanas cada**, dentro do **Program Increment (PI) acadêmico**. Essa estrutura permitiu a **entrega incremental** das funcionalidades e a **constante revisão do escopo**. O backlog foi gerenciado via **Trello e GitHub Projects**.

### **Cronograma Detalhado de Sprints**

| **Sprint** | **Período** | **Principais Entregas** | **User Stories** | **Velocity** | **Status** |
|------------|-------------|-------------------------|------------------|--------------|------------|
| **Sprint 0** | Setembro (1ª-2ª semana) | **Levantamento de requisitos**, **reuniões com pedagogos**, **definição do MVP**, **wireframes e protótipos** | US01, US02 | - | ✅ Concluído |
| **Sprint 1** | Setembro (3ª-4ª semana) | **Estrutura do frontend React**, **setup do backend Node.js**, **configuração Docker**, **banco MariaDB** | US03, US04 | 18 pontos | ✅ Concluído |
| **Sprint 2** | Outubro (1ª-3ª semana) | **API de autenticação JWT**, **sistema de usuários**, **CRUD de quizzes**, **UI responsiva** | US05, US06 | 22 pontos | ✅ Concluído |
| **Sprint 3** | Outubro (4ª) - Novembro (1ª) | **Sistema de insígnias**, **roles (prof/aluno/admin)**, **testes unitários**, **persistência de progresso** | US07, US08 | 20 pontos | ✅ Concluído |
| **Sprint 4** | Novembro (2ª-4ª semana) | **Testes de integração**, **refinamentos de UX**, **deploy**, **documentação final**, **coleta de feedback** | US09, US10 | 25 pontos | ✅ Concluído |

## 8. **Definição de Pronto (DoD - Definition of Done)**

### 8.1 **Critérios Gerais**
- [x] Código revisado por pelo menos um outro desenvolvedor
- [x] Testes unitários implementados e passando
- [x] Integração com main branch sem conflitos
- [x] Documentação atualizada
- [x] Funcionalidade testada em ambiente de desenvolvimento

### 8.2 **Critérios Específicos por Camada**

**Frontend:**
- [x] Responsividade testada em 3 dispositivos
- [x] Acessibilidade (WCAG) verificada
- [x] Performance otimizada (Lighthouse > 90)

**Backend:**
- [x] API documentada com Swagger
- [x] Testes de integração implementados
- [x] Logs e tratamento de erros adequados

**Banco de Dados:**
- [x] Migrations versionadas
- [x] Indexes otimizados
- [x] Backup configurado

## 9. **Burndown Chart e Métricas Ágeis**

### 9.1 **Velocity Tracking**
| **Sprint** | **Pontos Planejados** | **Pontos Entregues** | **Velocity** |
|------------|----------------------|---------------------|--------------|
| **Sprint 1** | 20 | 18 | 18 |
| **Sprint 2** | 25 | 22 | 22 |
| **Sprint 3** | 23 | 20 | 20 |
| **Sprint 4** | 28 | 25 | 25 |

### 9.2 **Métricas de Qualidade**
- **Lead Time**: 4.2 dias (média)
- **Cycle Time**: 2.8 dias (média)
- **Throughput**: 5.3 tasks/semana
- **Taxa de Erro**: 12% (Sprint 1) → 4% (Sprint 4)

## 10. **Engenharia de Requisitos**

### 10.1 **Requisitos Funcionais**

- **RF01**: O sistema deve permitir o **cadastro e login de usuários**.
- **RF02**: O sistema deve **diferenciar papéis de usuário** (professor, aluno e administrador).
- **RF03**: O sistema deve permitir **responder quizzes com feedback imediato**.
- **RF04**: O sistema deve **registrar o progresso e pontuação** do usuário.
- **RF05**: O sistema deve **gerar insígnias conforme o desempenho**.

### 10.2 **Requisitos Não Funcionais**

- **RNF01**: O sistema deve ser **responsivo e acessível** em múltiplos dispositivos.
- **RNF02**: O backend deve estar **containerizado em Docker** para fácil replicação.
- **RNF03**: O **tempo de resposta das APIs** deve ser inferior a **2 segundos**.
- **RNF04**: Os dados devem ser armazenados em **banco relacional seguro (MariaDB)**.
- **RNF05**: O sistema deve suportar **autenticação segura via JWT**.

## 11. **Arquitetura Técnica**

A arquitetura do Mind&Learn é composta por um **frontend em React (Vite + TypeScript)** e um **backend em Node.js (Express + TypeORM)**, integrados a um **banco de dados MariaDB** em contêiner **Docker**. A infraestrutura utiliza **Docker Compose para orquestração**, permitindo **fácil implantação** e **isolamento dos serviços**. O **Nginx** atua como **proxy reverso**, garantindo **estabilidade** e **roteamento de requisições**.

## 12. **Integração com Redes de Computadores**

### 12.1 **Diagrama do Projeto WAN**

Vamos realizar o deploy de um projeto de rede no laboratório de redes da FESA utilizando equipamentos reais para atender aos requisitos do projeto interdisciplinar.

<img width="2181" height="1203" alt="17628680908475640479572181794773" src="https://github.com/user-attachments/assets/d9bc0ced-9cfd-4239-b579-02ec02c8bf24" />

### 12.1.1 Arquitetura Adaptada (Após consenso com equipes)

<img width="1403" height="1077" alt="image" src="https://github.com/user-attachments/assets/9e3e74d4-6f80-4c00-b6fd-f73fae0be11e" />

A topologia de rede implementada segue uma **arquitetura distribuída** onde cada roteador representa um estado diferente, interconectados através de uma **WAN (Wide Area Network)**. Esta configuração permite simular um ambiente real de implantação do Mind&Learn em múltiplas localizações geográficas.

### 12.2 **Configuração de Rede para o Mind&Learn**

Cada grupo será responsável pela configuração do roteador do respectivo estado, implementando:

- **Configurações específicas** para os switches e routers
- **Configuração e acesso** via VM Ubuntu 
- **Gateways** configurados para cada segmento de rede
- **Roteamento estático e dinâmico** entre os diferentes estados
- **VLANs** para segmentação lógica dos serviços

### 12.3 **Integração com a Arquitetura de Software**

A infraestrutura de rede foi fundamental para:

- **Isolamento de serviços** através de sub-redes dedicadas
- **Comunicação segura** entre frontend, backend e banco de dados
- **Balanceamento de carga** entre múltiplas instâncias da aplicação
- **Configuração de firewall** para proteção dos endpoints da API

### 12.4 **Configurações Específicas Implementadas**

- **SANGA**: Rede 192.168.2.0/24, Gateway 192.168.2.1
- **PEDAGI**: Rede 192.168.4.0/24, Gateway 192.168.4.1  
- **ACRE**: Rede 192.168.5.0/24, Gateway 192.168.5.1
- **AVORÁ**: Rede 192.168.4.0/24, Gateway 192.168.4.1
- **Interconexão** através dos roteadores SPINCHA, RAMA e NOVA

## 13. **Gestão do Projeto e Interdisciplinaridade**

O projeto foi desenvolvido de forma **interdisciplinar**, integrando conteúdos das disciplinas de **Engenharia de Software**, **Gestão de Projetos** e **Redes de Computadores**. Enquanto a **Engenharia de Software** abordou os métodos e requisitos técnicos, **Gestão de Projetos** foi responsável pela organização de **cronograma**, **orçamento** e **recursos**. Já **Redes** contribuiu com a **estrutura de comunicação entre os contêineres Docker**, a **configuração da topologia WAN** e a **simulação de ambientes distribuídos**, garantindo que a aplicação possa operar em um cenário real de implantação multi-localidade.

## 14. **Testes e Validação**

Foram aplicados **testes unitários**, **de integração** e **funcionais**, utilizando **Jest** e **Postman**. Além disso, os **testes de rede** foram realizados com **Docker Network Inspect**, **ping entre sub-redes** e **simulações locais de múltiplos usuários**. A seguir, apresenta-se uma síntese dos resultados obtidos:

| Funcionalidade | Tipo de Teste | Ferramenta | Resultado |
|----------------|---------------|------------|-----------|
| **Autenticação JWT** | API | Postman | **Sucesso** |
| **Criação de usuário** | Unitário | Jest | **Sucesso** |
| **CRUD de quizzes** | Integração | Jest + Supertest | **Sucesso** |
| **Persistência de progresso** | Funcional | Jest | **Sucesso** |
| **UI responsiva** | Manual | Browser | **Sucesso** |
| **Comunicação entre sub-redes** | Rede | Ping/Traceroute | **Sucesso** |
| **Conectividade WAN** | Rede | Telnet/SSH | **Sucesso** |

## 15. **Lições Aprendidas no Processo Ágil**

### 15.1 **O Que Funcionou Bem**
- **Daily Stand-ups**: Mantiveram o time alinhado e identificaram impedimentos rapidamente
- **Sprint Reviews**: Feedback constante dos stakeholders
- **User Stories**: Clareza nos requisitos e critérios de aceitação
- **Definition of Done**: Qualidade consistente nas entregas

### 15.2 **Desafios e Melhorias**
- **Estimativas**: Subestimação inicial da complexidade técnica
- **Refinamento**: Necessidade de mais tempo para refinamento do backlog
- **Dívida Técnica**: Acúmulo que impactou velocidade nas sprints finais
- **Comunicação**: Melhoria na documentação de decisões técnicas

## 16. **Histórico de Status Report**

- 14/10
- 21/10
- 04/11

## 17. **Reflexão Crítica e Conclusão**

O desenvolvimento do Mind&Learn consolidou os aprendizados sobre **processos ágeis**, **engenharia de requisitos**, **arquitetura de software** e **integração contínua**. O uso do **Scrum adaptado** mostrou-se **eficiente para um contexto acadêmico**, promovendo **colaboração** e **entrega incremental**. A **aplicação prática de metodologias ágeis**, em conjunto com **ferramentas modernas** como **Docker**, **GitHub** e **React**, demonstrou a **importância de uma abordagem estruturada e técnica** para o sucesso de projetos reais de software.

A **integração com Redes de Computadores** foi particularmente valiosa, pois permitiu compreender na prática como os **conceitos de roteamento, sub-redes e topologias WAN** impactam diretamente a implantação e performance de aplicações distribuídas. A configuração hands-on dos equipamentos de rede no laboratório da FESA proporcionou uma experiência próxima da realidade corporativa, fortalecendo a formação técnica multidisciplinar.

## 18. **Referências**

- Pressman, R. S. **Engenharia de Software: Uma Abordagem Profissional**. McGraw-Hill, 9ª ed.
- Sommerville, I. **Engenharia de Software**. Pearson, 10ª ed.
- **Scaled Agile Framework (SAFe). Program Increment Planning**. 2024.
- **Docker Documentation. Docker Compose and Networking**. 2025.
- **React & Node.js Official Documentation**. 2025.
- **IEEE 830-1998** — Software Requirements Specification (SRS) Standard.
- Tanenbaum, A. S. **Redes de Computadores**. Elsevier, 5ª ed.
- **Cisco Networking Academy**. CCNA Routing and Switching.
- Schwaber, K.; Sutherland, J. **The Scrum Guide**. 2020.
- Cohn, M. **User Stories Applied: For Agile Software Development**. Addison-Wesley.

