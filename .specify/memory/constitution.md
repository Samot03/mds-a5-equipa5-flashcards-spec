<!--
Sync Impact Report
- Version change: (template, unversioned) → 1.0.0
- Modified principles: n/a (initial ratification; 5 template slots replaced by 10 principles)
  I. Simplicidade Técnica
  II. Dados Separados do Código
  III. Estado Simples e Explícito
  IV. Responsivo e Mobile-First
  V. Acessibilidade
  VI. Código Legível e Fácil de Manter
  VII. Âmbito Controlado
  VIII. Verificabilidade
  IX. A Especificação Manda
  X. Interface em Português de Portugal
- Added sections: Restrições Técnicas e de Publicação; Fluxo de Desenvolvimento; Governação
- Removed sections: none
- Templates: not modified (they read the constitution at runtime)
- Deferred TODOs: none
-->

# Flashcards de Estudo Constitution

## Core Principles

### I. Simplicidade Técnica

- A app MUST ser feita apenas com HTML, CSS e JavaScript nativo, organizado em ES modules.
- MUST NOT usar frameworks, bibliotecas, dependências externas (incluindo CDNs) nem passo de build.
- A app é um site estático de página única, sem backend, publicado no Netlify a partir da pasta
  da app, sem comando de build.

**Justificação**: menos peças significa menos pontos de falha, deploy imediato e código que
qualquer membro da equipa lê sem conhecer ferramentas adicionais.

### II. Dados Separados do Código

- O baralho MUST viver num ficheiro JSON próprio, separado da lógica.
- O baralho MUST ter no mínimo 8 cartões, e cada cartão MUST ter frente e verso.
- Acrescentar, remover ou alterar cartões MUST NOT exigir qualquer alteração ao JavaScript, HTML
  ou CSS.

**Justificação**: o conteúdo de estudo muda mais do que o comportamento; separá-los evita
regressões quando só se quer editar cartões.

### III. Estado Simples e Explícito

- O estado da sessão (ordem dos cartões, cartão atual e marcações "sei"/"a rever") MUST viver em
  memória, num único objeto de estado.
- A interface MUST ser derivada desse objeto; não pode haver estado escondido no DOM ou em
  variáveis soltas.
- Persistência entre visitas NÃO é obrigatória e MUST NOT ser acrescentada sem estar na spec.

**Justificação**: um único objeto de estado torna o comportamento previsível e fácil de
verificar e depurar.

### IV. Responsivo e Mobile-First

- O CSS MUST ser escrito mobile-first.
- A app MUST funcionar corretamente de 360 px de largura até ao desktop.
- MUST NOT existir scroll horizontal em nenhuma largura dentro desse intervalo.

**Justificação**: estudar com flashcards é um uso típico no telemóvel; o ecrã pequeno é o caso
principal, não uma adaptação.

### V. Acessibilidade

- Todas as funcionalidades MUST ser utilizáveis só com teclado; Enter e Espaço MUST virar o
  cartão em foco.
- Todos os elementos interativos MUST ter etiquetas acessíveis (nome acessível claro).
- O contraste de texto e controlos MUST cumprir WCAG 2.1 nível AA.
- A animação de virar MUST respeitar `prefers-reduced-motion` (sem animação, ou reduzida, quando
  o utilizador o pede).

**Justificação**: a app tem de servir quem usa teclado, leitor de ecrã ou é sensível a
movimento, e estes critérios são verificáveis no browser.

### VI. Código Legível e Fácil de Manter

- Funções MUST ser pequenas e ter um só propósito, com nomes descritivos.
- O código MUST separar três camadas: dados (carregamento do baralho), lógica de estado
  (transições do objeto de estado) e interface (renderização e eventos).
- MUST NOT existir código morto, comentado ou não utilizado.

**Justificação**: a separação por camadas permite mudar a interface sem tocar nas regras, e o
código sem ruído é mais fácil de rever.

### VII. Âmbito Controlado

- Implementam-se apenas os critérios de aceitação definidos na especificação.
- MUST NOT ser acrescentadas funcionalidades extra, mesmo que pareçam úteis.
- O polimento visual não é um objetivo: o aspeto MUST ser limpo e legível, sem ir além disso.

**Justificação**: o orçamento de tempo é de 3 horas e a experiência compara métodos, não
quantidade de funcionalidades.

### VIII. Verificabilidade

- Cada requisito MUST poder ser verificado manualmente no browser, com passos e resultado
  esperado claros.
- A conclusão de uma tarefa ou da feature MUST ser confirmada contra a checklist dos critérios
  de aceitação.

**Justificação**: sem testes automáticos, a checklist é a prova de que o que foi pedido está
feito.

### IX. A Especificação Manda

- Qualquer mudança de comportamento MUST atualizar primeiro a spec e só depois o código.
- Cada tarefa MUST referir o requisito (ou critério de aceitação) que implementa.
- Código sem requisito correspondente MUST NOT ser escrito.

**Justificação**: é o princípio central do Spec-Driven Development; garante rastreabilidade
entre spec, tarefas e código.

### X. Interface em Português de Portugal

- Todo o texto visível ao utilizador, incluindo etiquetas acessíveis e mensagens, MUST estar em
  português de Portugal (pós-Acordo Ortográfico).
- O atributo `lang` da página MUST ser `pt-PT`.

**Justificação**: o público-alvo é português e as etiquetas acessíveis são lidas pelo leitor de
ecrã na língua declarada.

## Restrições Técnicas e de Publicação

- Ficheiros da app: um `index.html`, folhas de estilo CSS, módulos JavaScript e o ficheiro JSON
  do baralho, todos na pasta da app.
- O baralho é carregado com `fetch` a partir do ficheiro JSON; por isso a app é testada através
  de um servidor local ou do Netlify, não abrindo o ficheiro diretamente com `file://`.
- Browsers alvo: versões atuais de Chrome, Firefox, Safari e Edge, em desktop e telemóvel.
- Publicação: Netlify, sem comando de build, com a pasta da app como pasta de publicação.

## Fluxo de Desenvolvimento

- Segue-se o fluxo do Spec Kit, com um commit por fase: Constitution → Specify → Clarify →
  Plan → Tasks → Implement.
- As dúvidas de requisitos resolvem-se na fase Clarify, com o professor no papel de Cliente, e
  as respostas ficam registadas na spec.
- O plano MUST incluir uma verificação de conformidade com esta constitution antes de gerar
  tarefas.
- No fim da implementação, a equipa percorre a checklist dos critérios de aceitação no browser,
  incluindo teclado, 360 px de largura e `prefers-reduced-motion`.

## Governance

- Esta constitution prevalece sobre quaisquer outras práticas do projeto. Em caso de conflito
  entre a constitution e a spec, plano ou tarefas, a constitution ganha e o artefacto em
  conflito é corrigido.
- Emendas à constitution são feitas apenas por commit dedicado, que só altera este ficheiro, com
  a justificação da emenda na mensagem do commit.
- Versionamento semântico:
  - MAJOR: remoção ou redefinição incompatível de um princípio ou regra de governação.
  - MINOR: novo princípio ou secção, ou orientação materialmente alargada.
  - PATCH: clarificações, redação ou correções sem mudança de significado.
- Revisão de conformidade: o plano, as tarefas e a implementação final são verificados contra
  estes princípios; qualquer exceção tem de ser justificada por escrito no plano.

**Version**: 1.0.0 | **Ratified**: 2026-11-24 | **Last Amended**: 2026-11-24
