# Registo de prompts — Flashcards (Spec-Driven, Spec Kit + Claude Code)

> **Como foi feito:** os prompts e os tempos vêm do registo local da sessão do Claude Code
> (ficheiro `.jsonl` do projeto), que guarda a hora de cada mensagem. Os commits e as linhas vêm
> do `git log --numstat`. Todos os prompts estão confirmados: não há linhas por confirmar.
>
> **Tempos:**
> - **Hora** é a hora local em que o prompt foi enviado.
> - **Resposta** é o tempo desde o envio do prompt até à última mensagem do agente nesse turno.
>   Nos turnos com perguntas ao utilizador (marcados com ⏸), inclui o tempo que a equipa levou
>   a responder.
> - **Ferramentas** é o número de chamadas a ferramentas (ler e escrever ficheiros, terminal,
>   browser) feitas pelo agente nesse turno.
> - Os commits foram feitos pela equipa depois de cada fase, por isso a hora do commit é
>   posterior à resposta.
>
> A sessão começou às 11:05 (o README inicial é de 10:58).

## Tabela de prompts

| # | Fase | Hora | Resposta | Ferramentas | Prompt (resumo) | O que a IA fez | Artefactos / commit | Observações para o relatório |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Init | 11:05 | 0 min 27 s | 3 | `/spec-kit` | O comando não existia na sessão. A IA verificou que o `specify` e o `uv` não estavam instalados e propôs a instalação | — | O Spec Kit não vem instalado; é preciso um passo de preparação |
| 1 | Init | 11:08 | 1 min 49 s | 12 | "Yes, set it up" | Instalou o `uv` e o `specify-cli` e correu `specify init --here --integration claude --script ps`. **Teve de acrescentar `--ignore-agent-tools`** porque a CLI `claude` não estava no PATH (sessão na app desktop). Criou `.specify/` e as skills `/speckit-*` | Entrou no commit `c7d0217` | A IA resolveu sozinha o erro de instalação. Nesta versão os comandos usam hífen (`/speckit-plan`), não ponto |
| 2 | Constitution | 11:12 | 1 min 10 s | 8 | `/speckit-constitution` com 10 princípios: JS simples sem build, dados em JSON, estado em memória, mobile-first, acessibilidade, código legível, âmbito controlado, verificabilidade, "a spec manda", português de Portugal, mais a regra de governação | Escreveu o `constitution.md` v1.0.0 (158 linhas), com regras MUST verificáveis e uma justificação por princípio. **Acrescentou por inferência:** `lang="pt-PT"`, WCAG 2.1, proibição de CDNs, UI derivada do estado e o aviso de que o `fetch` não funciona com `file://` | `.specify/memory/constitution.md` · `c7d0217` (11:21) | Seguiu os princípios dados. O texto do prompt foi preparado antes com ajuda da IA (chat) |
| 3 | Specify | 11:27 | 2 min 12 s | 10 | `/speckit-specify` com o porquê, o baralho de 10 marcas, 5 user stories, FR-001 a FR-008, SC-001 a SC-003, o que fica fora de âmbito e 3 questões em aberto | Escreveu o `spec.md` e uma checklist de qualidade, com cenários Given/When/Then e casos-limite. **Acrescentou requisitos não pedidos:** FR-009 a FR-013 (teclado, etiquetas acessíveis, contraste AA, movimento reduzido, pt-PT), vindos da constitution, e SC-004 e SC-005. **Reescreveu o FR-008:** tirou "visualmente atrativa" e pôs critérios verificáveis, citando os princípios VII e VIII. **Encontrou 4 factos ambíguos:** ano da Ferrari, fundadores da Tesla, data da Škoda e fundador da SEAT. Deixou as 3 questões como `[NEEDS CLARIFICATION]` e perguntou se respondíamos já ou no Clarify | `spec.md`, `checklists/requirements.md` · `e412191` (11:34, com o Clarify) | Mostra a IA a **alterar um requisito do Cliente** com base na constitution, o que explica o visual sóbrio da app. Bom exemplo para "Control & predictability" e "Value of the specification" |
| 4 | Clarify | 11:30 | 2 min 09 s ⏸ | 18 | "Answer now" e escolha das opções: Q1 baralhar recomeça a sessão; Q2 marcar só depois de virar; Q3 sim, há um botão "Anterior" | Não correu `/speckit-clarify`: fez as 3 perguntas com opções e registou as respostas numa secção "Clarifications". Atualizou o FR-003 e o FR-004, acrescentou o **FR-014** ("Anterior") e 6 cenários novos (US2, US3, US5). Decidiu sozinha pormenores e registou-os nos casos-limite: o resumo não tem "Anterior" e a barra não recua | No mesmo commit `e412191` | As respostas foram escolhidas pela equipa; registar se vieram do professor (Cliente). O tempo inclui a escolha das respostas |
| 5 | Plan | 11:40 | 4 min 03 s | 20 | `/speckit-plan` com a stack, a estrutura de ficheiros, o modelo de dados, as funções de estado puras, as regras de interface e a verificação | Gerou 7 documentos: `plan.md` (com verificação dos 10 princípios), `research.md` (12 decisões, de R1 a R12), `data-model.md`, `quickstart.md` (checklist de 26 passos) e 3 contratos. **Mudou o nosso plano em 7 pontos para cumprir a spec:** acrescentou `anterior()` (FR-014); trocou a regra de marcar de `virado === true` para "verso já visto" (`vistos`); criou um ecrã de erro; ajustou 3 assinaturas; propôs `py -m http.server` porque o Node não estava instalado. **Calculou os contrastes** das cores escolhidas | `specs/001-car-brand-flashcards/*` · `c6e64ef` (11:47) | A IA corrigiu o nosso prompt, que contradizia a spec clarificada. Produziu muito mais documentação do que a pedida: pesar custo e benefício em "Value of the specification" |
| 6 | Tasks | 11:49 | 2 min 21 s | 9 | `/speckit-tasks` agrupadas por user story, com referência aos FR, tarefas pequenas, verificação dos factos e verificação final mais deploy | Criou 35 tarefas em 8 fases, com dependências e tarefas paralelas. Cada uma cita os FR/SC e os campos do modelo de dados. Incluiu a T003 (factos) e da T033 à T035. **Avisou que 35 tarefas de 15–30 min dão 9 a 17 h**, o que só cabe nas 3 h se a IA implementar | `tasks.md` (253 linhas) · `757e642` (11:52) | Rastreabilidade completa entre tarefa e requisito. A estimativa mostra o peso do processo |
| 7 | Implement: preparação | 11:53 | 1 min 39 s | 18 | `/speckit-implement`, uma fase de cada vez, parar no fim de cada fase e marcar as tarefas com [X] | Fase 1: `index.html`, `cards.json`, CSS base e módulos JS vazios; validou o JSON e testou a página a 360 px. Fechou a T001, a T002 e a T004. **Deixou a T003 por fazer**, porque é a equipa que verifica os factos. Notou que a pasta `.claude` estava no `.gitignore` e por isso as skills não iam para o repositório | — | Parou como pedido |
| 8 | Implement: fundação | 11:55 | 1 min 13 s | 18 | "Continue to Phase 2" | T005–T007: validação do baralho, `render` e ecrã de erro. Testou 4 tipos de falha de carregamento simulando o `fetch`. **Descobriu que o browser usava o `cards.json` em cache** e acrescentou a nota ao passo 2 do quickstart | `c6a503f` (11:57, Fases 1 e 2) | Atualizou o quickstart durante a implementação |
| 9 | Implement: US1 | 11:57 | 1 min 14 s | 21 | "Continue to US1" | T008–T012: cartão `<button>` com viragem 3D, `aria-label`, `aria-live` e movimento reduzido. Testou o clique, o Enter e o Espaço no browser | Commit junto com a US2: `6dbc725` | A IA parou depois da US1; foi a equipa que juntou a US1 e a US2 num só commit |
| 10 | Implement: US2 | 11:59 | 1 min 59 s | 29 | "Continue to US2" | T013–T018: "Sei", "A rever", "Anterior" e gestão do foco. **Encontrou e corrigiu um defeito:** ao marcar, o cartão seguinte rodava 0,4 s do verso para a frente e mostrava a resposta. Mediu a rotação para confirmar a correção. Contornou a cache do browser abrindo a app noutro endereço local | `6dbc725` (12:02) | Defeito encontrado pela própria IA a testar, contra um caso-limite da spec. Conta como 1 retrabalho |
| 11 | Implement: US3 | 12:02 | 0 min 53 s | 15 | "Continue to US3" | T019–T022: texto "Cartão N de T" e barra `progressbar` com `aria-value*`. Verificou os 4 cenários da US3 (0 %, 20 %, 30 % depois de "Anterior", 100 %) | `66ff29a` (12:03) | |
| 12 | Implement: US4 | 12:03 | 1 min 06 s | 22 | "Continue to US4" | T023–T027: resumo, lista a rever, mensagem quando não há nenhum e "Recomeçar". Testou 6/4, 10/0 e uma marcação mudada com "Anterior" | `7e15cf8` (12:05) | |
| 13 | Implement: US5 | 12:05 | 0 min 38 s | 12 | "Continue to US5" | T028–T030: baralhar com Fisher–Yates, recomeçando a sessão. 200 baralhações deram 200 ordens diferentes | `17588d9` (12:06) | Conforme a clarificação Q1 |
| 14 | Implement: polish e revisão | 12:07 | 2 min 17 s | 19 | "Continue to final phase" | T031 e T032: **reorganizou o `state.js`** (secções e ordem) para cumprir o princípio VI; reviu o texto pt-PT. Correu uma verificação automática de 19 passos do quickstart a 360 px e uma sessão só com teclado a 1280 px. Atualizou o README. **Deixou "Por verificar"** o movimento reduzido, a sessão cronometrada, os factos e o telemóvel real | `b8b692a` (12:10) | A IA verificou o próprio trabalho e **assinalou o que não conseguiu verificar**. Bom ponto para "Trust in the AI output". A reorganização conta como 1 retrabalho |
| 15 | — | 12:09 | 0 min 01 s | 0 | "Not yet" (não fazer commit) | Confirmou e não fez commit | — | |
| 16 | Deploy | — | — | — | Sem IA: a equipa publicou no Netlify e corrigiu o link do README | Não aplicável | `7520640` (12:19) | |
| 17 | Factos (T003) | 12:38 | 0 min 56 s | 13 | "continue então" | Pesquisou na web os factos das 10 marcas e criou o `factos.md` com as fontes. Os 10 valores do baralho coincidiam com as fontes. Marcou 3 decisões para a equipa e 2 acrescentos opcionais. **Não marcou a T003**, por ser da equipa | `factos.md` · `cd439aa` | |
| 18 | Factos (T003) | 12:41 | 1 min 41 s ⏸ | 17 | "Answer now" e escolhas: Ferrari 1947, Škoda 1895, Tesla 2 fundadores; acrescentar "com a Fiat" (SEAT) e Chung Se-yung (Hyundai) | Atualizou **primeiro a tabela da spec e depois o `cards.json`** (princípio IX), fechou a T003 e verificou os novos versos no browser | `cd439aa` (12:44) | O tempo inclui a escolha das respostas |


