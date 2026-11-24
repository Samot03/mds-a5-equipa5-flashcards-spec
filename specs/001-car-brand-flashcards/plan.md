# Implementation Plan: Flashcards de Estudo — Marcas de Automóveis

**Branch**: `001-car-brand-flashcards` (trabalho em `main`) | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-car-brand-flashcards/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Página única estática que mostra um baralho de 10 marcas de automóveis, um cartão de cada vez.
O estudante vira o cartão, marca-o como "Sei" ou "A rever" (só depois de ver o verso), pode voltar
ao anterior para mudar a marcação, baralhar (o que recomeça a sessão) e, no fim, vê um resumo com
as contagens e a lista a rever, com "Recomeçar".

Abordagem: HTML, CSS e JavaScript nativo em três módulos com responsabilidades separadas: dados
(`data/cards.json`, carregado com `fetch`), lógica de estado (`js/state.js`, funções puras sobre um
único objeto de sessão) e interface (`js/ui.js`, `render(estado)` desenha o ecrã a partir do
estado). `js/app.js` liga tudo. Sem dependências, sem build, publicado no Netlify. Decisões em
[research.md](./research.md).

### Ajustes ao input do plano para cumprir a spec

O input do plano foi escrito antes de algumas clarificações. A spec prevalece (princípio IX), por
isso o plano faz estes ajustes:

| Input original | Ajuste | Motivo |
|---|---|---|
| Sem navegação para trás | Nova função `anterior(s)` e botão "Anterior" | FR-014 (Clarificação Q3) |
| `marcar` só tem efeito se `virado === true` | `marcar` só tem efeito se o verso do cartão atual **já foi visto** (`vistos[id]`) | FR-003 e US2-2: os botões ficam ativos mesmo que o cartão volte à frente, e ao voltar com "Anterior" não é preciso virar de novo |
| Sessão `{ ordem, indice, virado, marcas, terminado }` | Acrescenta `vistos: { [id]: true }` | Necessário para a regra anterior |
| "três ecrãs (estudo, resumo)" | Três ecrãs: **estudo**, **resumo** e **erro** | Edge case da spec: mensagem se o baralho não carregar |
| `recomecar(s, cards)` | `recomecar(s)` | `cards` não é usado; evita parâmetro morto (princípio VI) |
| `baralhar(s, cards)` | `baralhar(s, aleatorio = Math.random)` | Baralha `s.ordem`, não precisa de `cards`; o gerador injetável mantém a função pura e testável |
| `resumo(s)` | `resumo(s, cards)` | A lista "A rever" mostra nomes de marcas, que estão nos cartões |
| — | Funções de leitura `validarBaralho`, `progresso`, `podeMarcar`, `cartaoAtual` | Mantêm a UI sem regras: `ui.js` só desenha o que estas funções devolvem (princípio VI) |
| `npx serve .` | Também `py -m http.server 8000` | O Node não está instalado na máquina onde o plano foi feito; o Python está |

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES2020+ em ES modules nativos (`<script type="module">`)

**Primary Dependencies**: nenhuma

**Storage**: ficheiro estático `data/cards.json` (só leitura); estado da sessão em memória, sem persistência

**Testing**: verificação manual no browser com a checklist do [quickstart.md](./quickstart.md); servidor local `npx serve .` (ferramenta de desenvolvimento, não é dependência da app; alternativa `python -m http.server`)

**Target Platform**: versões atuais de Chrome, Firefox, Safari e Edge, em desktop e telemóvel

**Project Type**: web app estática de página única (sem backend)

**Performance Goals**: virar e marcar com resposta imediata (< 100 ms percebidos); animação de virar ≈ 400 ms

**Constraints**: 360 px de largura mínima sem scroll horizontal; WCAG 2.1 AA; `prefers-reduced-motion`; texto em pt-PT; `fetch` exige servir por HTTP (não funciona com `file://`)

