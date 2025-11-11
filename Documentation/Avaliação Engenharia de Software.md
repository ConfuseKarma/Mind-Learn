
# Projeto Mind&Learn - Relatório de Engenharia de Software
 
## 1. Introdução e Contexto
 
O projeto Mind&Learn é uma aplicação educacional voltada ao combate ao analfabetismo funcional no Brasil, propondo um ambiente digital gamificado de aprendizado por meio de quizzes e exercícios interativos. Este relatório aborda especificamente os aspectos de Engenharia de Software do projeto, evidenciando o uso de metodologias ágeis, planejamento de sprints, requisitos, arquitetura técnica, testes e integração interdisciplinar. O foco é demonstrar a aplicação prática dos conceitos teóricos da disciplina, bem como o domínio das etapas essenciais de um processo moderno de desenvolvimento de software.
 
## 2. Objetivos do Documento
 
O objetivo deste relatório é documentar de forma estruturada o processo de engenharia de software aplicado ao desenvolvimento do Mind&Learn, destacando a adoção de metodologias ágeis, a definição dos requisitos, a modelagem arquitetural e as práticas de testes. O documento também busca demonstrar a integração do projeto com as disciplinas de Gestão de Projetos e Redes de Computadores, evidenciando sua natureza interdisciplinar.
 
## 3. Metodologias Ágeis Estudadas
 
Durante o planejamento do projeto, foram estudadas diferentes abordagens ágeis: Scrum, Kanban, SAFe e XP (Extreme Programming). O grupo optou pela aplicação de um Scrum adaptado, adequado à realidade acadêmica e à curta duração do projeto (3 meses). No entanto, também foram analisadas as demais metodologias e como poderiam ser aplicadas ao Mind&Learn:
 
- **Scrum**: Adotado como base do projeto, com duas sprints principais, backlog priorizado e reuniões semanais. O Product Owner define as funcionalidades prioritárias, enquanto os demais membros executam as tarefas e revisam o progresso.
- **Kanban**: Poderia ser aplicado para controle visual contínuo de tarefas e fluxos de trabalho, ideal em fases de manutenção.
- **SAFe**: Indicaria uma escalabilidade maior do projeto, permitindo a coordenação de múltiplos times caso o Mind&Learn fosse expandido.
- **XP (Extreme Programming)**: Reforçaria boas práticas de codificação e testes automatizados, sendo parcialmente incorporado na rotina do time.
 
## 4. Planejamento de Desenvolvimento (Sprints)
 
O projeto foi dividido em dois ciclos principais (Sprints), cada um com duração de seis semanas, dentro do Program Increment (PI) acadêmico. Essa estrutura permitiu a entrega incremental das funcionalidades e a constante revisão do escopo. O backlog foi gerenciado via Trello e GitHub Projects.
 
| Sprint | Período | Principais Entregas |
|--------|---------|---------------------|
| Sprint 1 | Outubro - Início de Novembro | Estrutura do frontend em React, API de autenticação, integração inicial com banco de dados e contêiner Docker. |
| Sprint 2 | Novembro - Dezembro | Implementação de quizzes dinâmicos, sistema de insígnias, roles de usuário (professor/aluno/admin) e testes de integração. |

## 5. Engenharia de Requisitos
 
### 5.1 Requisitos Funcionais
 
- **RF01**: O sistema deve permitir o cadastro e login de usuários.
- **RF02**: O sistema deve diferenciar papéis de usuário (professor, aluno e administrador).
- **RF03**: O sistema deve permitir responder quizzes com feedback imediato.
- **RF04**: O sistema deve registrar o progresso e pontuação do usuário.
- **RF05**: O sistema deve gerar insígnias conforme o desempenho.
 
### 5.2 Requisitos Não Funcionais
 
- **RNF01**: O sistema deve ser responsivo e acessível em múltiplos dispositivos.
- **RNF02**: O backend deve estar containerizado em Docker para fácil replicação.
- **RNF03**: O tempo de resposta das APIs deve ser inferior a 2 segundos.
- **RNF04**: Os dados devem ser armazenados em banco relacional seguro (PostgreSQL).
- **RNF05**: O sistema deve suportar autenticação segura via JWT.
 
## 6. Arquitetura Técnica
 
A arquitetura do Mind&Learn é composta por um frontend em React (Vite + TypeScript) e um backend em Node.js (Express + TypeORM), integrados a um banco de dados PostgreSQL em contêiner Docker. A infraestrutura utiliza Docker Compose para orquestração, permitindo fácil implantação e isolamento dos serviços. O Nginx atua como proxy reverso, garantindo estabilidade e roteamento de requisições.
 
## 7. Gestão do Projeto e Interdisciplinaridade
 
O projeto foi desenvolvido de forma interdisciplinar, integrando conteúdos das disciplinas de Engenharia de Software, Gestão de Projetos e Redes de Computadores. Enquanto a Engenharia de Software abordou os métodos e requisitos técnicos, Gestão de Projetos foi responsável pela organização de cronograma, orçamento e recursos. Já Redes contribuiu com a estrutura de comunicação entre os contêineres Docker e a simulação de ambientes distribuídos.
 
## 8. Testes e Validação
 
Foram aplicados testes unitários, de integração e funcionais, utilizando Jest e Postman. Além disso, os testes de rede foram realizados com Docker Network Inspect e simulações locais de múltiplos usuários. A seguir, apresenta-se uma síntese dos resultados obtidos:
 
| Funcionalidade | Tipo de Teste | Ferramenta | Resultado |
|----------------|---------------|------------|-----------|
| Autenticação JWT | API | Postman | Sucesso |
| Criação de usuário | Unitário | Jest | Sucesso |
| CRUD de quizzes | Integração | Jest + Supertest | Parcial |
| Persistência de progresso | Funcional | Jest | Em andamento |
| UI responsiva | Manual | Browser | Sucesso |
 
## 9. Histórico dos Status Reports
 
- 14/10
- 21/10
- 04/11
 
## 10. Reflexão Crítica e Conclusão
 
O desenvolvimento do Mind&Learn consolidou os aprendizados sobre processos ágeis, engenharia de requisitos, arquitetura de software e integração contínua. O uso do Scrum adaptado mostrou-se eficiente para um contexto acadêmico, promovendo colaboração e entrega incremental. A aplicação prática de metodologias ágeis, em conjunto com ferramentas modernas como Docker, GitHub e React, demonstrou a importância de uma abordagem estruturada e técnica para o sucesso de projetos reais de software.
 
## 11. Referências
 
- Pressman, R. S. Engenharia de Software: Uma Abordagem Profissional. McGraw-Hill, 9ª ed.
- Sommerville, I. Engenharia de Software. Pearson, 10ª ed.
- Scaled Agile Framework (SAFe). Program Increment Planning. 2024.
- Docker Documentation. Docker Compose and Networking. 2025.
- React & Node.js Official Documentation. 2025.
- IEEE 830-1998 — Software Requirements Specification (SRS) Standard.
 
