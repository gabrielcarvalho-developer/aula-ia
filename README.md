# IA Lab

Plataforma educacional full-stack para estudantes do Ensino Médio explorarem redes neurais e LLMs em seis aulas interativas. O aluno informa apenas nome e turma; o navegador recebe um identificador aleatório e o progresso é salvo automaticamente no MongoDB.

## Executar localmente

Requisitos: Node.js 20.9+ e uma instância MongoDB (local ou Atlas).

1. Copie `.env.example` para `.env.local`.
2. Preencha `MONGODB_URI`, `PROFESSOR_ACCESS_KEY` e um `PROFESSOR_SESSION_SECRET` aleatório com pelo menos 32 caracteres.
3. Execute `npm install` e `npm run dev`.
4. Abra `http://localhost:3000`. A área docente fica em `/professor`.

Use `npm run seed` fora de produção para inserir o currículo e registros claramente marcados como `[DEMO]`. O script é idempotente e recusa execução quando `NODE_ENV=production`. Os registros de demonstração não aparecem no painel real.

## Qualidade

- `npm test`: testes unitários de notas, currículo, sessão e cálculos dos laboratórios.
- `npm run test:e2e`: fluxos responsivos básicos no Chromium; requer as variáveis de ambiente.
- `npm run build`: verificação de tipos e build de produção.

## Arquitetura e segurança

- Next.js App Router, React, TypeScript strict e Tailwind CSS.
- Componentes visuais reutilizáveis no padrão shadcn/ui; ícones Lucide e transições Motion.
- Mongoose mantém alunos, tentativas e progresso. Índices únicos impedem submissões duplicadas.
- O cookie do aluno contém um token aleatório; apenas seu hash SHA-256 é armazenado. Ele é `HttpOnly`, `SameSite=Lax` e `Secure` em produção.
- O gabarito nunca é enviado ao cliente. Cada resposta e nota é validada e calculada no servidor.
- A chave docente é comparada por digest com tempo constante. A sessão assinada expira em oito horas, usa cookie `HttpOnly`/`SameSite=Strict` e pode ser encerrada. Tentativas de login são limitadas no MongoDB.
- O painel docente consulta apenas nome, turma e média das melhores notas concluídas.

## Privacidade, retenção e limitações

São coletados somente nome, turma, tentativas e progresso. Recomenda-se à escola definir um período letivo de retenção (por exemplo, apagar registros 90 dias após o encerramento da turma) e executar a exclusão diretamente no banco com autorização institucional. Backups devem seguir o mesmo prazo.

O identificador anônimo não é autenticação forte. O sistema não confirma que o nome informado é verdadeiro e não recupera a identidade em outro dispositivo. Apagar o cookie ou trocar de navegador cria uma nova participação. “Trocar aluno” remove apenas o vínculo do navegador; não apaga o registro anterior.

## Deploy na Vercel

Crie um projeto a partir do repositório, configure as três variáveis do `.env.example` e permita no MongoDB Atlas a conectividade usada pela Vercel. Não execute o seed de demonstração em produção. Cookies seguros são ativados automaticamente em `NODE_ENV=production`.
