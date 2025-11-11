# **Projeto Mind&Learn** - **Relatório de Gestão de Projetos**

## 1. **Introdução**

Este relatório apresenta a gestão do projeto **Mind&Learn**, uma aplicação educacional gamificada desenvolvida para combater o analfabetismo funcional no Brasil. O documento aborda os aspectos de **Gestão de Projetos** conforme as melhores práticas do **PMBOK**, com foco especial no **monitoramento e controle**, **gerenciamento de qualidade**, **gestão de riscos** e **análise de desempenho** do projeto.

## 2. **Metodologia de Gestão**

### 2.1 **Abordagem Híbrida PMBOK-Scrum**
O projeto adotou uma abordagem híbrida, combinando a estruturação do **PMBOK** com a flexibilidade do **Scrum**:

- **Fases de Iniciação e Planejamento**: Baseadas no PMBOK
- **Execução e Controle**: Utilizando framework Scrum adaptado
- **Monitoramento**: Integrando cerimônias ágeis com métricas tradicionais de projetos

### 2.2 **Triângulo de Ferro do Projeto**

| **Dimensão** | **Planejado** | **Realizado** | **Variação** |
|--------------|---------------|---------------|--------------|
| **Escopo** | 100% (MVP completo) | ~85% (em ajustes) | -15% |
| **Prazo** | 12 semanas | 14 semanas (projetado) | +16.7% |
| **Custo** | R$ 0 (recursos acadêmicos) | R$ 0 | 0% |

## 3. **Planejamento Detalhado do Projeto**

### 3.1 **Estrutura Analítica do Projeto (EAP)**

1.0 Mind&Learn
├──1.1 Gestão do Projeto  
├──1.2 Desenvolvimento Frontend  
├──1.3 Desenvolvimento Backend  
├──1.4 Infraestrutura e Deploy  
├──1.5 Qualidade e Testes  
└──1.6 Documentação  

### 3.2 **Cronograma Base vs Real**

| **Marco** | **Data Planejada** | **Data Real** | **Status** | **Observações** |
|-----------|-------------------|---------------|------------|-----------------|
| **Kick-off** | 01/09 | 01/09 | ✅ | Concluído conforme planejado |
| **Sprint 1** | 15/09 | 22/09 | ⚠️ | Atraso de 7 dias - dificuldades com Docker |
| **Sprint 2** | 06/10 | 15/10 | ⚠️ | Atraso de 9 dias - problemas de integração API |
| **Sprint 3** | 27/10 | 04/11 | ⚠️ | Atraso de 8 dias - complexidade do sistema de insígnias |
| **Sprint 4** | 17/11 | 25/11 | 🔄 | Em andamento com ajustes de escopo |

## 4. **Monitoramento e Controle**

### 4.1 **Status Reports Detalhados**

#### **Status Report - 14/10**
**Progresso**: 30%  
**Situação**: No prazo, mas com desafios técnicos emergentes

**Principais Realizações:**
- ✅ Prototipagem completa no Figma
- ✅ Definição da identidade visual
- ✅ Estabelecimento da arquitetura técnica

**Desafios Identificados:**
- 🔴 Dificuldade na integração UI/UX com limitações do React/TypeScript
- 🟡 Necessidade de ajustes no design para viabilidade técnica
- 🟢 Comunicação da equipe funcionando adequadamente

**Ações Corretivas Implementadas:**
- Realização de sessões de pair programming para alinhamento técnico
- Revisão dos wireframes com foco na implementabilidade
- Estabelecimento de padrões de código compartilhados

#### **Status Report - 21/10**
**Progresso**: 40%  
**Situação**: Em atraso, requerendo replanejamento

**Principais Realizações:**
- ✅ Transição do design Figma para desenvolvimento
- ✅ Estruturação das telas principais
- ✅ Base do frontend estabelecida

**Desvios Críticos:**
- 🔴 Atraso de 10 dias no cronograma
- 🔴 MVP não completo conforme planejado
- 🟡 Dificuldades persistentes com integração frontend-backend

**Análise de Causa Raiz (Diagrama de Ishikawa):**
- **Método**: Curva de aprendizado com TypeScript
- **Mão de obra**: Conflitos de agenda entre membros
- **Máquina**: Problemas de configuração do ambiente Docker
- **Material**: Documentação técnica insuficiente

