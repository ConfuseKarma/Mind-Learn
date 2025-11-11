# **Projeto Network Dashboard** - **Relatório de Engenharia de Software**
 
## 1. **Introdução e Contexto**
 
O projeto **Network Dashboard** é uma aplicação web desenvolvida no contexto interdisciplinar que integra **Engenharia de Software**, **Gestão de Projetos** e **Redes de Computadores**. O sistema consiste em um **dashboard de monitoramento e documentação** para a infraestrutura de rede distribuída implementada no projeto de Redes, onde cada grupo representou um estado brasileiro e nosso grupo foi responsável pelo **Estado do Amapá (AP)**. A aplicação permite **cadastrar, visualizar e gerenciar** dispositivos de rede, sub-redes e conexões, refletindo fielmente a topologia de rede real implementada.
 
## 2. **Objetivos do Documento**
 
O objetivo deste relatório é **documentar de forma estruturada** o processo de engenharia de software aplicado ao desenvolvimento do Network Dashboard, destacando a **adoção de metodologias ágeis**, a **definição dos requisitos**, a **modelagem arquitetural** e as **práticas de testes**. O documento também busca demonstrar a **integração prática com o projeto de Redes**, evidenciando como o software reflete a infraestrutura de rede real implementada para o Estado do Amapá.
 
## 3. **Metodologias Ágeis Estudadas**
 
Durante o planejamento do projeto, foram estudadas diferentes **abordagens ágeis**: **Scrum**, **Kanban**, **SAFe** e **XP (Extreme Programming)**. O grupo optou pela aplicação de um **Scrum adaptado**, adequado à realidade acadêmica e à **curta duração do projeto (3 meses)**. No entanto, também foram analisadas as demais metodologias e como poderiam ser aplicadas ao Network Dashboard:
 
- **Scrum**: **Adotado como base do projeto**, com **quatro sprints principais**, **backlog priorizado** e **reuniões semanais**. O **Product Owner** define as funcionalidades prioritárias, enquanto os demais membros executam as tarefas e revisam o progresso.
- **Kanban**: Poderia ser aplicado para **controle visual contínuo** de tarefas e fluxos de trabalho, ideal em **fases de manutenção**.
- **SAFe**: Indicaria uma **escalabilidade maior** do projeto, permitindo a coordenação de **múltiplos times** caso o Network Dashboard fosse expandido.
- **XP (Extreme Programming)**: Reforçaria **boas práticas de codificação** e **testes automatizados**, sendo parcialmente incorporado na rotina do time.
 
## 4. **Time Scrum e Papéis**
 
| **Integrante** | **Papel no Scrum** | **Responsabilidades Principais** |
|----------------|-------------------|----------------------------------|
| **Guilherme** | **Product Owner** | Definição de requisitos, priorização do backlog, validação das entregas com stakeholders |
| **Kauê** | **Scrum Master** | Facilitação das cerimônias, remoção de impedimentos, garantia do processo ágil |
| **Marcos** | **Desenvolvedor Full Stack** | Implementação frontend e backend, integração de APIs, banco de dados |
| **Roger** | **Desenvolvedor Full Stack** | Desenvolvimento de funcionalidades, testes, documentação técnica |
 
## 5. **Quadro de Tarefas e Backlog**
 
**Link do Trello:** [INSERIR_LINK_DO_TRELLO_AQUI]
**Link do GitHub Projects:** [INSERIR_LINK_DO_GITHUB_AQUI]
 
O backlog foi gerenciado através de **histórias de usuário** priorizadas, seguindo a estrutura:
- **Épico:** Gestão de Infraestrutura de Rede
- **Feature:** Monitoramento do Estado do Amapá
- **Histórias:** Funcionalidades específicas de cadastro e visualização
 
## 6. **Histórias de Usuário**
 
### **⭐ Como administrador de rede, eu quero...**
- **HU01:** Cadastrar dispositivos de rede com nome, IP, gateway e tipo
- **HU02:** Visualizar todos os dispositivos do Estado do Amapá em um dashboard
- **HU03:** Gerenciar sub-redes com faixa de IPs, máscara e gateway padrão
- **HU04:** Registrar conexões entre dispositivos e caminhos principais/alternativos
- **HU05:** Simular status de dispositivos (Ativo/Inativo) para testes
- **HU06:** Gerar relatórios de quantidade de dispositivos e sub-redes cadastradas
- **HU07:** Visualizar a integração da rede do Amapá com São Paulo (saída para internet)
 
