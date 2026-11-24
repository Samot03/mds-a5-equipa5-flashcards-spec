---

description: "Lista de tarefas para implementar os Flashcards de Estudo — Marcas de Automóveis"
---

# Tasks: Flashcards de Estudo — Marcas de Automóveis

**Input**: Design documents from `/specs/001-car-brand-flashcards/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: sem testes automáticos (a spec e a constitution pedem verificação manual, princípio
VIII). Cada fase termina com um checkpoint verificado no browser com os passos do
[quickstart.md](./quickstart.md).

**Organization**: as tarefas estão agrupadas por user story, pela ordem de prioridade da spec
(US1 e US2 são P1, US3 e US4 são P2, US5 é P3). Cada tarefa refere os requisitos que implementa
(princípio IX), indica o ficheiro onde se trabalha e cabe em 15 a 30 minutos.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode ser feita em paralelo (ficheiro diferente, sem dependência de tarefas por acabar)
- **[Story]**: user story a que a tarefa pertence (US1 … US5)
- Os caminhos são relativos à raiz do repositório, que é a pasta publicada (ver plan.md)

## Path Conventions

Projeto único na raiz: `index.html`, `styles.css`, `data/cards.json`, `js/app.js`,
`js/state.js`, `js/ui.js` (ver "Source Code" em [plan.md](./plan.md)).

---

## Phase 1: Setup (estrutura de ficheiros e baralho)

**Purpose**: criar os ficheiros da app, o baralho e o CSS base

- [X] T001 Criar `index.html` com `<html lang="pt-PT">`, `<meta name="viewport">`, `<title>Flashcards de Estudo</title>`, ligação a `styles.css`, `<script type="module" src="js/app.js">` e três `<section>` vazias com `hidden`: ecrã de estudo, ecrã de resumo e ecrã de erro (estrutura em [contracts/ui.md](./contracts/ui.md)); criar também as pastas `data/` e `js/` com `js/app.js`, `js/state.js` e `js/ui.js` vazios — FR-008, FR-013
- [X] T002 [P] Criar `data/cards.json` com os 10 cartões da tabela "Conteúdo do baralho" da [spec.md](./spec.md), no formato de [contracts/cards-json.md](./contracts/cards-json.md), com os campos [data-model.md](./data-model.md) `Card.id`, `Card.marca`, `Card.pais`, `Card.ano` e `Card.fundador` — FR-001
- [X] T003 Verificar manualmente os factos de `data/cards.json`: para cada uma das 10 marcas, confirmar país de origem, ano de fundação e fundador(es) numa fonte de referência (site oficial da marca ou enciclopédia) e anotar a fonte; decidir os 4 pontos ambíguos das Assumptions da spec (ano da Ferrari, fundadores da Tesla, data da Škoda, fundador da SEAT). Se um facto mudar, atualizar primeiro a tabela em `specs/001-car-brand-flashcards/spec.md` e só depois `data/cards.json` (princípio IX) — FR-001, SC-005 (depende de T002)
- [X] T004 [P] Escrever o CSS base mobile-first em `styles.css`: `box-sizing`, fundo `#f3f4f6`, texto `#1f2937`, contentor centrado com `width: min(100% - 2rem, 32rem)`, `overflow-wrap: anywhere`, contorno `:focus-visible` `#1d4ed8` e `[hidden] { display: none; }` (cores e rácios em [research.md R7](./research.md#r7-cores-e-contraste-wcag-aa), layout em R9) — FR-008, FR-011

---

## Phase 2: Foundational (carregar o baralho e desenhar o ecrã certo)

**Purpose**: o ciclo carregar → criar sessão → `render` de que todas as stories dependem

**⚠️ CRITICAL**: nenhuma user story começa antes desta fase estar concluída

