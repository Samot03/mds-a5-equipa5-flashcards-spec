# Contract: `js/state.js`

Módulo de lógica de estado. Todas as funções são **puras**: não tocam no DOM, não leem nem
escrevem variáveis globais e devolvem uma sessão nova em vez de alterar a recebida. A forma da
sessão está em [../data-model.md](../data-model.md#sessão-único-objeto-de-estado).

Se uma transição não se aplicar (ver pré-condições), devolve a **mesma** sessão recebida, para que
`app.js` possa chamar `render` sem casos especiais.

## Exportações

| Função | Devolve | Pré-condição para ter efeito | Requisitos |
|---|---|---|---|
| `validarBaralho(dados)` | `boolean` | — | FR-001, R8 |
| `criarSessao(cards)` | Sessão | `cards` válido | FR-001 |
| `virar(s)` | Sessão | `!s.terminado` | FR-002 |
| `marcar(s, valor)` | Sessão | `!s.terminado`, verso do cartão atual visto, `valor` é `"sei"` ou `"rever"` | FR-003, FR-006, FR-014 |
| `anterior(s)` | Sessão | `!s.terminado`, `s.indice > 0` | FR-014 |
| `baralhar(s, aleatorio = Math.random)` | Sessão | — | FR-004 |
| `recomecar(s)` | Sessão | — | FR-007 |
| `resumo(s, cards)` | `{ sei, rever, aRever }` | — | FR-006, SC-002 |
| `progresso(s)` | `{ posicao, total, marcados }` | — | FR-005 |
| `podeMarcar(s)` | `boolean` | — | FR-003 |
| `cartaoAtual(s, cards)` | Card | — | FR-002 |

`aleatorio` é uma função sem argumentos que devolve um número em [0, 1), como `Math.random`.

## Exemplos de comportamento (verificáveis na consola do browser)

Com um baralho de 10 cartões e `s0 = criarSessao(cards)`:

- `marcar(s0, "sei") === s0` (o verso ainda não foi visto).
- `s1 = virar(s0)` → `s1.virado === true`, `s1.vistos[s1.ordem[0]] === true`.
- `virar(s1).virado === false`, e `podeMarcar(virar(s1)) === true`.
- `s2 = marcar(s1, "sei")` → `s2.indice === 1`, `s2.virado === false`, `progresso(s2).marcados === 1`.
- `anterior(s2).indice === 0`, e `podeMarcar(anterior(s2)) === true`.
- Marcar o 10.º cartão → `terminado === true`.
- `baralhar(s2).marcas` é `{}` e `baralhar(s2).indice === 0`.
- `recomecar(s2).ordem` é igual a `s2.ordem`, com `marcas` vazio.