## 7. **Engenharia de Requisitos**
 
### 7.1 **Requisitos Funcionais**
 
- **RF01:** O sistema deve permitir o **cadastro de dispositivos** com nome, IP, gateway e tipo (roteador, switch, host)
- **RF02:** O sistema deve permitir o **gerenciamento de sub-redes** com faixa de IPs, máscara e gateway padrão
- **RF03:** O sistema deve registrar **conexões entre dispositivos** e caminhos principais/alternativos
- **RF04:** O sistema deve simular **status de dispositivos** (Ativo/Inativo)
- **RF05:** O sistema deve gerar **relatórios** de quantidade de dispositivos e sub-redes
- **RF06:** O sistema deve visualizar a **integração entre estados** (Amapá → São Paulo)
 
### 7.2 **Requisitos Não Funcionais**
 
- **RNF01:** O sistema deve ser **responsivo e acessível** em múltiplos dispositivos
- **RNF02:** O backend deve estar **containerizado em Docker** para fácil replicação
- **RNF03:** O **tempo de resposta das APIs** deve ser inferior a **2 segundos**
- **RNF04:** Os dados devem ser armazenados em **banco relacional seguro (PostgreSQL)**
- **RNF05:** O sistema deve suportar **visualização em tempo real** do status da rede
 
## 8. **Protótipo de Interface**
 
**Link do Protótipo:** [INSERIR_LINK_DO_FIGMA_AQUI]
 
O protótipo inclui:
- **Dashboard principal** com visão geral da rede do Amapá
- **Tela de cadastro** de dispositivos e sub-redes
- **Visualização de topologia** mostrando conexões entre estados
- **Relatórios e métricas** da infraestrutura
- **Painel de status** em tempo real
 
## 9. **Planejamento de Desenvolvimento (Sprints)**
 
O projeto foi dividido em **quatro sprints principais**, com duração média de **três semanas cada**, alinhado aos **marcos de validação** estabelecidos pela professora.
 
### **Cronograma Detalhado de Sprints**
 
| **Sprint** | **Período** | **Principais Entregas** | **Marco de Validação** | **Status** |
|------------|-------------|-------------------------|----------------------|------------|
| **Sprint 0** | Setembro (1ª-2ª semana) | **Levantamento de requisitos**, **histórias de usuário**, **protótipo de interface**, **quadro de tarefas** | **Marco 1** - Link do quadro e protótipo | ✅ Concluído |
| **Sprint 1** | Setembro (3ª-4ª semana) | **Estrutura do frontend React**, **setup do backend Node.js**, **configuração Docker**, **banco PostgreSQL** | - | ✅ Concluído |
| **Sprint 2** | Outubro (1ª-3ª semana) | **CRUD de dispositivos**, **cadastro de sub-redes**, **API REST**, **UI responsiva** | **Marco 2** - Protótipo funcional mínimo | ✅ Concluído |
| **Sprint 3** | Outubro (4ª) - Novembro (1ª) | **Sistema de conexões**, **visualização de topologia**, **status de dispositivos**, **testes unitários** | - | 🟡 Em Andamento |
| **Sprint 4** | Novembro (2ª-4ª semana) | **Relatórios**, **integração com rede real**, **testes finais**, **documentação**, **preparação apresentação** | **Entrega Final** - Pitch técnico e pacote completo | ⏳ Planejado |
 
## 10. **Arquitetura Técnica**
 
A arquitetura do Network Dashboard é composta por um **frontend em React (Vite + TypeScript)** e um **backend em Node.js (Express + TypeORM)**, integrados a um **banco de dados PostgreSQL** em contêiner **Docker**. A infraestrutura utiliza **Docker Compose para orquestração**, permitindo **fácil implantação** e **isolamento dos serviços**.
 
## 11. **Integração com Projeto de Redes - Estado do Amapá**
 
### 11.1 **Contexto da Rede Real**
No projeto de Redes de Computadores, nosso grupo foi responsável pela **infraestrutura do Estado do Amapá (AP)**, que incluía:
- **Roteadores principais** em Macapá e Santana
- **Switches** distribuídos nas principais cidades
- **Conexão com Pará** como link primário
- **Conexão direta com São Paulo** como backup
- **Sub-redes** para diferentes segmentos (administrativo, educacional, comercial)
 
