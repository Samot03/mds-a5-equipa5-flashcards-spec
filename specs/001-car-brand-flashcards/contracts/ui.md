# Contract: interface (`index.html` + `js/ui.js`)

`render(sessao, cards)` desenha sempre o ecrã a partir da sessão; nunca lê estado do DOM
(princípio III). Só um ecrã está visível de cada vez (atributo `hidden` nos outros). Todo o texto
está em português de Portugal e a página tem `lang="pt-PT"` (FR-013).

## Ecrã de estudo

Visível quando o baralho carregou e `!sessao.terminado`.

| Elemento | Conteúdo / estado | Acessibilidade | Requisitos |
|---|---|---|---|
| Indicador de posição | "Cartão N de T" | Texto visível | FR-005 |
| Barra de progresso | Largura = marcados / total | `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax`=T, `aria-valuenow`=marcados, `aria-valuetext`="Cartão N de T" | FR-005, US3-4 |
| Cartão | `<button type="button">` com a face da frente (marca) e a de trás (país, ano, fundador(es)); classe `.virado` quando `sessao.virado` | `aria-label`="Virar cartão. Frente: {marca}" ou "Virar cartão. Verso: {pais}, {ano}, {fundador}" | FR-002, FR-009, FR-010 |
| Anúncio da face | Texto da face visível depois de virar | `aria-live="polite"` | R3 |
| Marcação atual | "Marcação atual: Sei" / "Marcação atual: A rever"; oculto se não houver | Texto visível | US2-6 |
| Botão "Sei" | `disabled` se `!podeMarcar` | Nome acessível "Sei" | FR-003, FR-010 |
| Botão "A rever" | `disabled` se `!podeMarcar` | Nome acessível "A rever" | FR-003, FR-010 |
| Botão "Anterior" | `disabled` se `indice === 0` | Nome acessível "Anterior" | FR-014 |
| Botão "Baralhar" | Sempre ativo | Nome acessível "Baralhar" | FR-004 |

## Ecrã de resumo

Visível quando `sessao.terminado`.

| Elemento | Conteúdo | Requisitos |
|---|---|---|
| Título | "Resumo da sessão" (`tabindex="-1"`, recebe o foco) | FR-006, R4 |
| Barra de progresso | 100 % | US3-3 |
| Contagens | "Sei: X" e "A rever: Y" | FR-006, SC-002 |
| Lista a rever | Nomes das marcas a rever; se Y = 0, "Não há cartões a rever." | FR-006, US4-2 |
| Botão "Recomeçar" | Sempre ativo | FR-007 |

## Ecrã de erro

Visível se o baralho não carregar ou for inválido: mensagem "Não foi possível carregar o
baralho." Sem controlos.

## Eventos e foco

| Ação do utilizador | Chamada em `app.js` | Foco depois de `render` |
|---|---|---|
| Clique, toque, Enter ou Espaço no cartão | `virar` | Mantém-se no cartão |
| "Sei" / "A rever" | `marcar(s, "sei" \| "rever")` | Cartão; ou título do resumo se terminou |
| "Anterior" | `anterior` | Cartão |
| "Baralhar" | `baralhar` | Cartão |
| "Recomeçar" | `recomecar` | Cartão |

## Estilo

- Mobile-first, coluna única centrada, largura máxima ≈ 32 rem; sem scroll horizontal a 360 px
  (FR-008).
- Cores da tabela R7 de [../research.md](../research.md) (FR-011); `:focus-visible` sempre
  visível.
- Viragem 3D de 0,4 s; sem transição com `prefers-reduced-motion: reduce` (FR-012).
