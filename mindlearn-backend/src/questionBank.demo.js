// questionBank.demo.js
export const demoQuestionBank = {
  themes: [
    {
      name: "Leitura Básica",
      description: "Habilidades fundamentais de leitura e compreensão de textos simples.",
      lessons: [
        {
          title: "Identificar o sujeito na frase",
          description: "Reconhecer o sujeito em frases simples do dia a dia.",
          difficulty: 1,
          questions: [
            {
              text: 'Na frase "O sol nasce a leste", qual é o sujeito?',
              options: [
                {
                  text: "O sol",
                  isCorrect: true,
                  explanation: "É o sujeito da frase, o ente de quem se fala.",
                },
                {
                  text: "nasce",
                  isCorrect: false,
                  explanation: "É o verbo que indica a ação praticada pelo sujeito.",
                },
                {
                  text: "a leste",
                  isCorrect: false,
                  explanation: "Adjunto adverbial de lugar, indicando onde o sol nasce.",
                },
              ],
            },
            {
              text: 'Na frase "Os alunos estudam para a prova", qual é o sujeito?',
              options: [
                {
                  text: "Os alunos",
                  isCorrect: true,
                  explanation: "São os agentes da ação de estudar; logo, formam o sujeito.",
                },
                {
                  text: "estudam",
                  isCorrect: false,
                  explanation: "É o verbo, indicando a ação praticada pelo sujeito.",
                },
                {
                  text: "para a prova",
                  isCorrect: false,
                  explanation: "É uma locução que indica finalidade, não o sujeito.",
                },
              ],
            },
            {
              text: 'Na frase "Choveu muito ontem", temos sujeito:',
              options: [
                {
                  text: "Indeterminado",
                  isCorrect: false,
                  explanation:
                    "Não há um agente implícito; aqui trabalhamos com sujeito inexistente.",
                },
                {
                  text: "Simples",
                  isCorrect: false,
                  explanation: "Não há termo que funcione como sujeito simples.",
                },
                {
                  text: "Inexistente",
                  isCorrect: true,
                  explanation:
                    "Verbos que indicam fenômeno da natureza, como 'chover', podem ter sujeito inexistente.",
                },
              ],
            },
          ],
        },
        {
          title: "Ideia principal do parágrafo",
          description: "Distinguir ideia principal de detalhes em pequenos textos.",
          difficulty: 2,
          questions: [
            {
              text: "O que é a ideia principal de um parágrafo?",
              options: [
                {
                  text: "O ponto central que organiza os demais detalhes.",
                  isCorrect: true,
                  explanation:
                    "A ideia principal é o núcleo de sentido que os detalhes reforçam ou explicam.",
                },
                {
                  text: "Qualquer informação presente no texto.",
                  isCorrect: false,
                  explanation:
                    "Nem toda informação é central; muitas são apenas detalhes auxiliares.",
                },
                {
                  text: "A primeira frase, obrigatoriamente.",
                  isCorrect: false,
                  explanation: "É comum estar na primeira frase, mas não é uma regra fixa.",
                },
              ],
            },
            {
              text: "Em um parágrafo, os detalhes servem para:",
              options: [
                {
                  text: "Explicar, exemplificar ou reforçar a ideia principal.",
                  isCorrect: true,
                  explanation: "Detalhes sustentam a ideia central, tornando-a mais compreensível.",
                },
                {
                  text: "Confundir o leitor com informações irrelevantes.",
                  isCorrect: false,
                  explanation: "Detalhes bem usados clarificam o texto, não o tornam confuso.",
                },
                {
                  text: "Substituir completamente a ideia principal.",
                  isCorrect: false,
                  explanation: "Os detalhes não substituem a ideia principal; eles dependem dela.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Interpretação Crítica",
      description: "Análise de intenções, opinião e inferências em textos.",
      lessons: [
        {
          title: "Intenção do autor",
          description: "Identificar o objetivo comunicativo de um texto.",
          difficulty: 2,
          questions: [
            {
              text: "Quando o autor escreve um texto opinativo em jornal, geralmente o objetivo é:",
              options: [
                {
                  text: "Defender um ponto de vista sobre determinado tema.",
                  isCorrect: true,
                  explanation:
                    "Textos opinativos se caracterizam pela defesa de uma opinião argumentada.",
                },
                {
                  text: "Relatar fatos de forma totalmente neutra.",
                  isCorrect: false,
                  explanation:
                    "Relatar fatos de forma neutra é mais típico de textos informativos.",
                },
                {
                  text: "Explicar o passo a passo de uma receita.",
                  isCorrect: false,
                  explanation:
                    "Receitas pertencem ao gênero instrucional, com outro objetivo comunicativo.",
                },
              ],
            },
            {
              text: "Em um texto de campanha de conscientização sobre reciclagem, a intenção principal tende a ser:",
              options: [
                {
                  text: "Persuadir o leitor a adotar práticas de reciclagem.",
                  isCorrect: true,
                  explanation:
                    "Campanhas de conscientização geralmente visam mudar comportamentos.",
                },
                {
                  text: "Apresentar fórmulas matemáticas relacionadas ao lixo.",
                  isCorrect: false,
                  explanation: "Fórmulas podem aparecer, mas não são o foco principal do gênero.",
                },
                {
                  text: "Narrar um conto de ficção científica.",
                  isCorrect: false,
                  explanation:
                    "Ficção científica é um gênero narrativo literário, com outro propósito.",
                },
              ],
            },
          ],
        },
        {
          title: "Inferências a partir do texto",
          description: "Ler nas entrelinhas, entendendo informações que não estão explícitas.",
          difficulty: 3,
          questions: [
            {
              text: 'Se em um texto lemos: "João chegou em casa e largou a mochila no canto, suspirando fundo", é possível inferir que:',
              options: [
                {
                  text: "João está provavelmente cansado ou preocupado.",
                  isCorrect: true,
                  explanation:
                    "O gesto de largar a mochila e suspirar indica cansaço ou preocupação.",
                },
                {
                  text: "João está comemorando uma boa notícia.",
                  isCorrect: false,
                  explanation: "Não há nenhum indício de comemoração nessa descrição.",
                },
                {
                  text: "João está estudando para uma prova.",
                  isCorrect: false,
                  explanation:
                    "A frase não traz elementos suficientes para essa conclusão específica.",
                },
              ],
            },
            {
              text: 'Ao ler "A loja ficou vazia depois da notícia", podemos inferir que:',
              options: [
                {
                  text: "A notícia provavelmente assustou ou desmotivou os clientes.",
                  isCorrect: true,
                  explanation:
                    "Se a loja esvaziou após a notícia, ela teve impacto negativo no público.",
                },
                {
                  text: "A loja fechou definitivamente.",
                  isCorrect: false,
                  explanation:
                    "O texto não afirma que o fechamento foi definitivo; apenas que ficou vazia.",
                },
                {
                  text: "Novos funcionários foram contratados.",
                  isCorrect: false,
                  explanation: "Nada no trecho aponta para contratação de funcionários.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Estrutura do Texto Dissertativo",
      description: "Introdução, desenvolvimento e conclusão na produção de textos.",
      lessons: [
        {
          title: "Função da introdução",
          description: "Entender o papel da introdução dentro do texto dissertativo.",
          difficulty: 2,
          questions: [
            {
              text: "Qual é a principal função da introdução em um texto dissertativo?",
              options: [
                {
                  text: "Apresentar o tema e, muitas vezes, a tese do autor.",
                  isCorrect: true,
                  explanation:
                    "A introdução costuma contextualizar e indicar o posicionamento que será defendido.",
                },
                {
                  text: "Apresentar todos os argumentos em detalhes.",
                  isCorrect: false,
                  explanation:
                    "Argumentos detalhados pertencem ao desenvolvimento, não à introdução.",
                },
                {
                  text: "Retomar as ideias principais e finalizar o texto.",
                  isCorrect: false,
                  explanation: "Essa é a função da conclusão.",
                },
              ],
            },
            {
              text: "Assinale a alternativa que NÃO corresponde a uma característica comum da introdução:",
              options: [
                {
                  text: "Contextualizar o tema para o leitor.",
                  isCorrect: false,
                  explanation: "Contextualizar o tema é uma função típica da introdução.",
                },
                {
                  text: "Apontar a tese ou ponto de vista a ser defendido.",
                  isCorrect: false,
                  explanation:
                    "A tese frequentemente aparece na introdução em textos dissertativos.",
                },
                {
                  text: "Apresentar o desfecho da discussão.",
                  isCorrect: true,
                  explanation: "O desfecho pertence à conclusão, não à introdução.",
                },
              ],
            },
          ],
        },
        {
          title: "Desenvolvimento e argumentos",
          description: "Organizar argumentos de forma coerente e coesa no desenvolvimento.",
          difficulty: 3,
          questions: [
            {
              text: "No desenvolvimento de um texto dissertativo, é fundamental que os argumentos sejam:",
              options: [
                {
                  text: "Coerentes, bem estruturados e relacionados à tese.",
                  isCorrect: true,
                  explanation:
                    "Argumentos precisam dialogar com a tese para sustentar o ponto de vista.",
                },
                {
                  text: "Totalmente desconectados entre si, para surpreender o leitor.",
                  isCorrect: false,
                  explanation: "A falta de conexão prejudica a compreensão e a coerência.",
                },
                {
                  text: "Formados apenas por perguntas retóricas.",
                  isCorrect: false,
                  explanation:
                    "Perguntas retóricas podem ser usadas, mas não substituem argumentos bem desenvolvidos.",
                },
              ],
            },
            {
              text: "Um bom parágrafo de desenvolvimento costuma apresentar:",
              options: [
                {
                  text: "Ideia principal do parágrafo + explicação + exemplos/argumentos.",
                  isCorrect: true,
                  explanation:
                    "Essa estrutura é comum: tópico frasal + detalhamento + exemplificação.",
                },
                {
                  text: "Somente frases soltas, sem relação entre si.",
                  isCorrect: false,
                  explanation: "Frases desconexas quebram a coesão e a coerência do texto.",
                },
                {
                  text: "A conclusão de todo o texto.",
                  isCorrect: false,
                  explanation: "A conclusão geral aparece tipicamente apenas no final do texto.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Figuras de Linguagem",
      description: "Reconhecimento de metáfora, comparação, hipérbole e outras figuras.",
      lessons: [
        {
          title: "Metáfora e comparação",
          description: "Distinguir metáfora de comparação em frases simples.",
          difficulty: 2,
          questions: [
            {
              text: 'Em "Ele é um leão em campo", temos um exemplo de:',
              options: [
                {
                  text: "Metáfora",
                  isCorrect: true,
                  explanation:
                    "A frase atribui ao sujeito uma característica figurada, sem usar 'como'.",
                },
                {
                  text: "Comparação explícita",
                  isCorrect: false,
                  explanation:
                    "Na comparação, é comum o uso de conectivos como 'como', 'tal qual', etc.",
                },
                {
                  text: "Hipérbole",
                  isCorrect: false,
                  explanation:
                    "A hipérbole é um exagero, mas aqui o foco é a substituição figurada.",
                },
              ],
            },
            {
              text: 'Na frase "Ela é forte como uma rocha", temos:',
              options: [
                {
                  text: "Comparação",
                  isCorrect: true,
                  explanation: "Há comparação explícita, marcada pelo 'como' entre dois elementos.",
                },
                {
                  text: "Metáfora",
                  isCorrect: false,
                  explanation:
                    "Se fosse metáfora, a equivalência seria direta, sem o conectivo comparativo.",
                },
                {
                  text: "Ironia",
                  isCorrect: false,
                  explanation: "Não há indícios de sentido oposto ao literal, como na ironia.",
                },
              ],
            },
          ],
        },
        {
          title: "Hipérbole e eufemismo",
          description: "Reconhecer exagero e suavização de expressões.",
          difficulty: 3,
          questions: [
            {
              text: 'Na frase "Esperei uma eternidade na fila do banco", há:',
              options: [
                {
                  text: "Hipérbole",
                  isCorrect: true,
                  explanation:
                    "O termo 'eternidade' é um exagero para reforçar a sensação de demora.",
                },
                {
                  text: "Eufemismo",
                  isCorrect: false,
                  explanation: "Eufemismo suaviza uma ideia negativa; aqui, há intensificação.",
                },
                {
                  text: "Pleonasmo",
                  isCorrect: false,
                  explanation: "Pleonasmo é redundância proposital, o que não é o caso da frase.",
                },
              ],
            },
            {
              text: 'Em "Ele partiu desta para melhor", temos um exemplo de:',
              options: [
                {
                  text: "Eufemismo",
                  isCorrect: true,
                  explanation: "A expressão suaviza a ideia de morte, tornando-a menos brusca.",
                },
                {
                  text: "Hipérbole",
                  isCorrect: false,
                  explanation: "Não há exagero; há suavização da realidade dura.",
                },
                {
                  text: "Metonímia",
                  isCorrect: false,
                  explanation:
                    "Metonímia troca um termo por outro relacionado, o que não é o foco aqui.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  quizzes: [
    {
      title: "Simulado de Leitura e Interpretação 1",
      description: "Avaliação geral de leitura básica e interpretação crítica.",
      difficulty: 2,
      questions: [
        {
          text: "A função principal de um texto de campanha de conscientização é:",
          options: [
            {
              text: "Convencer o leitor a adotar determinada atitude.",
              isCorrect: true,
              explanation:
                "Campanhas de conscientização visam modificar comportamentos e atitudes.",
            },
            {
              text: "Relatar fatos de forma imparcial.",
              isCorrect: false,
              explanation:
                "Relatar fatos de forma imparcial é típico de textos jornalísticos informativos.",
            },
            {
              text: "Apresentar um enredo fictício.",
              isCorrect: false,
              explanation:
                "Enredos fictícios estão ligados a narrativas literárias, não a campanhas.",
            },
          ],
        },
        {
          text: "Quando um autor utiliza metáforas em um texto, geralmente ele pretende:",
          options: [
            {
              text: "Enriquecer o texto com sentidos figurados e expressivos.",
              isCorrect: true,
              explanation:
                "Metáforas ampliam as possibilidades de interpretação e a expressividade.",
            },
            {
              text: "Tornar o texto mais confuso e impreciso.",
              isCorrect: false,
              explanation: "Quando bem usadas, metáforas esclarecem e embelezam, não confundem.",
            },
            {
              text: "Substituir completamente o sentido literal por dados técnicos.",
              isCorrect: false,
              explanation: "Metáforas não são dados técnicos; são recursos expressivos.",
            },
          ],
        },
      ],
    },
    {
      title: "Simulado Estrutura e Figuras de Linguagem",
      description: "Teste misto sobre estrutura dissertativa e figuras de linguagem.",
      difficulty: 3,
      questions: [
        {
          text: "Em um texto dissertativo-argumentativo, a conclusão deve:",
          options: [
            {
              text: "Retomar a tese e amarrar os principais argumentos.",
              isCorrect: true,
              explanation:
                "A conclusão fecha o texto reforçando a tese e sintetizando os pontos discutidos.",
            },
            {
              text: "Introduzir um novo tema completamente diferente.",
              isCorrect: false,
              explanation: "Novo tema na conclusão quebra a unidade do texto.",
            },
            {
              text: "Apresentar unicamente citações de outros autores.",
              isCorrect: false,
              explanation: "Citações podem aparecer, mas não substituem a função conclusiva.",
            },
          ],
        },
        {
          text: 'Na frase "Ele está nas nuvens hoje", a expressão é melhor entendida como:',
          options: [
            {
              text: "Metáfora para alguém distraído ou sonhador.",
              isCorrect: true,
              explanation: "Estar 'nas nuvens' indica abstração ou distração, não posição física.",
            },
            {
              text: "Descrição literal da posição geográfica.",
              isCorrect: false,
              explanation: "Não há sentido literal aqui; trata-se de recurso figurado.",
            },
            {
              text: "Dado climático sobre o tempo.",
              isCorrect: false,
              explanation: "A frase não descreve o clima, mas o estado mental da pessoa.",
            },
          ],
        },
      ],
    },
  ],
};