### 11.2 **Reflexão no Software**
O Network Dashboard reflete fielmente esta infraestrutura através de:
- **Cadastro de todos os dispositivos** reais implementados no Amapá
- **Mapa de conexões** mostrando os links com Pará e São Paulo
- **Status em tempo real** da conectividade entre estados
- **Visualização hierárquica** da topologia de rede
- **Simulação de falhas** e caminhos alternativos
 
### 11.3 **Trabalho Colaborativo entre Estados**
O desenvolvimento exigiu **integração contínua** com outros grupos para:
- **Padronização** de endereçamento IP entre estados
- **Documentação compartilhada** das interconexões
- **Testes de conectividade** entre Amapá e São Paulo
- **Validação da saída para internet** através do roteador principal em SP
 
## 12. **Gestão do Projeto e Interdisciplinaridade**
 
O projeto foi desenvolvido de forma **interdisciplinar**, integrando conteúdos das disciplinas de **Engenharia de Software**, **Gestão de Projetos** e **Redes de Computadores**.
 
- **Engenharia de Software**: Aplicação do processo essencial, metodologias ágeis, engenharia de requisitos e práticas de desenvolvimento
- **Gestão de Projetos**: Organização de cronograma, alocação de recursos, gestão de riscos e acompanhamento de marcos
- **Redes de Computadores**: Implementação da infraestrutura real do Amapá, configuração de dispositivos, e garantia da conectividade entre estados
 
## 13. **Testes e Validação**
 
Foram aplicados **testes unitários**, **de integração** e **funcionais**, utilizando **Jest** e **Postman**. Além disso, os **testes de rede** foram realizados com **Docker Network Inspect** e **validação com a infraestrutura real**.
 
| Funcionalidade | Tipo de Teste | Ferramenta | Resultado |
|----------------|---------------|------------|-----------|
| **Cadastro de dispositivos** | Unitário | Jest | **Sucesso** |
| **CRUD de sub-redes** | Integração | Jest + Supertest | **Sucesso** |
| **API de conexões** | API | Postman | **Sucesso** |
| **Visualização de topologia** | Funcional | Jest | **Sucesso** |
| **Integração com rede real** | Validação | Ping/Traceroute | **Sucesso** |
 
## 14. **Retrospectiva e Aprendizados**
 
### **O que funcionou bem:**
- **Scrum adaptado** mostrou-se eficiente para o contexto acadêmico
- **Integração contínua** entre as disciplinas enriqueceu o aprendizado
- **Trabalho em equipe** na implementação da rede real do Amapá
- **Uso de Docker** facilitou o desenvolvimento e replicação
 
### **O que poderia ser melhorado:**
- **Comunicação mais frequente** com outros grupos de estados
- **Documentação mais detalhada** das interfaces entre sistemas
- **Testes automatizados** mais abrangentes
 
### **Principais Aprendizados:**
- **Importância da padronização** em projetos distribuídos
- **Valor da integração** entre software e infraestrutura
- **Eficácia das metodologias ágeis** em prazos curtos
- **Complexidade da gestão** de redes distintas, multi-estaduais
 
## 15. **Preparação para Apresentação Final**

### **Pitch Técnico (10 minutos)**
- **Demonstração da aplicação** funcional
- **Explicação do processo** de desenvolvimento
- **Conexão com outras disciplinas**
- **Reflexão sobre aprendizados**
- **Demonstração da integração de rede** Amapá-São Paulo (saída de internet)
 
### **Pacote de Documentação**
- **Aplicação funcional** com código-fonte
- **Artefatos do processo** (requisitos, protótipos, backlog)
- **Relatório de testes** completo
- **Ata da retrospectiva**
- **Instruções de execução**
 
## 16. **Referências**
 
- Pressman, R. S. **Engenharia de Software: Uma Abordagem Profissional**. McGraw-Hill, 9ª ed.
- Sommerville, I. **Engenharia de Software**. Pearson, 10ª ed.
- **Scaled Agile Framework (SAFe). Program Increment Planning**. 2024.
- **Docker Documentation. Docker Compose and Networking**. 2025.
- **React & Node.js Official Documentation**. 2025.
- **IEEE 830-1998** — Software Requirements Specification (SRS) Standard.
- **Documentação do Projeto de Redes** - Infraestrutura do Estado do Amapá
