# Contract: `data/cards.json`

O baralho é o único ficheiro que a equipa edita para mudar cartões (princípio II). Mudar,
acrescentar ou remover cartões não exige alterar JS, HTML nem CSS.

## Formato

Uma lista JSON de objetos Card (campos e regras em [../data-model.md](../data-model.md#card-cartão)):

```json
[
  { "id": "ferrari", "marca": "Ferrari", "pais": "Itália", "ano": 1947, "fundador": "Enzo Ferrari" },
  { "id": "porsche", "marca": "Porsche", "pais": "Alemanha", "ano": 1931, "fundador": "Ferdinand Porsche" }
]
```

O exemplo mostra 2 dos 10 cartões; os factos completos estão na tabela "Conteúdo do baralho" da
[spec](../spec.md) e têm de ser confirmados pela equipa (SC-005).

## Regras

- Codificação UTF-8 (há nomes como "Škoda" e "Itália").
- Pelo menos 8 cartões; `id` únicos.
- A ordem da lista é a ordem inicial da sessão.
- Campos extra são ignorados; um campo obrigatório em falta ou vazio torna o baralho inválido.

## Comportamento perante um ficheiro inválido

Ficheiro inexistente, JSON mal formado ou baralho que não cumpra as regras → ecrã de erro
"Não foi possível carregar o baralho." (ver [ui.md](./ui.md#ecrã-de-erro)).
