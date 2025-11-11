# **Projeto Mind&Learn** - **Relatório de Engenharia de Software**
 
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
 
## 5. **Planejamento de Desenvolvimento (Sprints)**
 
O projeto foi dividido em **quatro sprints principais**, com duração média de **três semanas cada**, dentro do **Program Increment (PI) acadêmico**. Essa estrutura permitiu a **entrega incremental** das funcionalidades e a **constante revisão do escopo**. O backlog foi gerenciado via **Trello e GitHub Projects**.
 
### **Cronograma Detalhado de Sprints**
 
| **Sprint** | **Período** | **Principais Entregas** | **Responsáveis** | **Status** |
|------------|-------------|-------------------------|------------------|------------|
| **Sprint 0** | Setembro (1ª-2ª semana) | **Levantamento de requisitos**, **reuniões com pedagogos**, **definição do MVP**, **wireframes e protótipos** | **Todos** | ✅ Concluído |
| **Sprint 1** | Setembro (3ª-4ª semana) | **Estrutura do frontend React**, **setup do backend Node.js**, **configuração Docker**, **banco PostgreSQL** | **Marcos, Roger** | ✅ Concluído |
| **Sprint 2** | Outubro (1ª-3ª semana) | **API de autenticação JWT**, **sistema de usuários**, **CRUD de quizzes**, **UI responsiva** | **Kauê, Guilherme** | ✅ Concluído |
| **Sprint 3** | Outubro (4ª) - Novembro (1ª) | **Sistema de insígnias**, **roles (prof/aluno/admin)**, **testes unitários**, **persistência de progresso** | **Todos** | 🟡 Em Andamento |
| **Sprint 4** | Novembro (2ª-4ª semana) | **Testes de integração**, **refinamentos de UX**, **deploy**, **documentação final**, **coleta de feedback** | **Todos** | ⏳ Planejado |
 
## 6. **Engenharia de Requisitos**
 
### 6.1 **Requisitos Funcionais**
 
- **RF01**: O sistema deve permitir o **cadastro e login de usuários**.
- **RF02**: O sistema deve **diferenciar papéis de usuário** (professor, aluno e administrador).
- **RF03**: O sistema deve permitir **responder quizzes com feedback imediato**.
- **RF04**: O sistema deve **registrar o progresso e pontuação** do usuário.
- **RF05**: O sistema deve **gerar insígnias conforme o desempenho**.
 
### 6.2 **Requisitos Não Funcionais**
 
- **RNF01**: O sistema deve ser **responsivo e acessível** em múltiplos dispositivos.
- **RNF02**: O backend deve estar **containerizado em Docker** para fácil replicação.
- **RNF03**: O **tempo de resposta das APIs** deve ser inferior a **2 segundos**.
- **RNF04**: Os dados devem ser armazenados em **banco relacional seguro (PostgreSQL)**.
- **RNF05**: O sistema deve suportar **autenticação segura via JWT**.
 
## 7. **Arquitetura Técnica**
 
A arquitetura do Mind&Learn é composta por um **frontend em React (Vite + TypeScript)** e um **backend em Node.js (Express + TypeORM)**, integrados a um **banco de dados PostgreSQL** em contêiner **Docker**. A infraestrutura utiliza **Docker Compose para orquestração**, permitindo **fácil implantação** e **isolamento dos serviços**. O **Nginx** atua como **proxy reverso**, garantindo **estabilidade** e **roteamento de requisições**.
 
## 8. **Integração com Redes de Computadores**
 
### 8.1 **Diagrama do Projeto WAN**
 
Vamos realizar o deploy de um projeto de rede no laboratório de redes da FESA utilizando equipamentos reais para atender aos requisitos do projeto interdisciplinar.
 
<img width="2181" height="1203" alt="17628680908475640479572181794773" src="https://github.com/user-attachments/assets/d9bc0ced-9cfd-4239-b579-02ec02c8bf24" />

 
A topologia de rede implementada segue uma **arquitetura distribuída** onde cada roteador representa um estado diferente, interconectados através de uma **WAN (Wide Area Network)**. Esta configuração permite simular um ambiente real de implantação do Mind&Learn em múltiplas localizações geográficas.
 
