# Data Model: Flashcards de Estudo — Marcas de Automóveis

**Phase 1** | **Date**: 2026-11-24 | **Plan**: [plan.md](./plan.md)

## Card (cartão)

Um cartão por marca, lido de `data/cards.json` (formato em [contracts/cards-json.md](./contracts/cards-json.md)).

| Campo | Tipo | Regras | Face |
|---|---|---|---|
| `id` | string | Obrigatório, único no baralho, minúsculas sem espaços (ex.: `"skoda"`) | — |
| `marca` | string | Obrigatório, não vazio | Frente |
| `pais` | string | Obrigatório, não vazio | Verso |
| `ano` | número inteiro | Obrigatório | Verso |
| `fundador` | string | Obrigatório, não vazio; vários fundadores numa só string (ex.: `"Louis, Marcel e Fernand Renault"`) | Verso |

**Validação ao carregar** (FR-001, R8): o baralho é uma lista com pelo menos 8 cartões, todos com
os cinco campos válidos e `id` únicos. Caso contrário, mostra-se o ecrã de erro.

## Sessão (único objeto de estado)

```text
{
  ordem:     [id, ...]                  // ordem atual dos cartões; cada id exatamente uma vez
  indice:    número                     // posição do cartão atual em `ordem` (0 .. ordem.length-1)
  virado:    booleano                   // true = cartão atual mostra o verso
  vistos:    { [id]: true }             // cartões cujo verso já foi visto nesta sessão
  marcas:    { [id]: "sei" | "rever" }  // marcação de cada cartão; ausente = sem marcação
  terminado: booleano                   // true = mostrar o resumo
}
```

**Invariantes**

- `ordem` é uma permutação dos `id` do baralho.
- `0 <= indice < ordem.length`.
- Todo o `id` em `marcas` também está em `vistos` (só se marca o que se viu).
- `terminado === true` só depois de marcar o cartão em `ordem[ordem.length - 1]`.
- A sessão nunca é alterada no lugar: cada transição devolve um objeto novo.

## Valores derivados (não guardados)

| Nome | Cálculo | Usado em |
|---|---|---|
| Cartão atual | o cartão cujo `id` é `ordem[indice]` | Ecrã de estudo |
| Posição | `indice + 1` de `ordem.length` → "Cartão N de T" | FR-005 |
| Marcados | número de chaves em `marcas` | Barra de progresso (FR-005, US3-4) |
| Pode marcar | `vistos[ordem[indice]] === true` | Ativar "Sei" / "A rever" (FR-003) |
| Pode voltar | `indice > 0` | Ativar "Anterior" (FR-014) |
| Marcação atual | `marcas[ordem[indice]]` | Indicação no cartão revisitado (US2-6) |

## Resumo

Calculado por `resumo(sessao, cards)` quando `terminado === true` (FR-006):

```text
{
  sei:    número      // cartões com marca "sei"
  rever:  número      // cartões com marca "rever"
  aRever: [marca, ...] // nomes das marcas a rever, pela ordem da sessão
}
```

Com todos os cartões marcados, `sei + rever === ordem.length` (SC-002).

## Transições de estado

As funções estão em [contracts/state-api.md](./contracts/state-api.md). Qualquer transição
chamada numa situação em que não se aplica devolve a sessão sem mudanças.

| Transição | Pré-condição | Efeito | Requisito |
|---|---|---|---|
| `criarSessao(cards)` | — | `ordem` = ids pela ordem do ficheiro; `indice 0`; tudo o resto vazio/falso | Assumptions (ordem inicial) |
| `virar(s)` | `!terminado` | `virado = !virado`; se passa a `true`, `vistos[id atual] = true` | FR-002 |
| `marcar(s, valor)` | `!terminado`, `vistos[id atual]`, `valor` ∈ {"sei", "rever"} | `marcas[id atual] = valor` (substitui); se não é o último: `indice + 1`, `virado = false`; se é o último: `terminado = true` | FR-003, FR-014, FR-006 |
| `anterior(s)` | `!terminado`, `indice > 0` | `indice - 1`, `virado = false`; `marcas` e `vistos` mantêm-se | FR-014 |
| `baralhar(s, aleatorio)` | — | nova `ordem` (Fisher–Yates); `indice 0`; `virado`, `vistos`, `marcas`, `terminado` limpos | FR-004, Clarificação Q1 |
| `recomecar(s)` | — | mesma `ordem`; `indice 0`; `virado`, `vistos`, `marcas`, `terminado` limpos | FR-007 |

```text
            criarSessao
                 │
                 ▼
   ┌──────── ESTUDO (indice i, virado false/true) ◄───────┐
   │   virar: alterna face e regista visto               │
   │   anterior: i-1 (se i > 0)                           │
   │   marcar (se visto): i+1 ────────────────────────────┘
   │   marcar no último cartão
   ▼
 RESUMO (terminado true) ── recomecar ──► ESTUDO (i = 0, mesma ordem)
 ESTUDO ── baralhar ──► ESTUDO (i = 0, nova ordem)
 (o resumo só tem "Recomeçar", por isso baralhar só está disponível no ecrã de estudo)
```

`recomecar` e `baralhar` também limpam `vistos`, por isso "Sei" e "A rever" voltam a ficar
inativos até se ver o verso de novo.