**Plano de Recuperação:**
- Replanejamento das sprints com foco nas funcionalidades críticas
- Implementação de daily meetings mais focadas
- Redução de escopo não essencial

#### **Status Report - 04/11**
**Progresso**: 60%  
**Situação**: Recuperação em andamento, progresso significativo

**Principais Realizações:**
- ✅ Login funcional com banco de dados
- ✅ Sistema de usuários operacional
- ✅ API de verificação implementada
- ✅ Sistema de insígnias em desenvolvimento

**Indicadores de Recuperação:**
- 🟢 Velocidade da equipe aumentou em 25%
- 🟢 Bloqueios técnicos sendo resolvidos
- 🟡 Atraso reduzido de 40% para 25%

**Lições Aprendidas:**
- Investimento em setup do ambiente compensa a longo prazo
- Prototipagem detalhada reduz retrabalho no desenvolvimento
- Comunicação constante é crucial para integração frontend-backend

### 4.2 **Métricas de Desempenho**

#### **Earned Value Analysis (EVA)**
- **PV (Planned Value)**: R$ 60.000 (valor planejado para 60% do projeto)
- **EV (Earned Value)**: R$ 48.000 (valor agregado real)
- **AC (Actual Cost)**: R$ 52.000 (esforço aplicado)
- **CV (Cost Variance)**: -R$ 4.000 (estouro de custo)
- **SV (Schedule Variance)**: -R$ 12.000 (atraso no cronograma)

#### **Índices de Desempenho**
- **CPI (Cost Performance Index)**: 0.92 (abaixo do ideal)
- **SPI (Schedule Performance Index)**: 0.80 (necessita recuperação)

## 5. **Gerenciamento de Qualidade**

### 5.1 **Processo de Verificação e Validação**

#### **Testes Realizados por Fase**

| **Fase** | **Tipos de Teste** | **Cobertura** | **Bugs Identificados** | **Bugs Resolvidos** |
|----------|-------------------|---------------|-----------------------|---------------------|
| **Sprint 1** | Testes Unitários | 45% | 12 | 12 |
| **Sprint 2** | Testes Integração | 60% | 23 | 18 |
| **Sprint 3** | Testes Sistema | 75% | 15 | 10 |
| **Sprint 4** | Testes Aceitação | 85% | 8 | 2 |

### 5.2 **Retrabalho e Ações Corretivas**

#### **Principais Incidentes de Qualidade**

**Incidente #1 - Vazamento de Memória no Backend**
- **Detecção**: 18/10 durante testes de carga
- **Impacto**: Performance degradada com múltiplos usuários
- **Ação Corretiva**: Refatoração do gerenciamento de conexões do banco
- **Retrabalho**: 16 horas de desenvolvimento
- **Prevenção**: Implementação de monitoramento contínuo de performance

**Incidente #2 - Incompatibilidade Cross-browser**
- **Detecção**: 25/10 durante testes de usabilidade
- **Impacto**: Layout quebrado no Safari e Firefox
- **Ação Corretiva**: Ajustes CSS e polyfills
- **Retrabalho**: 12 horas de desenvolvimento
- **Prevenção**: Estabelecimento de matriz de compatibilidade obrigatória

**Incidente #3 - Falha na Persistência de Progresso**
- **Detecção**: 02/11 durante testes funcionais
- **Impacto**: Dados de progresso do usuário sendo perdidos
- **Ação Corretiva**: Correção na serialização de dados
- **Retrabalho**: 8 horas de desenvolvimento
- **Prevenção**: Revisão dos padrões de persistência

### 5.3 **Métricas de Qualidade**

| **Métrica** | **Meta** | **Atual** | **Status** |
|-------------|----------|-----------|------------|
| **Cobertura de Testes** | 90% | 75% | 🟡 |
| **Bugs Críticos** | 0 | 2 | 🔴 |
| **Debt Técnico** | < 5% | 8% | 🟡 |
| **Velocidade da Equipe** | 40 pts/sprint | 35 pts/sprint | 🟡 |

## 6. **Gerenciamento de Riscos**

### 6.1 **Matriz de Riscos Atualizada**

| **Risco** | **Probabilidade** | **Impacto** | **Status** | **Plano de Mitigação** |
|-----------|-------------------|-------------|------------|-----------------------|
| **Complexidade técnica** | Alta | Alto | 🔴 | Pair programming e revisões de código |
| **Conflitos de agenda** | Média | Médio | 🟡 | Planejamento flexível e buffers |
| **Mudanças de requisitos** | Baixa | Alto | 🟢 | Processo formal de change control |
| **Problemas de integração** | Alta | Médio | 🔴 | Ambiente de staging dedicado |