### 8.2 **Configuração de Rede para o Mind&Learn**
 
Cada grupo será responsável pela configuração do roteador do respectivo estado, implementando:
 
- **Sub-redes específicas** para diferentes departamentos (SANGA, PEDAGI, ACRE, AVORÁ, etc.)
- **Gateways** configurados para cada segmento de rede
- **Roteamento estático e dinâmico** entre os diferentes estados
- **VLANs** para segmentação lógica dos serviços
 
### 8.3 **Integração com a Arquitetura de Software**
 
A infraestrutura de rede foi fundamental para:
 
- **Isolamento de serviços** através de sub-redes dedicadas
- **Comunicação segura** entre frontend, backend e banco de dados
- **Balanceamento de carga** entre múltiplas instâncias da aplicação
- **Configuração de firewall** para proteção dos endpoints da API
 
### 8.4 **Configurações Específicas Implementadas**
 
- **SANGA**: Rede 192.168.2.0/24, Gateway 192.168.2.1
- **PEDAGI**: Rede 192.168.4.0/24, Gateway 192.168.4.1  
- **ACRE**: Rede 192.168.5.0/24, Gateway 192.168.5.1
- **AVORÁ**: Rede 192.168.4.0/24, Gateway 192.168.4.1
- **Interconexão** através dos roteadores SPINCHA, RAMA e NOVA
 
## 9. **Gestão do Projeto e Interdisciplinaridade**
 
O projeto foi desenvolvido de forma **interdisciplinar**, integrando conteúdos das disciplinas de **Engenharia de Software**, **Gestão de Projetos** e **Redes de Computadores**. Enquanto a **Engenharia de Software** abordou os métodos e requisitos técnicos, **Gestão de Projetos** foi responsável pela organização de **cronograma**, **orçamento** e **recursos**. Já **Redes** contribuiu com a **estrutura de comunicação entre os contêineres Docker**, a **configuração da topologia WAN** e a **simulação de ambientes distribuídos**, garantindo que a aplicação possa operar em um cenário real de implantação multi-localidade.
 
## 10. **Testes e Validação**
 
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
 
## 11. **Histórico de Status Report**
 
- 14/10
- 21/10
- 04/11
 
## 12. **Reflexão Crítica e Conclusão**
 
O desenvolvimento do Mind&Learn consolidou os aprendizados sobre **processos ágeis**, **engenharia de requisitos**, **arquitetura de software** e **integração contínua**. O uso do **Scrum adaptado** mostrou-se **eficiente para um contexto acadêmico**, promovendo **colaboração** e **entrega incremental**. A **aplicação prática de metodologias ágeis**, em conjunto com **ferramentas modernas** como **Docker**, **GitHub** e **React**, demonstrou a **importância de uma abordagem estruturada e técnica** para o sucesso de projetos reais de software.
 
A **integração com Redes de Computadores** foi particularmente valiosa, pois permitiu compreender na prática como os **conceitos de roteamento, sub-redes e topologias WAN** impactam diretamente a implantação e performance de aplicações distribuídas. A configuração hands-on dos equipamentos de rede no laboratório da FESA proporcionou uma experiência próxima da realidade corporativa, fortalecendo a formação técnica multidisciplinar.
 
## 13. **Referências**
 
- Pressman, R. S. **Engenharia de Software: Uma Abordagem Profissional**. McGraw-Hill, 9ª ed.
- Sommerville, I. **Engenharia de Software**. Pearson, 10ª ed.
- **Scaled Agile Framework (SAFe). Program Increment Planning**. 2024.
- **Docker Documentation. Docker Compose and Networking**. 2025.
- **React & Node.js Official Documentation**. 2025.
- **IEEE 830-1998** — Software Requirements Specification (SRS) Standard.
- Tanenbaum, A. S. **Redes de Computadores**. Elsevier, 5ª ed.
- **Cisco Networking Academy**. CCNA Routing and Switching.

