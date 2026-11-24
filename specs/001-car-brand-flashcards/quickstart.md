# Quickstart: correr e verificar os Flashcards

**Phase 1** | **Date**: 2026-11-24 | **Plan**: [plan.md](./plan.md)

## 1. Pré-requisitos

- Um browser atual (Chrome, Firefox, Safari ou Edge).
- Um servidor estático local, porque o `fetch` do baralho não funciona com `file://`:
  - `npx serve .` (precisa de Node.js), **ou**
  - `py -m http.server 8000` (usa o Python; no Windows o comando é `py`).

## 2. Correr localmente

Na raiz do repositório:

```powershell
npx serve .
```

ou

```powershell
py -m http.server 8000
```

Abrir o endereço indicado (`http://localhost:3000` com `serve`, `http://localhost:8000` com
Python).

## 3. Preparar a verificação

- **Telemóvel**: usar um telemóvel real, ou as ferramentas de programador do browser em modo de
  dispositivo com 360 px de largura.
- **Desktop**: janela com pelo menos 1280 px de largura.
- **Movimento reduzido**: nas ferramentas de programador do Chrome, *Rendering* →
  *Emulate CSS media feature prefers-reduced-motion* → `reduce` (ou ativar no sistema operativo).
- **Contraste**: as cores e rácios estão em [research.md R7](./research.md#r7-cores-e-contraste-wcag-aa);
  confirmar com o inspetor de contraste do browser.

## 4. Checklist de aceitação (Task B)

Fazer cada passo em **telemóvel (360 px)** e em **desktop**. Marcar ✓ nas duas colunas.

### Requisitos funcionais

| # | Requisito | Passo | Resultado esperado | 360 px | Desktop |
|---|---|---|---|---|---|
| 1 | FR-001 | Abrir a app e percorrer o baralho até ao fim | 10 cartões, cada um com frente (marca) e verso (país, ano, fundador(es)) | ☐ | ☐ |
| 2 | FR-001 / R8 | Mudar temporariamente o nome de `data/cards.json` e recarregar com a cache desligada (ferramentas de programador → Network → *Disable cache*, ou janela privada); sem isso o browser pode usar a cópia em cache | Aparece "Não foi possível carregar o baralho."; repor o nome depois | ☐ | ☐ |
| 3 | FR-002 | Clicar (ou tocar) no cartão; clicar de novo | Mostra o verso; volta à frente | ☐ | ☐ |
| 4 | FR-003 | No primeiro cartão, sem virar, tentar carregar em "Sei" e "A rever" | Botões inativos; nada acontece | ☐ | ☐ |
| 5 | FR-003 | Virar, voltar a virar para a frente, carregar em "Sei" | Botões ativos depois de ver o verso; passa ao cartão 2, virado para a frente | ☐ | ☐ |
| 6 | FR-003 | Virar o cartão 2 e carregar em "A rever" | Passa ao cartão 3, virado para a frente | ☐ | ☐ |
| 7 | FR-004 | No cartão 3, carregar em "Baralhar" | "Cartão 1 de 10", barra vazia, botões de marcação inativos, ordem diferente | ☐ | ☐ |
| 8 | FR-004 | Percorrer a sessão baralhada até ao fim, anotando as marcas | Cada uma das 10 marcas aparece uma só vez | ☐ | ☐ |
| 9 | FR-005 | Abrir a app; marcar 2 cartões | "Cartão 1 de 10" e barra vazia; depois "Cartão 3 de 10" e barra a 20 % | ☐ | ☐ |
| 10 | FR-005 / FR-014 | Marcar 3 cartões e carregar em "Anterior" | "Cartão 3 de 10" e barra a 30 % (não recua) | ☐ | ☐ |
| 11 | FR-006 | Fazer uma sessão com 6 "Sei" e 4 "A rever" | Resumo: Sei 6, A rever 4, lista com as 4 marcas certas, botão "Recomeçar", barra a 100 % | ☐ | ☐ |
| 12 | FR-006 | Fazer uma sessão só com "Sei" | Resumo: Sei 10, A rever 0, "Não há cartões a rever." | ☐ | ☐ |
| 13 | FR-007 | No resumo, carregar em "Recomeçar" | Cartão 1 da mesma ordem, de frente, "Cartão 1 de 10", barra vazia, sem marcações | ☐ | ☐ |
| 14 | FR-008 | Percorrer estudo e resumo a 360 px e no desktop | Tudo visível e utilizável, sem scroll horizontal; textos longos quebram linha | ☐ | ☐ |
| 15 | FR-009 | Fazer a sessão só com Tab, Shift+Tab, Enter e Espaço | Todas as ações funcionam; Enter e Espaço viram o cartão; o foco volta ao cartão depois de marcar | ☐ | ☐ |
| 16 | FR-010 | Inspecionar o painel de acessibilidade (ou usar um leitor de ecrã) | Cartão, "Sei", "A rever", "Anterior", "Baralhar", "Recomeçar" e a barra têm nomes acessíveis | ☐ | ☐ |
| 17 | FR-011 | Verificar o contraste do texto e de cada botão | Todos ≥ 4,5:1 | ☐ | ☐ |
| 18 | FR-012 | Ativar `prefers-reduced-motion: reduce` e virar o cartão | A face troca sem animação | ☐ | ☐ |
| 19 | FR-013 | Ler todos os textos, etiquetas e mensagens; ver `lang` no `<html>` | Tudo em português de Portugal; `lang="pt-PT"` | ☐ | ☐ |
| 20 | FR-014 | No cartão 1, ver "Anterior"; no cartão 2, carregar em "Anterior" | Inativo no cartão 1; volta ao cartão 1, de frente, com "Marcação atual: …" e botões de marcação ativos | ☐ | ☐ |
| 21 | FR-014 | Nesse cartão, mudar de "Sei" para "A rever" e acabar a sessão | A marcação é substituída; o resumo conta-a só uma vez, como "A rever" | ☐ | ☐ |

### Critérios de sucesso

| # | Critério | Passo | Resultado esperado | 360 px | Desktop |
|---|---|---|---|---|---|
| 22 | SC-001 | Sessão completa de 10 cartões, cronometrada | Chega ao resumo sem erros nem ecrãs vazios, em menos de 2 minutos | ☐ | ☐ |
| 23 | SC-002 | Repetir 3 sessões com combinações diferentes (incluindo uma com "Anterior") | As contagens coincidem com as marcações, somam 10 e a lista "A rever" está certa | ☐ | ☐ |
| 24 | SC-003 | Todos os passos 1–21 | Todos ✓ nas duas colunas | ☐ | ☐ |
| 25 | SC-004 | Passo 15 | Sessão completa sem rato nem toque | ☐ | ☐ |
| 26 | SC-005 | Comparar os 10 cartões com uma fonte de referência | Factos confirmados; decididos os 4 pontos ambíguos da spec | ☐ | — |

## 5. Verificação rápida das funções de estado (opcional)

Na consola do browser, com a app aberta:

```js
const s = await import('./js/state.js');
```

e seguir os exemplos de [contracts/state-api.md](./contracts/state-api.md#exemplos-de-comportamento-verificáveis-na-consola-do-browser).

## 6. Publicação

Netlify: publicar a raiz do repositório, sem comando de build. Depois de publicar, repetir os
passos 1, 3, 11 e 14 no endereço público.

## 7. Registo da verificação automática (2026-11-24)

Feita pelo agente no browser do Claude, com viewport emulado a 360 × 740 e a 1280 × 800. **Não
substitui** a verificação da equipa: as caixas da secção 4 continuam por marcar até a equipa
repetir os passos num telemóvel real e num desktop (T033).

| Passo | Resultado | Notas |
|---|---|---|
| 1, 3–14, 16, 17, 19–21, 23 | PASS a 360 px | Script de verificação na consola; contrastes medidos entre 5,02:1 e 14,68:1 |
| 2 | PASS | Falhas de `fetch` simuladas (404, JSON inválido, baralho inválido, sem rede); o browser guardava o `cards.json` em cache, ver a nota do passo 2 |
| 14 | PASS a 1280 px | Contentor com 512 px, sem scroll horizontal |
| 15, 25 (SC-004) | PASS a 1280 px | Sessão completa com teclas reais: Tab, Espaço, Tab, Enter × 10; foco no título do resumo; Tab + Enter em "Recomeçar" volta ao cartão |
| 18 (FR-012) | **Por verificar** | O browser do Claude não emula `prefers-reduced-motion`; a regra CSS está carregada |
| 22 (SC-001) | **Por verificar** | Cronometrar uma sessão real |
| 26 (SC-005) | PASS | T003 feita: factos confirmados e decididos pela equipa, fontes em [factos.md](./factos.md) |
| Telemóvel real | **Por verificar** | Só foi testado o viewport emulado |