### 6.2 **Riscos Realizados e Respostas**

**Risco Realizado #1**: Dificuldades com Docker Compose
- **Impacto**: Atraso de 3 dias na Sprint 1
- **Resposta**: Consultoria com monitor da disciplina
- **Resultado**: Ambiente estabilizado com documentação

**Risco Realizado #2**: Conflito de dependências no React
- **Impacto**: 2 dias de retrabalho
- **Resposta**: Padronização de versões e lock file
- **Resultado**: Builds consistentes e reproduzíveis

## 7. **Gerenciamento de Mudanças**

### 7.1 **Change Requests Aprovados**

| **Mudança** | **Solicitante** | **Impacto** | **Status** |
|-------------|----------------|-------------|------------|
| **Adição de modo offline** | Product Owner | +2 sprints | ⏸️ Postergado |
| **Suporte a mais browsers** | Testes de Usabilidade | +1 sprint | ✅ Aprovado |
| **Sistema de notificações** | Stakeholders | +3 sprints | ❌ Rejeitado |

### 7.2 **Análise de Impacto nas Mudanças**

**Mudança Crítica**: Suporte a dispositivos móveis
- **Escopo**: +15% de funcionalidades
- **Prazo**: +10 dias
- **Recursos**: +20 horas de desenvolvimento
- **Decisão**: Aprovado com ajuste no cronograma

## 8. **Gestão de Comunicação**

### 8.1 **Matriz de Comunicação**

| **Stakeholder** | **Frequência** | **Canal** | **Responsável** |
|-----------------|----------------|-----------|-----------------|
| **Equipe de Desenvolvimento** | Diária | Daily Meeting | Scrum Master |
| **Professores** | Semanal | Status Report | Product Owner |
| **Usuários Finais** | Quinzenal | Protótipos | Time completo |
| **Coordenação** | Mensal | Apresentação | Scrum Master |

### 8.2 **Eficácia da Comunicação**

- **90%** das daily meetings realizadas conforme planejado
- **100%** dos status reports entregues no prazo
- **75%** de participação nas revisões de sprint
- **Ação Melhoria**: Implementação de canal dedicado no Discord

## 9. **Lições Aprendidas**

### 9.1 **O Que Funcionou Bem**
- **Metodologia**: Approach híbrido PMBOK-Scrum mostrou-se eficaz
- **Ferramentas**: GitHub Projects excelente para visibilidade
- **Comunicação**: Daily meetings mantiveram o time alinhado
- **Qualidade**: Investimento em testes preveniu problemas graves

### 9.2 **O Que Melhorar**
- **Estimativas**: Subestimação da complexidade técnica
- **Ambiente**: Setup inicial deveria ter mais tempo alocado
- **Integração**: Iniciar integração contínua mais cedo
- **Documentação**: Manter documentação técnica sempre atualizada

### 9.3 **Recomendações para Próximos Projetos**
1. Alocar 20% do tempo total para setup e configuração de ambiente
2. Estabelecer critérios de aceitação mais detalhados desde o início
3. Implementar integração contínua desde a primeira sprint
4. Realizar revisões de arquitetura técnica semanais

## 10. **Conclusão e Próximos Passos**

O projeto Mind&Learn, apesar dos desafios e atrasos, demonstra **recuperação consistente** e **comprometimento da equipe**. As métricas indicam **melhoria contínua** nos processos e na qualidade do produto.

**Próximas Ações Prioritárias:**
1. Conclusão do sistema de roles (professor/aluno/admin)
2. Testes de aceitação com usuários reais
3. Refinamento da experiência do usuário
4. Preparação para deploy em produção

**Previsão de Conclusão**: 25/11 (com escopo ajustado)
**Confiança na Entrega**: 85% (baseada na tendência positiva recente)

O projeto serve como **caso de estudo valioso** sobre a importância do **gerenciamento proativo** e da **adaptação contínua** em ambientes de desenvolvimento ágil.

---
**Documento preparado em conformidade com o PMBOK 7ª Edição**
**Última atualização**: 08/11/2024
**Próxima revisão**: 19/11/2024
