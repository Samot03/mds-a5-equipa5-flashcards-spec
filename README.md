# Flashcards de Estudo — Spec-Driven Development

**Equipa 5 · Assignment 5 — Spec-Driven vs Vibe Coding** · Metodologias de Desenvolvimento de Software

Um baralho de flashcards para estudar: os cartões viram ao clicar, cada um pode ser marcado como "sei" ou "a rever", e no fim há um resumo da sessão. Foi construído com **Spec-Driven Development** usando o [GitHub Spec Kit](https://github.com/github/spec-kit) e o mesmo agente de IA da outra condição (Claude).

Este repositório é uma das duas condições de uma experiência crossover. A outra condição, o Quiz Relâmpago em Vibe Coding, está em [`mds-a5-equipa5-quiz-vibe`](https://github.com/UTILIZADOR/mds-a5-equipa5-quiz-vibe). A análise comparativa está em [`mds-a5-equipa5-relatorio`](https://github.com/UTILIZADOR/mds-a5-equipa5-relatorio).

## Demo

- **Netlify:** [mds-a5-equipa5-flashcards-spec.netlify.app](https://mds-a5-equipa5-flashcards-spec.netlify.app)

## Método

O fluxo disciplinado do Spec Kit, com **um commit por fase** para que cada artefacto fique visível no histórico:

1. **Constitution**: princípios e restrições do projeto
2. **Specify**: o quê e o porquê (requisitos e user stories)
3. **Clarify**: resolução de ambiguidades, com o professor no papel de Cliente
4. **Plan**: abordagem técnica, estrutura e modelo de dados
5. **Tasks**: lista de tarefas implementáveis
6. **Implement**: implementação pelo agente a partir das tarefas

- Agente de IA: Claude 
- Orçamento de tempo: 3 h no máximo, com a escrita da spec incluída

## Artefactos de especificação

São gerados pelo `specify init` e pelos comandos de cada fase:

| Artefacto | Ficheiro |
| --- | --- |
| Constitution | [`.specify/memory/constitution.md`](.specify/memory/constitution.md) |
| Spec | [`specs/001-car-brand-flashcards/spec.md`](specs/001-car-brand-flashcards/spec.md) |
| Plan | [`specs/001-car-brand-flashcards/plan.md`](specs/001-car-brand-flashcards/plan.md) |
| Tasks | [`specs/001-car-brand-flashcards/tasks.md`](specs/001-car-brand-flashcards/tasks.md) |
| Checklist de verificação | [`specs/001-car-brand-flashcards/quickstart.md`](specs/001-car-brand-flashcards/quickstart.md) |

## Correr localmente

O baralho é carregado com `fetch`, por isso a app tem de ser servida por HTTP (não funciona aberta como ficheiro). Na raiz do repositório:

```
py -m http.server 8000
```

ou `npx serve .`, e abrir `http://localhost:8000`.

## Deploy

Netlify, sem comando de build, com a raiz do repositório como pasta de publicação.
