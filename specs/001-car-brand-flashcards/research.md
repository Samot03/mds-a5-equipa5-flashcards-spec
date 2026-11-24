# Research: Flashcards de Estudo — Marcas de Automóveis

**Phase 0** | **Date**: 2026-11-24 | **Plan**: [plan.md](./plan.md)

O Technical Context não tem itens NEEDS CLARIFICATION: a stack foi fixada pela constitution e
pelo input do plano. Esta fase regista as decisões técnicas que a spec deixa em aberto.

## R1. Regra para ativar "Sei" e "A rever"

- **Decision**: a sessão guarda `vistos: { [id]: true }`. `virar` marca o cartão atual como visto
  quando mostra o verso. `marcar` só tem efeito se `vistos[idAtual]` for verdadeiro. A UI usa a
  mesma condição para o atributo `disabled`.
- **Rationale**: FR-003 e US2-2 exigem que os botões fiquem ativos depois de ver o verso, mesmo que
  o cartão volte à frente; US2-6 exige que fiquem ativos ao voltar com "Anterior". A condição
  `virado === true` do input do plano falharia nos dois casos.
- **Alternatives considered**: `virado === true` (falha US2-2 e US2-6); considerar visto qualquer
  cartão com marcação (cobre "Anterior" mas não US2-2).

## R2. Baralhar

- **Decision**: Fisher–Yates sobre uma cópia de `s.ordem`, com o gerador injetável
  `baralhar(s, aleatorio = Math.random)`. Devolve uma sessão nova: nova `ordem`, `indice = 0`,
  `virado = false`, `marcas = {}`, `vistos = {}`, `terminado = false`.
- **Rationale**: Fisher–Yates dá todas as permutações com igual probabilidade e garante que cada
  cartão aparece uma vez (US5-2). Recomeçar a sessão cumpre a Clarificação Q1. Injetar o gerador
  mantém a função pura e permite reproduzir uma ordem ao depurar.
- **Alternatives considered**: `sort(() => Math.random() - 0.5)` (enviesado e dependente do
  browser); baralhar só os cartões em falta (rejeitado pela Clarificação Q1).

## R3. Virar o cartão: elemento e teclado

- **Decision**: o cartão é um `<button type="button">` com as duas faces dentro. Um único
  listener `click` trata clique, toque, Enter e Espaço, porque o `<button>` nativo já gera
  `click` com essas teclas. `aria-label` descreve a ação e a face visível, por exemplo
  "Virar cartão. Frente: Ferrari". Uma região `aria-live="polite"` anuncia o conteúdo da face
  visível depois de cada viragem.
- **Rationale**: o elemento nativo dá foco, teclado e papel acessível sem código extra
  (FR-002, FR-009, FR-010), o que mantém o código mínimo (princípio VI).
- **Alternatives considered**: `<div tabindex="0" role="button">` com listener de `keydown`
  (mais código e mais fácil de errar, por exemplo o Espaço a fazer scroll).

## R4. Gestão de foco

- **Decision**:
  - Depois de marcar ou usar "Anterior", o foco vai para o cartão. Sem isto, o foco ficaria num
    botão "Sei" que passa a `disabled` no cartão seguinte e perder-se-ia para o `<body>`.
  - Depois de "Baralhar" e "Recomeçar", o foco vai para o cartão.
  - Quando aparece o resumo, o foco vai para o título do resumo (`tabindex="-1"`).
- **Rationale**: SC-004 pede uma sessão completa só com teclado; sem gestão de foco, o
  utilizador de teclado teria de voltar a navegar desde o início da página a cada cartão.
- **Alternatives considered**: `aria-disabled` em vez de `disabled` para manter o foco no botão
  (exige bloquear o clique em código; `disabled` cumpre "tentar usá-los não faz nada" de US2-1
  sem código extra).

## R5. Animação de virar e movimento reduzido

- **Decision**: as duas faces ficam sobrepostas num contentor com `transform-style: preserve-3d`;
  a face de trás tem `rotateY(180deg)` e ambas `backface-visibility: hidden`. A classe
  `.virado` roda o contentor 180° com `transition: transform 0.4s`. Em
  `@media (prefers-reduced-motion: reduce)` a transição é `none`, por isso a face troca de
  imediato.
- **Rationale**: é a técnica CSS padrão, sem JavaScript de animação. O estado `virado` da sessão
  decide a classe, por isso a UI continua derivada do estado (princípio III). Cumpre FR-012.
- **Alternatives considered**: trocar o texto de uma só face (sem efeito de cartão, mas seria o
  fallback se o 3D desse problemas); animação em JS (mais código, sem ganho).