## Resumo

| Métrica | Valor |
| --- | --- |
| Prompts no total | 21 (incluindo este último pedido) |
| Prompts de fase do Spec Kit | 6 (`/speckit-constitution`, `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`, mais o Clarify feito com "Answer now") |
| Prompts de continuação na implementação | 7 ("Continue to Phase 2", US1, US2, US3, US4, US5 e final phase) |
| Tempo de resposta da IA na especificação | cerca de 12 min (constitution 1:10, specify 2:12, clarify 2:09, plan 4:03, tasks 2:21) |
| Tempo de resposta da IA na implementação | cerca de 11 min (8 turnos, de 0:38 a 2:17) |
| Resposta mais longa | `/speckit-plan`, 4 min 03 s |
| Chamadas a ferramentas pela IA | cerca de 280 |
| Tempo de especificação (relógio) | cerca de 47 min (11:05 → 11:52) |
| Tempo de implementação (relógio) | cerca de 17 min (11:53 → 12:10) |
| Tempo até ao deploy (relógio) | cerca de 74 min (11:05 → 12:19) |
| Tempo total da sessão | cerca de 1 h 48 min (11:05 → 12:53) |
| Linhas de artefactos de spec | cerca de 1374 (constitution, spec, plano e anexos, tarefas, factos) |
| Linhas de código da app | 638 (6 ficheiros) |
| Commits | 15 (incluindo o inicial e o merge) |
| Retrabalho identificado | 2: defeito da viragem na US2, corrigido pela IA; reorganização do `state.js` |
| Desvios da IA ao pedido | FR-008 reescrito; FR-009 a FR-013, SC-004 e SC-005 acrescentados; 7 ajustes ao plano para cumprir a spec; Clarify feito sem `/speckit-clarify` |

## Pendentes

- [ ] Fazer `git push` dos commits locais (se ainda não foi feito), para o Netlify passar a
  servir o baralho com os factos corrigidos (SEAT "com a Fiat", Hyundai com Chung Se-yung).