**Scale/Scope**: 1 página, 3 ecrãs, 10 cartões, 1 utilizador por sessão

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Gate | Estado |
|---|---|---|
| I. Simplicidade Técnica | Só HTML/CSS/JS em ES modules; zero dependências, CDNs e build; Netlify estático | ✅ Passa. `npx serve` é só para teste local e não entra na app |
| II. Dados Separados do Código | Baralho em `data/cards.json`, ≥ 8 cartões com frente e verso; mudar cartões não toca no JS | ✅ Passa. A UI lê `cards.length`; nada depende de 10 cartões fixos |
| III. Estado Simples e Explícito | Um único objeto de sessão em memória; UI derivada dele; sem persistência | ✅ Passa. `app.js` guarda uma só variável `sessao`; `render` não lê estado do DOM |
| IV. Responsivo e Mobile-First | CSS mobile-first, 360 px → desktop, sem scroll horizontal | ✅ Passa. Coluna única, `max-width` no desktop, quebra de linha nos textos |
| V. Acessibilidade | Teclado completo, Enter/Espaço viram, etiquetas acessíveis, contraste AA, reduced motion | ✅ Passa. Cartão é `<button>`; gestão de foco definida em research R4 |
| VI. Código Legível | Funções pequenas; camadas dados / estado / UI; sem código morto | ✅ Passa. Parâmetros não usados removidos (ver Ajustes) |
| VII. Âmbito Controlado | Só os critérios da spec; sem extras | ✅ Passa. "Anterior" e o ecrã de erro vêm da spec |
| VIII. Verificabilidade | Cada requisito com passo manual no browser | ✅ Passa. `quickstart.md` mapeia FR-001..014 e SC-001..005 |
| IX. A Especificação Manda | Mudanças de comportamento primeiro na spec; tarefas referem requisitos | ✅ Passa. Divergências do input resolvidas a favor da spec |
| X. Português de Portugal | Todo o texto em pt-PT; `lang="pt-PT"` | ✅ Passa |

Sem violações; a secção Complexity Tracking não é necessária.

**Re-check pós-design (Phase 1)**: ✅ Passa. O data model, os contratos e o quickstart não
introduzem dependências, estado fora do objeto de sessão nem funcionalidades fora da spec.

## Project Structure

### Documentation (this feature)

```text
specs/001-car-brand-flashcards/
├── plan.md              # Este ficheiro
├── research.md          # Phase 0: decisões técnicas
├── data-model.md        # Phase 1: Card, Sessão, Resumo e transições
├── quickstart.md        # Phase 1: como correr e checklist manual FR/SC
├── contracts/
│   ├── cards-json.md    # Formato de data/cards.json
│   ├── state-api.md     # Funções públicas de js/state.js
│   └── ui.md            # Ecrãs, controlos, etiquetas e teclado
├── checklists/
│   └── requirements.md  # Checklist de qualidade da spec
└── tasks.md             # Phase 2 (/speckit-tasks; não criado aqui)
```

### Source Code (repository root)

```text
index.html          # Três ecrãs (estudo, resumo, erro); lang="pt-PT"
styles.css          # Mobile-first; viragem 3D; prefers-reduced-motion
data/
└── cards.json      # Baralho de 10 marcas
js/
├── app.js          # Entrada: carrega o JSON, cria a sessão, liga eventos, chama render
├── state.js        # Funções puras de estado; não toca no DOM
└── ui.js           # render(sessao, cards): desenha o ecrã a partir do estado
```

**Structure Decision**: projeto único na raiz do repositório, que é também a pasta publicada no
Netlify (sem comando de build). Consequência: `specs/`, `.specify/` e `.claude/` também ficam
acessíveis por URL; são só documentação, por isso é aceitável. Se a equipa preferir não os
publicar, a alternativa é mover a app para uma pasta `app/` e publicar essa pasta.

## Complexity Tracking

Não aplicável: o Constitution Check não tem violações.