- [X] T005 Implementar em `js/state.js` as funções puras `validarBaralho(dados)` (lista com ≥ 8 cartões, `id` únicos e os campos válidos de [data-model.md](./data-model.md) `Card.id`, `Card.marca`, `Card.pais`, `Card.ano`, `Card.fundador`), `criarSessao(cards)` (sessão inicial com [data-model.md](./data-model.md) `Sessão.ordem`, `Sessão.indice`, `Sessão.virado`, `Sessão.vistos`, `Sessão.marcas`, `Sessão.terminado`, ordem do ficheiro) e `cartaoAtual(s, cards)`, conforme [contracts/state-api.md](./contracts/state-api.md) — FR-001
- [X] T006 [P] Implementar em `js/ui.js` a função exportada `render(sessao, cards)` que mostra só o ecrã certo (estudo se `!sessao.terminado`, resumo se `sessao.terminado`) e a função `mostrarErro()` que mostra o ecrã de erro com "Não foi possível carregar o baralho." ([contracts/ui.md](./contracts/ui.md#ecrã-de-erro)) — FR-001, FR-013
- [X] T007 Implementar `js/app.js`: carregar `data/cards.json` com `fetch` (caminho relativo), validar com `validarBaralho`, chamar `mostrarErro()` se o pedido falhar, o JSON for inválido ou o baralho não for válido; senão guardar a sessão numa única variável `sessao` e criar `atualizar(nova)` que substitui `sessao` e chama `render(sessao, cards)` (research R8; princípio III) — FR-001 (depende de T005, T006)

**Checkpoint**: com `py -m http.server 8000`, a app abre sem erros na consola; mudar o nome de `data/cards.json` mostra o ecrã de erro (quickstart passo 2)

---

## Phase 3: User Story 1 - Ver e virar um cartão (Priority: P1) 🎯 MVP

**Goal**: um cartão de cada vez, que vira entre frente e verso com clique, toque, Enter ou Espaço

**Independent Test**: abrir a app, ver um só cartão com o nome de uma marca, clicar e ver o
verso, clicar de novo e ver a frente; repetir com Enter e Espaço (quickstart passos 3 e 15)

### Implementation for User Story 1

- [X] T008 [P] [US1] Implementar em `js/state.js` a função pura `virar(s)`: sem efeito se `terminado`; alterna [data-model.md](./data-model.md) `Sessão.virado` e, quando passa a `true`, regista o cartão atual em [data-model.md](./data-model.md) `Sessão.vistos` (transição "virar" no data model) — FR-002
- [X] T009 [P] [US1] Acrescentar ao ecrã de estudo em `index.html` o cartão `<button type="button">` com um contentor interior e duas faces (frente: marca; verso: país, ano, fundador(es)) e uma região `aria-live="polite"` visualmente oculta para anunciar a face (research R3, [contracts/ui.md](./contracts/ui.md#ecrã-de-estudo)) — FR-002, FR-010
- [X] T010 [P] [US1] Estilizar o cartão em `styles.css`: altura mínima fixa, faces sobrepostas com `backface-visibility: hidden`, verso com `rotateY(180deg)`, contentor com `transform-style: preserve-3d` e `transition: transform 0.4s`, classe `.virado` que roda 180°, e `@media (prefers-reduced-motion: reduce)` com `transition: none` (research R5) — FR-002, FR-008, FR-012
- [X] T011 [US1] Em `js/ui.js`, desenhar o cartão a partir da sessão: preencher as duas faces com `cartaoAtual`, aplicar `.virado` conforme `sessao.virado`, definir o `aria-label` ("Virar cartão. Frente: {marca}" / "Virar cartão. Verso: {pais}, {ano}, {fundador}") e escrever na região `aria-live` o texto da face visível — FR-002, FR-010 (depende de T009)
- [X] T012 [US1] Em `js/app.js`, ligar o evento `click` do cartão a `atualizar(virar(sessao))`; o `<button>` nativo já trata Enter e Espaço (research R3) — FR-002, FR-009 (depende de T008, T011)

**Checkpoint**: US1 verificável sozinha — quickstart passo 3 em 360 px e desktop; com movimento reduzido, passo 18

---

## Phase 4: User Story 2 - Marcar "Sei" ou "A rever" (Priority: P1)

**Goal**: marcar o cartão depois de ver o verso, avançar, e voltar atrás com "Anterior" para mudar a marcação

**Independent Test**: "Sei" e "A rever" inativos antes de virar; virar e marcar avança para o
cartão seguinte de frente; "Anterior" volta, mostra a marcação atual e permite substituí-la
(quickstart passos 4, 5, 6, 20, 21)

### Implementation for User Story 2

- [X] T013 [P] [US2] Implementar em `js/state.js` as funções puras `podeMarcar(s)` (verso do cartão atual em [data-model.md](./data-model.md) `Sessão.vistos`) e `marcar(s, valor)`: sem efeito se `terminado`, se `!podeMarcar(s)` ou se `valor` não for um dos valores de [data-model.md](./data-model.md) `Sessão.marcas`; grava a marca (substitui a anterior); se não é o último cartão avança [data-model.md](./data-model.md) `Sessão.indice` e põe `virado = false`, se é o último põe [data-model.md](./data-model.md) `Sessão.terminado` a `true` (research R1) — FR-003, FR-006, FR-014
- [X] T014 [US2] Implementar em `js/state.js` a função pura `anterior(s)`: sem efeito se `terminado` ou `indice === 0`; recua [data-model.md](./data-model.md) `Sessão.indice` e põe `virado = false`, mantendo `marcas` e `vistos` — FR-014 (depende de T013, mesmo ficheiro)
- [X] T015 [P] [US2] Acrescentar ao ecrã de estudo em `index.html` o parágrafo "Marcação atual" (oculto por omissão) e os botões `type="button"` "Sei", "A rever" e "Anterior" ([contracts/ui.md](./contracts/ui.md#ecrã-de-estudo)) — FR-003, FR-010, FR-014
- [X] T016 [P] [US2] Estilizar os botões em `styles.css`: "Sei" e "A rever" lado a lado com `flex: 1`, altura mínima de 44 px, "Sei" `#15803d`, "A rever" `#b45309`, "Anterior" `#1d4ed8`, texto branco, e estado `:disabled` com opacidade reduzida (research R7, R9) — FR-008, FR-011
- [X] T017 [US2] Em `js/ui.js`, desenhar o estado dos botões a partir da sessão: `disabled` em "Sei" e "A rever" se `!podeMarcar(sessao)`, `disabled` em "Anterior" se `sessao.indice === 0`, e mostrar "Marcação atual: Sei" / "Marcação atual: A rever" quando o cartão atual já tem marca — FR-003, FR-014 (depende de T013, T015)
- [X] T018 [US2] Em `js/app.js`, ligar "Sei" a `marcar(sessao, "sei")`, "A rever" a `marcar(sessao, "rever")` e "Anterior" a `anterior(sessao)`; depois de `atualizar`, pôr o foco no cartão, ou no título do resumo se `sessao.terminado` (research R4) — FR-003, FR-009, FR-014 (depende de T014, T017)

**Checkpoint**: US1 + US2 verificáveis — quickstart passos 4, 5, 6, 20 e 21 (o passo 21 completa-se na US4, quando o resumo existir); só com teclado, passo 15

---

## Phase 5: User Story 3 - Ver o progresso no baralho (Priority: P2)

**Goal**: "Cartão N de T" e uma barra que mede os cartões já marcados

**Independent Test**: "Cartão 1 de 10" e barra vazia ao abrir; depois de marcar 2, "Cartão 3 de
10" e 20 %; com "Anterior" a barra não recua (quickstart passos 9 e 10)

### Implementation for User Story 3

- [X] T019 [P] [US3] Implementar em `js/state.js` a função pura `progresso(s)` que devolve `{ posicao, total, marcados }`, a partir de [data-model.md](./data-model.md) `Sessão.indice`, `Sessão.ordem` e `Sessão.marcas` (tabela "Valores derivados") — FR-005
- [X] T020 [P] [US3] Acrescentar a `index.html`, fora dos ecrãs de estudo e resumo para ficar visível nos dois, o texto de posição e a barra `role="progressbar"` com `aria-valuemin="0"` e um elemento interior de preenchimento (research R6) — FR-005, FR-010
- [X] T021 [P] [US3] Estilizar a barra de progresso em `styles.css`: trilho com altura fixa e cantos arredondados, preenchimento `#1d4ed8` com largura em percentagem — FR-005, FR-011
- [X] T022 [US3] Em `js/ui.js`, desenhar o progresso com `progresso(sessao)`: texto "Cartão N de T", largura do preenchimento `marcados / total`, `aria-valuemax`, `aria-valuenow` e `aria-valuetext`; no resumo, a barra fica a 100 % — FR-005 (depende de T019, T020)

**Checkpoint**: quickstart passos 9 e 10

---

## Phase 6: User Story 4 - Resumo da sessão e recomeçar (Priority: P2)

**Goal**: no fim, contagens "Sei" e "A rever", lista a rever e "Recomeçar"

**Independent Test**: sessão com 6 "Sei" e 4 "A rever" mostra as contagens e as 4 marcas certas;
só "Sei" mostra "Não há cartões a rever."; "Recomeçar" volta ao cartão 1 da mesma ordem sem
marcações (quickstart passos 11, 12, 13)

### Implementation for User Story 4

- [X] T023 [P] [US4] Implementar em `js/state.js` as funções puras `resumo(s, cards)` (devolve `{ sei, rever, aRever }` a partir de [data-model.md](./data-model.md) `Sessão.marcas`, com os nomes das marcas pela ordem de `Sessão.ordem`) e `recomecar(s)` (mesma `ordem`, `indice 0`, `virado`, `vistos`, `marcas` e `terminado` limpos) — FR-006, FR-007, SC-002
- [X] T024 [P] [US4] Preencher o ecrã de resumo em `index.html`: título "Resumo da sessão" com `tabindex="-1"`, as linhas "Sei: X" e "A rever: Y", uma lista vazia para as marcas a rever, o parágrafo "Não há cartões a rever." (oculto por omissão) e o botão `type="button"` "Recomeçar" ([contracts/ui.md](./contracts/ui.md#ecrã-de-resumo)) — FR-006, FR-007, FR-010
- [X] T025 [P] [US4] Estilizar o ecrã de resumo em `styles.css`: contagens destacadas, lista legível e botão "Recomeçar" `#1d4ed8` com texto branco e altura mínima de 44 px — FR-008, FR-011
- [X] T026 [US4] Em `js/ui.js`, desenhar o resumo com `resumo(sessao, cards)`: contagens, itens da lista a rever, e a mensagem "Não há cartões a rever." em vez da lista quando `rever === 0` — FR-006 (depende de T023, T024)
- [X] T027 [US4] Em `js/app.js`, ligar "Recomeçar" a `atualizar(recomecar(sessao))` e pôr o foco no cartão — FR-007, FR-009 (depende de T023, T026)

**Checkpoint**: quickstart passos 11, 12, 13 e 21; a sessão completa só com teclado (passo 15)

---

## Phase 7: User Story 5 - Baralhar os cartões (Priority: P3)

**Goal**: baralhar em qualquer momento do estudo, o que recomeça a sessão numa nova ordem aleatória

**Independent Test**: no cartão 3, "Baralhar" volta a "Cartão 1 de 10" sem marcações e com outra
ordem; cada marca aparece uma só vez (quickstart passos 7 e 8)

### Implementation for User Story 5

- [X] T028 [P] [US5] Implementar em `js/state.js` a função pura `baralhar(s, aleatorio = Math.random)`: Fisher–Yates sobre uma cópia de [data-model.md](./data-model.md) `Sessão.ordem` e sessão recomeçada (`indice 0`, `virado`, `vistos`, `marcas` e `terminado` limpos) (research R2, Clarificação Q1) — FR-004
- [X] T029 [P] [US5] Acrescentar ao ecrã de estudo em `index.html` o botão `type="button"` "Baralhar", e o estilo correspondente em `styles.css` (`#1d4ed8`, texto branco, 44 px) — FR-004, FR-010, FR-011
- [X] T030 [US5] Em `js/app.js`, ligar "Baralhar" a `atualizar(baralhar(sessao))` e pôr o foco no cartão — FR-004, FR-009 (depende de T028, T029)

**Checkpoint**: todas as user stories funcionam — quickstart passos 7 e 8

---

## Phase 8: Polish & verificação final

**Purpose**: revisão transversal, verificação completa e publicação

- [X] T031 Rever `js/app.js`, `js/state.js` e `js/ui.js` contra o princípio VI: funções pequenas com um só propósito, nomes descritivos, `state.js` sem acesso ao DOM, `ui.js` sem regras de estado, sem código morto, comentado ou não usado, e sem erros nem avisos na consola — FR-001..FR-014 (transversal)
- [X] T032 [P] Rever todo o texto visível e as etiquetas acessíveis em `index.html` e `js/ui.js`: português de Portugal pós-Acordo, `lang="pt-PT"`, e nomes acessíveis em todos os controlos (quickstart passos 16 e 19) — FR-010, FR-013
- [X] T033 Fazer a verificação final com a checklist da secção 4 do `specs/001-car-brand-flashcards/quickstart.md`, passos 1 a 26, em telemóvel (360 px) e em desktop, com `py -m http.server 8000` (ou `npx serve .`); marcar cada ✓ no próprio quickstart; qualquer falha volta à tarefa do requisito correspondente antes de continuar — SC-001, SC-002, SC-003, SC-004, SC-005 (depende de T003 e de T001–T032)
- [X] T034 Publicar no Netlify a raiz do repositório (a pasta com `index.html`), sem comando de build (research R11), e repetir no endereço público os passos 1, 3, 11 e 14 do quickstart, em telemóvel e em desktop — FR-008, SC-003 (depende de T033)
- [X] T035 Atualizar `README.md`: link do Netlify na secção "Demo" e caminhos reais na tabela de artefactos (`.specify/memory/constitution.md`, `specs/001-car-brand-flashcards/spec.md`, `plan.md`, `tasks.md`) (depende de T034)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sem dependências. T003 depende de T002 e pode correr em paralelo com o resto do trabalho, mas tem de estar feito antes de T033.
- **Foundational (Phase 2)**: depende do Setup; bloqueia todas as user stories.
- **User Stories (Phases 3–7)**: dependem da fase Foundational; seguem a ordem de prioridade US1 → US2 → US3 → US4 → US5.
- **Polish (Phase 8)**: depende de todas as user stories.

### User Story Dependencies

- **US1 (P1)**: só depende da fase Foundational.
- **US2 (P1)**: precisa do cartão da US1 (marcar exige ver o verso).
- **US3 (P2)**: só precisa da fase Foundational para "Cartão 1 de 10"; para ver a barra avançar precisa da US2.
- **US4 (P2)**: precisa da US2, porque o resumo aparece quando se marca o último cartão.
- **US5 (P3)**: só precisa da fase Foundational e da US1 para ver a nova ordem; recomeçar a sessão é verificável sem US4.

### Within Each User Story

- `state.js` (função pura) e `index.html` (marcação) primeiro, em paralelo.
- `styles.css` em paralelo com os anteriores.
- `ui.js` (desenho) depois da marcação e da função de estado.
- `app.js` (eventos e foco) por último.

### Parallel Opportunities

- Phase 1: T002 e T004 em paralelo com T001.
- Phase 2: T005 e T006 em paralelo.
- Em cada user story: as tarefas `[P]` de `state.js`, `index.html` e `styles.css`.
- T003 (verificação de factos) pode ser feita por outro membro da equipa enquanto se implementam as user stories.
- Atenção: tarefas de stories diferentes no mesmo ficheiro (por exemplo `js/state.js`) não correm em paralelo entre si.

---

## Parallel Example: User Story 2

```text
Task: "T013 [US2] podeMarcar e marcar em js/state.js"
Task: "T015 [US2] Marcação atual e botões Sei, A rever, Anterior em index.html"
Task: "T016 [US2] Estilo dos botões em styles.css"
# depois: T014 (state.js), T017 (ui.js), T018 (app.js)
```

## Parallel Example: User Story 4

```text
Task: "T023 [US4] resumo e recomecar em js/state.js"
Task: "T024 [US4] Ecrã de resumo em index.html"
Task: "T025 [US4] Estilo do resumo em styles.css"
# depois: T026 (ui.js), T027 (app.js)
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1: Setup
2. Phase 2: Foundational
3. Phase 3: US1
4. **PARAR e VALIDAR**: quickstart passos 3, 15 (só virar) e 18

### Incremental Delivery

1. Setup + Foundational → a app carrega o baralho ou mostra o erro
2. + US1 → estudar virando cartões (MVP)
3. + US2 → marcar e corrigir marcações
4. + US3 → ver o progresso
5. + US4 → resumo e recomeçar (sessão completa, SC-001 e SC-002)
6. + US5 → baralhar
7. Polish → verificação completa (T033) e deploy (T034)

### Orçamento de tempo

35 tarefas de 15 a 30 minutos dão entre cerca de 9 e 17 horas de trabalho no total. O orçamento
de 3 horas da experiência só se cumpre se o agente fizer as tarefas de implementação e a equipa
ficar com T003, T033 e T034 (verificação humana e deploy).

---

## Notes

- [P] = ficheiros diferentes, sem dependências de tarefas por acabar
- [USn] liga a tarefa à user story, para rastreabilidade
- Cada tarefa indica os requisitos (FR/SC) que implementa (princípio IX)
- Fazer commit no fim de cada fase (o README pede um commit por fase do Spec Kit; dentro da implementação, um commit por user story mantém o histórico legível)
- Qualquer mudança de comportamento descoberta durante a implementação atualiza primeiro a `spec.md`
