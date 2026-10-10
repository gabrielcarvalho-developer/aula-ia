import type { LessonDefinition, ModuleDefinition, PublicLesson } from "@/types/learning";

export const modules: ModuleDefinition[] = [
  {
    id: "redes-neurais",
    order: 1,
    title: "Entendendo as redes neurais",
    description: "Descubra como unidades simples se conectam, fazem previsões e aprendem com exemplos.",
    accent: "violet",
  },
  {
    id: "llms",
    order: 2,
    title: "Entendendo os LLMs",
    description: "Acompanhe o caminho de uma mensagem: dos tokens até a geração da próxima palavra.",
    accent: "cyan",
  },
];

export const lessons: LessonDefinition[] = [
  {
    id: "aula-1",
    moduleId: "redes-neurais",
    order: 1,
    number: 1,
    title: "O que é um neurônio artificial?",
    shortTitle: "Neurônio artificial",
    description: "Combine pistas, pesos e uma regra de ativação para produzir uma decisão.",
    duration: "20 min",
    color: "#8b5cf6",
    steps: [
      { kind: "situation", eyebrow: "Situação inicial", title: "Você sairia de casa agora?", body: "Imagine que você precisa decidir se vai sair. Está chovendo, o horário está apertado e o compromisso é importante. Você não considera todas essas pistas com a mesma força.", highlight: "Uma decisão pode nascer da combinação de várias pistas." },
      { kind: "explanation", eyebrow: "Ideia central", title: "Entradas recebem pesos", body: "Um neurônio artificial recebe números chamados entradas. Cada entrada é multiplicada por um peso, que representa sua influência. Depois, os resultados são somados.", bullets: ["Entrada: uma informação disponível", "Peso: quanto essa informação influencia", "Soma ponderada: entradas × pesos, somadas"] },
      { kind: "visual", eyebrow: "Exemplo visual", title: "Da pista à decisão", body: "Chuva × peso da chuva + horário × peso do horário + importância × peso da importância. Uma função de ativação transforma essa soma em uma saída entre 0 e 1.", highlight: "Saída próxima de 1: forte tendência de sair. Próxima de 0: tendência de ficar." },
      { kind: "activity", eyebrow: "Cheque sua compreensão", title: "O que o peso representa?", activityId: "a1-compreensao" },
      { kind: "lab", eyebrow: "Laboratório", title: "Monte sua decisão", lab: "neuron", body: "Mova os controles para dizer quanto cada pista importa. Veja a decisão mudar na hora." },
      { kind: "explanation", eyebrow: "Mais uma camada", title: "Ativação não é opinião", body: "A função de ativação aplica uma regra matemática. Aqui usamos a sigmoide, que comprime qualquer soma para um valor entre 0 e 1. Em redes reais, outras funções também são comuns.", highlight: "O neurônio não pensa: ele transforma números seguindo uma regra." },
      { kind: "activity", eyebrow: "Desafio aplicado", title: "Siga o caminho", activityId: "a1-desafio" },
      { kind: "activity", eyebrow: "Avaliação final", title: "Preveja a mudança", activityId: "a1-final" },
      { kind: "summary", eyebrow: "Resultado e resumo", title: "Você abriu a caixa-preta", body: "Um neurônio artificial combina entradas com pesos, soma as contribuições e passa o resultado por uma função de ativação.", concepts: ["Entradas", "Pesos", "Soma ponderada", "Ativação", "Saída"] },
    ],
    activities: [
      { id: "a1-compreensao", type: "multiple-choice", question: "Em um neurônio artificial, qual é o papel de um peso?", options: ["Mostrar quanto cada entrada influencia", "Registrar o valor original da entrada", "Dar a mesma importância a todas as entradas"], correctAnswer: "Mostrar quanto cada entrada influencia", points: 30, feedbackCorrect: "Isso! Um peso aumenta, reduz ou até inverte a influência de uma entrada.", feedbackIncorrect: "O valor da entrada diz o que chegou; o peso diz quanto isso influencia." },
      { id: "a1-desafio", type: "multiple-choice", question: "Como o neurônio usa as pistas para chegar a um resultado?", options: ["Considera apenas a pista de maior valor", "Combina as pistas conforme a influência de cada uma", "Faz uma média dando o mesmo peso a todas"], correctAnswer: "Combina as pistas conforme a influência de cada uma", points: 40, feedbackCorrect: "Isso! Ele combina as pistas levando os pesos em conta.", feedbackIncorrect: "Observe no simulador que uma pista pode influenciar mais ou menos que outra." },
      { id: "a1-final", type: "multiple-choice", question: "Uma entrada positiva não mudou, mas seu peso aumentou. O que tende a acontecer com a soma?", options: ["Tende a diminuir", "Tende a permanecer igual", "Tende a aumentar"], correctAnswer: "Tende a aumentar", points: 30, feedbackCorrect: "Correto. Uma contribuição positiva fica maior quando seu peso aumenta.", feedbackIncorrect: "A contribuição depende do valor da entrada e do peso aplicado a ela." },
    ],
  },
  {
    id: "aula-2", moduleId: "redes-neurais", order: 2, number: 2,
    title: "Como os neurônios formam uma rede?", shortTitle: "Camadas e conexões",
    description: "Siga a informação por camadas e veja conexões transformarem sinais.", duration: "22 min", color: "#7c3aed",
    steps: [
      { kind: "situation", eyebrow: "Situação inicial", title: "Uma opinião raramente depende de uma só pista", body: "Para reconhecer uma música, você percebe ritmo, timbre e sequência de notas. Cada percepção ajuda outras até chegar a uma classificação." },
      { kind: "explanation", eyebrow: "Ideia central", title: "Neurônios trabalham em camadas", body: "A camada de entrada recebe os dados. Camadas ocultas combinam padrões intermediários. A camada de saída apresenta a previsão.", bullets: ["Entrada: recebe características", "Ocultas: criam combinações úteis", "Saída: produz o resultado"] },
      { kind: "visual", eyebrow: "Exemplo visual", title: "Conexões carregam influência", body: "Cada linha liga dois neurônios e possui um peso. Um mesmo sinal pode ganhar importância em uma conexão e perder em outra.", highlight: "Propagação é o avanço dos valores da entrada até a saída." },
      { kind: "activity", eyebrow: "Cheque sua compreensão", title: "Encontre a camada", activityId: "a2-compreensao" },
      { kind: "lab", eyebrow: "Laboratório", title: "Passe um sinal pela rede", lab: "network", body: "Mude duas entradas e a força das conexões. Depois, clique para ver o sinal chegar à saída." },
      { kind: "explanation", eyebrow: "Mais uma camada", title: "Mais conexões, mais combinações", body: "Uma camada oculta pode detectar combinações que nenhuma entrada isolada representa. Muitas camadas permitem representações progressivamente mais abstratas.", highlight: "Profundidade significa quantidade de camadas de transformação, não inteligência garantida." },
      { kind: "activity", eyebrow: "Desafio aplicado", title: "Siga as camadas", activityId: "a2-desafio" },
      { kind: "activity", eyebrow: "Avaliação final", title: "Rastreie a propagação", activityId: "a2-final" },
      { kind: "summary", eyebrow: "Resultado e resumo", title: "Da entrada à previsão", body: "Uma rede organiza neurônios em camadas. As conexões ponderadas propagam e transformam sinais até a saída.", concepts: ["Camada de entrada", "Camadas ocultas", "Camada de saída", "Conexões", "Propagação"] },
    ],
    activities: [
      { id: "a2-compreensao", type: "multiple-choice", question: "Qual camada reúne a previsão que queremos observar?", options: ["A camada de entrada", "Uma camada oculta", "A camada de saída"], correctAnswer: "A camada de saída", points: 30, feedbackCorrect: "Exato. A camada de saída apresenta o resultado final da rede.", feedbackIncorrect: "Pense na última etapa do caminho percorrido pela informação." },
      { id: "a2-desafio", type: "multiple-choice", question: "Qual é o caminho normal da informação em uma rede simples?", options: ["Entrada → saída → camada oculta", "Entrada → camada oculta → saída", "Camada oculta → entrada → saída"], correctAnswer: "Entrada → camada oculta → saída", points: 40, feedbackCorrect: "Boa! A informação entra, é combinada e chega à saída.", feedbackIncorrect: "Comece pela camada que recebe as informações e termine na previsão." },
      { id: "a2-final", type: "multiple-choice", question: "Se o peso de uma conexão muda, qual resultado é possível?", options: ["Somente a aparência da linha muda", "Os valores das camadas seguintes podem mudar", "Apenas a camada anterior é recalculada"], correctAnswer: "Os valores das camadas seguintes podem mudar", points: 30, feedbackCorrect: "Correto. A mudança pode se propagar pelos cálculos seguintes.", feedbackIncorrect: "A conexão participa do cálculo do neurônio que vem depois dela." },
    ],
  },
  {
    id: "aula-3", moduleId: "redes-neurais", order: 3, number: 3,
    title: "Como uma rede neural aprende?", shortTitle: "Aprendizado e erro",
    description: "Treine um classificador real e investigue acertos, erros e generalização.", duration: "25 min", color: "#6d28d9",
    steps: [
      { kind: "situation", eyebrow: "Situação inicial", title: "Aprender é ajustar uma hipótese", body: "Ao separar mensagens importantes de propaganda, você observa exemplos, arrisca uma regra, percebe erros e ajusta sua estratégia." },
      { kind: "explanation", eyebrow: "Ideia central", title: "Prever, medir, ajustar, repetir", body: "No treinamento, a rede faz uma previsão, compara com a resposta esperada, mede o erro e ajusta os pesos. Esse ciclo se repete muitas vezes.", bullets: ["Dados de treino orientam os ajustes", "Erro mostra a distância da meta", "Pesos mudam para reduzir erros"] },
      { kind: "visual", eyebrow: "Exemplo visual", title: "Uma fronteira entre grupos", body: "Um classificador simples desenha uma linha para separar dois grupos de pontos. Quando erra, move a linha usando o exemplo que causou o erro.", highlight: "Aprender não é decorar: queremos que a regra funcione em exemplos novos." },
      { kind: "activity", eyebrow: "Cheque sua compreensão", title: "Por que medir o erro?", activityId: "a3-compreensao" },
      { kind: "lab", eyebrow: "Laboratório", title: "Ensine por exemplos", lab: "classifier", body: "Clique em treinar e observe uma linha separar os dois grupos. Os pontos com contorno são usados apenas para testar." },
      { kind: "explanation", eyebrow: "Mais uma camada", title: "Teste é uma prova honesta", body: "Os dados de teste não devem orientar os ajustes. Eles ajudam a verificar generalização: se o modelo aprendeu uma regra útil para situações que ainda não viu.", highlight: "Bom desempenho no treino não garante bom desempenho fora dele." },
      { kind: "activity", eyebrow: "Desafio aplicado", title: "Separe treino e teste", activityId: "a3-desafio" },
      { kind: "activity", eyebrow: "Avaliação final", title: "Reconheça a generalização", activityId: "a3-final" },
      { kind: "summary", eyebrow: "Resultado e resumo", title: "Aprender é reduzir erro com evidência", body: "O treinamento ajusta parâmetros usando exemplos. Dados separados de teste verificam se o aprendizado se transfere para casos novos.", concepts: ["Treinamento", "Previsão", "Erro", "Ajuste de pesos", "Generalização", "Teste"] },
    ],
    activities: [
      { id: "a3-compreensao", type: "multiple-choice", question: "O que o erro informa durante o treinamento?", options: ["Quantos exemplos existem no conjunto", "Quanto a previsão ficou distante da resposta esperada", "Quais exemplos devem ser usados somente no teste"], correctAnswer: "Quanto a previsão ficou distante da resposta esperada", points: 30, feedbackCorrect: "Isso. Essa diferença orienta o ajuste do modelo.", feedbackIncorrect: "Compare a previsão feita com a resposta que era esperada." },
      { id: "a3-desafio", type: "multiple-choice", question: "Qual teste mostra melhor se o modelo funciona em casos novos?", options: ["Repetir os mesmos exemplos usados no treino", "Usar exemplos separados que o modelo ainda não viu", "Escolher apenas os exemplos mais fáceis do treino"], correctAnswer: "Usar exemplos separados que o modelo ainda não viu", points: 40, feedbackCorrect: "Correto. Exemplos novos oferecem uma avaliação mais honesta.", feedbackIncorrect: "O teste deve evitar os exemplos que já ajudaram a ajustar o modelo." },
      { id: "a3-final", type: "multiple-choice", question: "Um modelo acerta o treino, mas erra muitos exemplos novos. O que isso sugere?", options: ["Ele memorizou o treino e generalizou pouco", "Ele precisa usar os exemplos de teste para treinar", "Ele aprendeu uma regra que funciona em qualquer situação"], correctAnswer: "Ele memorizou o treino e generalizou pouco", points: 30, feedbackCorrect: "Exato. Acertar o treino não garante bom desempenho em situações novas.", feedbackIncorrect: "Compare o bom resultado nos exemplos conhecidos com o resultado ruim nos novos." },
    ],
  },
  {
    id: "aula-4", moduleId: "llms", order: 1, number: 4,
    title: "Como o ChatGPT lê nossas mensagens?", shortTitle: "Tokens e embeddings",
    description: "Veja um tokenizador real transformar texto em IDs e compare vetores semânticos.", duration: "24 min", color: "#0891b2",
    steps: [
      { kind: "situation", eyebrow: "Situação inicial", title: "O modelo não recebe frases como nós", body: "Quando você envia uma mensagem, ela primeiro é dividida em pequenas partes. Só então essas partes são convertidas em números que a rede consegue processar." },
      { kind: "explanation", eyebrow: "Ideia central", title: "Texto vira tokens e IDs", body: "Um tokenizador divide o texto em tokens. Cada token recebe um identificador numérico, que depois pode ser convertido em um vetor usado pela rede neural.", bullets: ["Token pode ser palavra, parte de palavra ou pontuação", "ID identifica o token no vocabulário", "Embedding é uma representação vetorial"] },
      { kind: "visual", eyebrow: "Exemplo visual", title: "Uma frase, vários blocos", body: "“inteligência artificial!” pode virar blocos diferentes conforme o tokenizador. Espaços, acentos e contexto de caracteres influenciam a divisão.", highlight: "Token não é sinônimo de palavra." },
      { kind: "activity", eyebrow: "Cheque sua compreensão", title: "Identifique o token", activityId: "a4-compreensao" },
      { kind: "lab", eyebrow: "Laboratório", title: "Separe uma frase em partes", lab: "tokenizer", body: "Digite duas frases curtas e veja como o tokenizador real separa cada uma em blocos." },
      { kind: "explanation", eyebrow: "Mais uma camada", title: "Vetores aproximam significados", body: "Embeddings representam itens como listas de números. Direções próximas podem indicar relações semânticas. Em modelos modernos, as representações também mudam conforme o contexto.", highlight: "Os vetores pequenos do laboratório são ilustrações pré-computadas, não saídas do ChatGPT." },
      { kind: "activity", eyebrow: "Desafio aplicado", title: "Do texto aos números", activityId: "a4-desafio" },
      { kind: "activity", eyebrow: "Avaliação final", title: "Palavra ou token?", activityId: "a4-final" },
      { kind: "summary", eyebrow: "Resultado e resumo", title: "Do texto à representação numérica", body: "Tokenização converte texto em unidades e IDs. Embeddings transformam itens em vetores úteis para a rede, levando o contexto em consideração.", concepts: ["LLM", "Tokens", "IDs", "Tokenização", "Embeddings", "Vetores"] },
    ],
    activities: [
      { id: "a4-compreensao", type: "multiple-choice", question: "Como um tokenizador pode dividir uma palavra longa?", options: ["Sempre mantém a palavra inteira", "Pode separar a palavra em partes menores", "Junta a palavra com toda a frase"], correctAnswer: "Pode separar a palavra em partes menores", points: 30, feedbackCorrect: "Certo. Um token pode ser uma palavra, parte dela ou até uma pontuação.", feedbackIncorrect: "Experimente uma palavra longa no laboratório e observe os blocos formados." },
      { id: "a4-desafio", type: "multiple-choice", question: "Depois de separar o texto em tokens, o que o sistema faz?", options: ["Agrupa apenas os tokens com o mesmo tamanho", "Associa cada token a um identificador numérico", "Escolhe imediatamente a resposta final"], correctAnswer: "Associa cada token a um identificador numérico", points: 40, feedbackCorrect: "Muito bem. Esse número é o ID do token.", feedbackIncorrect: "Veja os números mostrados ao lado de cada bloco no laboratório." },
      { id: "a4-final", type: "multiple-choice", question: "Por que a palavra “banco” pode ser representada de modo diferente em duas frases?", options: ["Porque seu sentido pode mudar com o contexto", "Porque ela sempre recebe um novo ID a cada uso", "Porque palavras repetidas são removidas do texto"], correctAnswer: "Porque seu sentido pode mudar com o contexto", points: 30, feedbackCorrect: "Exatamente. A frase ajuda o modelo a representar o sentido usado naquele caso.", feedbackIncorrect: "Compare “banco da praça” com “banco financeiro”." },
    ],
  },
  {
    id: "aula-5", moduleId: "llms", order: 2, number: 5,
    title: "Como funciona um Transformer?", shortTitle: "Contexto e atenção",
    description: "Explore relações entre tokens sem confundir atenção matemática com consciência.", duration: "23 min", color: "#0e7490",
    steps: [
      { kind: "situation", eyebrow: "Situação inicial", title: "A quem “ela” se refere?", body: "Leia: “O cachorro correu atrás da bola porque ela rolou.” Para interpretar “ela”, você relaciona palavras distantes na frase." },
      { kind: "explanation", eyebrow: "Ideia central", title: "Atenção pondera relações", body: "Em um Transformer, mecanismos de atenção calculam o quanto cada token deve considerar outros tokens ao atualizar sua representação.", bullets: ["Cada token consulta o contexto", "Pesos indicam intensidade de relações", "Várias cabeças podem buscar padrões diferentes"] },
      { kind: "visual", eyebrow: "Exemplo visual", title: "Conexões que dependem da pergunta", body: "Ao selecionar “ela”, uma conexão forte com “bola” ajuda a resolver a referência. Outro token pode destacar relações completamente diferentes.", highlight: "Atenção é um cálculo, não consciência ou intenção humana." },
      { kind: "activity", eyebrow: "Cheque sua compreensão", title: "Resolva a referência", activityId: "a5-compreensao" },
      { kind: "lab", eyebrow: "Laboratório", title: "Visualize a atenção", lab: "attention", body: "Selecione tokens em frases e compare pesos didáticos de atenção entre eles." },
      { kind: "explanation", eyebrow: "Mais uma camada", title: "Contexto transforma representações", body: "O mesmo token pode carregar sentidos diferentes depois de considerar seus vizinhos. Camadas sucessivas refinam essas representações contextuais.", highlight: "Os pesos do laboratório são construídos para ensino e não foram extraídos de um Transformer real." },
      { kind: "activity", eyebrow: "Desafio aplicado", title: "Interprete a atenção", activityId: "a5-desafio" },
      { kind: "activity", eyebrow: "Avaliação final", title: "Evite a armadilha", activityId: "a5-final" },
      { kind: "summary", eyebrow: "Resultado e resumo", title: "Relações criam contexto", body: "Transformers usam atenção para ponderar relações entre tokens e construir representações que dependem da frase.", concepts: ["Transformer", "Contexto", "Atenção", "Pesos de atenção", "Representação contextual"] },
    ],
    activities: [
      { id: "a5-compreensao", type: "multiple-choice", question: "Na frase “O cachorro correu atrás da bola porque ela rolou”, qual ligação ajuda a entender “ela”?", options: ["“ela” com “cachorro”", "“ela” com “bola”", "“ela” com “correu”"], correctAnswer: "“ela” com “bola”", points: 30, feedbackCorrect: "Isso. O contexto e a concordância ligam “ela” à bola.", feedbackIncorrect: "Procure o termo feminino que pode realizar a ação de rolar." },
      { id: "a5-desafio", type: "multiple-choice", question: "No laboratório, o que uma barra de atenção maior indica?", options: ["Uma relação mais forte entre aquelas palavras", "Uma certeza maior de que a frase é verdadeira", "Uma palavra usada com mais frequência na língua"], correctAnswer: "Uma relação mais forte entre aquelas palavras", points: 40, feedbackCorrect: "Correto. A barra mostra uma relação mais forte naquele cálculo didático.", feedbackIncorrect: "A barra compara relações entre palavras, não a verdade da frase." },
      { id: "a5-final", type: "multiple-choice", question: "O que não podemos concluir apenas porque um peso de atenção é alto?", options: ["Que duas palavras tiveram uma relação forte no cálculo", "Que o contexto destacou uma ligação", "Que o modelo compreendeu a frase como uma pessoa"], correctAnswer: "Que o modelo compreendeu a frase como uma pessoa", points: 30, feedbackCorrect: "Perfeito. Atenção mostra relações no cálculo, não consciência.", feedbackIncorrect: "Separe uma operação matemática de uma experiência humana de compreensão." },
    ],
  },
  {
    id: "aula-6", moduleId: "llms", order: 3, number: 6,
    title: "Como um LLM gera respostas?", shortTitle: "Próximo token e temperatura",
    description: "Ajuste a temperatura, observe probabilidades e gere continuações por amostragem.", duration: "25 min", color: "#155e75",
    steps: [
      { kind: "situation", eyebrow: "Situação inicial", title: "Qual palavra vem depois?", body: "Complete: “Depois da chuva, o céu ficou...” Há várias continuações possíveis. Um modelo atribui probabilidades a candidatos e escolhe um deles." },
      { kind: "explanation", eyebrow: "Ideia central", title: "Gerar é escolher a próxima parte", body: "O modelo dá uma chance para cada continuação possível. Uma regra matemática transforma suas pontuações em porcentagens. Depois de escolher uma parte, o processo recomeça.", bullets: ["Cada opção recebe uma chance", "As chances somam 100%", "A parte escolhida entra na frase"] },
      { kind: "visual", eyebrow: "Exemplo visual", title: "Temperatura remodela a distribuição", body: "Temperatura baixa concentra probabilidade nos candidatos mais fortes. Temperatura alta distribui mais probabilidade entre alternativas.", highlight: "Temperatura controla diversidade da amostragem — não inteligência ou conhecimento." },
      { kind: "activity", eyebrow: "Cheque sua compreensão", title: "O que é previsto?", activityId: "a6-compreensao" },
      { kind: "lab", eyebrow: "Laboratório", title: "Experimente a temperatura", lab: "temperature", body: "Mova um único controle e veja como as chances das próximas palavras mudam. Depois, sorteie uma continuação." },
      { kind: "explanation", eyebrow: "Mais uma camada", title: "Probável não significa garantido", body: "Na amostragem, um token com 60% pode não ser escolhido. Ao repetir a geração, pequenas escolhas mudam as continuações seguintes.", highlight: "Os logits deste laboratório são exemplos simulados e estão identificados como tal." },
      { kind: "activity", eyebrow: "Desafio aplicado", title: "Compare temperaturas", activityId: "a6-desafio" },
      { kind: "activity", eyebrow: "Avaliação final", title: "Interprete a temperatura", activityId: "a6-final" },
      { kind: "summary", eyebrow: "Resultado e resumo", title: "Uma resposta, token após token", body: "LLMs geram texto escolhendo o próximo token a partir de probabilidades. A temperatura muda o quanto essas escolhas podem variar.", concepts: ["Próximo token", "Probabilidades", "Temperatura", "Variedade"] },
    ],
    activities: [
      { id: "a6-compreensao", type: "multiple-choice", question: "Durante a geração de uma resposta, o que o modelo calcula a cada etapa?", options: ["A resposta inteira de uma vez", "As chances para o próximo token", "Apenas uma nota de gramática para a frase"], correctAnswer: "As chances para o próximo token", points: 30, feedbackCorrect: "Isso. A continuação cresce uma escolha de token por vez.", feedbackIncorrect: "Pense no processo como uma sequência de pequenas escolhas." },
      { id: "a6-desafio", type: "multiple-choice", question: "O que costuma acontecer quando a temperatura diminui?", options: ["As chances ficam mais concentradas nas opções fortes", "As chances ficam mais espalhadas entre todas as opções", "As chances permanecem exatamente iguais"], correctAnswer: "As chances ficam mais concentradas nas opções fortes", points: 40, feedbackCorrect: "Correto. Os candidatos mais fortes passam a dominar a escolha.", feedbackIncorrect: "Compare as barras do gráfico com a variedade baixa e alta." },
      { id: "a6-final", type: "multiple-choice", question: "O que a temperatura altera diretamente na geração?", options: ["O conhecimento aprendido pelo modelo", "A variedade possível nas escolhas de tokens", "A quantidade de dados usados no treinamento"], correctAnswer: "A variedade possível nas escolhas de tokens", points: 30, feedbackCorrect: "Exato. A temperatura altera a diversidade das escolhas, não o conhecimento.", feedbackIncorrect: "Observe o que muda no gráfico quando você move o controle de variedade." },
    ],
  },
];

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getActivity(lessonId: string, activityId: string) {
  return getLesson(lessonId)?.activities.find((activity) => activity.id === activityId);
}

export function getPublicLesson(id: string): PublicLesson | undefined {
  const lesson = getLesson(id);
  if (!lesson) return undefined;
  return {
    ...lesson,
    activities: lesson.activities.map((activity) => {
      const publicActivity = { ...activity } as Partial<typeof activity>;
      delete publicActivity.correctAnswer;
      return publicActivity as PublicLesson["activities"][number];
    }),
  };
}