## R6. Barra de progresso

- **Decision**: elemento com `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax` = número
  de cartões, `aria-valuenow` = número de cartões marcados e `aria-valuetext` com o texto
  "Cartão N de T". O preenchimento visual é a largura de um filho em percentagem.
- **Rationale**: a spec (Assumptions e US3-4) define que a barra mede cartões marcados e não
  recua com "Anterior", enquanto o texto mostra a posição. `aria-valuetext` faz o leitor de ecrã
  ler a posição em vez de um número solto.
- **Alternatives considered**: `<progress>` nativo (difícil de estilizar de forma consistente
  entre browsers; aceitável, mas a `div` com papel ARIA é igualmente simples).

## R7. Cores e contraste (WCAG AA)

- **Decision**: paleta mínima, com rácios calculados pela fórmula de luminância relativa da WCAG:

  | Uso | Texto | Fundo | Rácio |
  |---|---|---|---|
  | Texto principal | `#1f2937` | `#ffffff` | 14,68:1 |
  | Texto sobre o fundo da página | `#1f2937` | `#f3f4f6` | 13,34:1 |
  | Texto secundário | `#4b5563` | `#f3f4f6` | 6,87:1 |
  | Botões neutros (Anterior, Baralhar, Recomeçar) | `#ffffff` | `#1d4ed8` | 6,70:1 |
  | Botão "Sei" | `#ffffff` | `#15803d` | 5,02:1 |
  | Botão "A rever" | `#ffffff` | `#b45309` | 5,02:1 |
  | Contorno de foco | `#1d4ed8` | `#f3f4f6` | 6,09:1 |

  Os botões inativos usam opacidade reduzida; a WCAG não exige contraste para componentes
  inativos, mas o texto continua legível. O contorno de foco é sempre visível (`:focus-visible`).
- **Rationale**: todos os pares ≥ 4,5:1 (FR-011); a cor não é a única pista, porque os botões têm
  texto.
- **Alternatives considered**: paleta mais rica (fora de âmbito pelo princípio VII).

## R8. Carregamento do baralho e erro

- **Decision**: `fetch('data/cards.json')` com caminho relativo. Se a resposta falhar, o JSON for
  inválido ou houver menos de 8 cartões válidos (cada um com `id`, `marca`, `pais`, `ano`,
  `fundador`), a app mostra o ecrã de erro "Não foi possível carregar o baralho."
- **Rationale**: cumpre o edge case da spec e FR-001 sem bibliotecas de validação. O caminho
  relativo funciona tanto em `localhost` como no Netlify.
- **Alternatives considered**: embutir os cartões num módulo JS (viola o princípio II).

## R9. Layout responsivo

- **Decision**: CSS mobile-first em coluna única; o contentor principal tem
  `width: min(100% - 2rem, 32rem)` e fica centrado. O cartão tem altura mínima fixa para que as
  duas faces caibam, e os textos usam `overflow-wrap: anywhere`. Os botões "Sei" e "A rever" ficam
  lado a lado com `flex: 1`, com área de toque ≥ 44 px. Sem media queries de largura, porque o
  mesmo layout serve de 360 px ao desktop.
- **Rationale**: cumpre FR-008 e o princípio IV com o mínimo de CSS.
- **Alternatives considered**: layout em grelha com breakpoints (desnecessário para um só cartão).

## R10. Servidor local para testes

- **Decision**: a forma documentada é `npx serve .`. Nesta máquina o Node não está instalado, por
  isso o quickstart indica também `py -m http.server 8000`, que usa o Python já instalado.
- **Rationale**: o `fetch` não funciona com `file://`. Qualquer servidor estático serve; nenhum
  deles é dependência da app.
- **Alternatives considered**: extensão Live Server do VS Code (depende do editor de cada membro).

## R11. Publicação no Netlify

- **Decision**: publicar a raiz do repositório, sem comando de build. Não é preciso
  `netlify.toml`.
- **Rationale**: é a opção pedida e a mais simples. `specs/`, `.specify/` e `.claude/` também ficam
  públicos, mas são só documentação.
- **Alternatives considered**: mover a app para `app/` e publicar essa pasta (mais limpo, mas
  muda os caminhos do input do plano).

## R12. Factos do baralho

- **Decision**: os factos ficam como na tabela "Conteúdo do baralho" da spec. Os quatro pontos
  ambíguos (ano da Ferrari, fundadores da Tesla, data da Škoda, fundador da SEAT) continuam a ser
  decisão da equipa antes de escrever `data/cards.json`.
- **Rationale**: a spec diz que a equipa verifica os factos manualmente (SC-005); o plano não os
  altera.
