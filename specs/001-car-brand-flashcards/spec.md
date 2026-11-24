# Feature Specification: Flashcards de Estudo — Marcas de Automóveis

**Feature Branch**: `001-car-brand-flashcards` (sem branch própria; trabalho feito em `main`)

**Created**: 2026-11-24

**Status**: Draft

**Input**: User description: "Quero uma app de 'Flashcards de Estudo' para memorizar factos sobre
marcas de automóveis. Um estudante quer rever rapidamente factos básicos sobre marcas de carros e
perceber, no fim de cada sessão, o que já sabe e o que precisa de rever. 10 cartões, um por marca;
frente com o nome da marca; verso com país de origem, ano de fundação e fundador(es)."

## Clarifications

### Session 2026-11-24

- Q: Baralhar a meio da sessão recomeça a sessão ou só reordena os cartões que faltam? → A:
  Recomeça a sessão: limpa todas as marcações, aplica uma nova ordem aleatória e volta ao
  primeiro cartão.
- Q: É possível marcar um cartão sem o ter virado? → A: Não. "Sei" e "A rever" só ficam ativos
  depois de o estudante ver o verso desse cartão.
- Q: É possível voltar ao cartão anterior e mudar a marcação? → A: Sim. Há um botão "Anterior";
  uma nova marcação substitui a anterior.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver e virar um cartão (Priority: P1)

O estudante vê um cartão de cada vez, com o nome da marca na frente. Clica ou toca no cartão para
o virar e ver o verso (país de origem, ano de fundação e fundador(es)). Voltando a clicar, regressa
à frente. Assim testa a memória antes de ver a resposta.

**Why this priority**: é o núcleo de qualquer app de flashcards; sem isto não há estudo.

**Independent Test**: abrir a app, confirmar que aparece só um cartão com o nome de uma marca,
clicar nele e ver o verso, clicar de novo e ver a frente.

**Acceptance Scenarios**:

1. **Given** a app acabou de abrir, **When** o estudante olha para o ecrã, **Then** vê um único
   cartão, virado para a frente, com o nome da primeira marca.
2. **Given** um cartão virado para a frente, **When** o estudante clica ou toca no cartão,
   **Then** o cartão mostra o verso com o país de origem, o ano de fundação e o(s) fundador(es)
   dessa marca.
3. **Given** um cartão virado para o verso, **When** o estudante clica ou toca no cartão,
   **Then** o cartão volta a mostrar a frente.
4. **Given** o cartão tem o foco do teclado, **When** o estudante carrega em Enter ou em Espaço,
   **Then** o cartão vira, tal como com um clique.

---

### User Story 2 - Marcar "Sei" ou "A rever" (Priority: P1)

Depois de virar o cartão e ver a resposta, o estudante marca-o como "Sei" ou "A rever". A app
passa logo ao cartão seguinte, virado para a frente. Se se enganar, pode voltar ao cartão
anterior com "Anterior" e mudar a marcação.

**Why this priority**: separar o que se domina do que não se domina é o objetivo declarado do
estudante; sem marcações não há resumo.

**Independent Test**: confirmar que "Sei" e "A rever" estão inativos no primeiro cartão; virá-lo,
marcá-lo como "Sei" e confirmar que aparece o segundo cartão, virado para a frente; carregar em
"Anterior", mudar a marcação do primeiro cartão para "A rever" e confirmar que fica a valer a
nova marcação.

**Acceptance Scenarios**:

1. **Given** um cartão cujo verso ainda não foi visto, **When** o estudante olha para os botões,
   **Then** "Sei" e "A rever" estão visíveis mas inativos, e tentar usá-los não faz nada.
2. **Given** o estudante virou o cartão e viu o verso, **When** olha para os botões, **Then**
   "Sei" e "A rever" estão ativos, mesmo que volte a virar o cartão para a frente.
3. **Given** um cartão já virado que não é o último, **When** o estudante escolhe "Sei",
   **Then** o cartão fica marcado como "Sei" e aparece o cartão seguinte, virado para a frente.
4. **Given** um cartão já virado que não é o último, **When** o estudante escolhe "A rever",
   **Then** o cartão fica marcado como "A rever" e aparece o cartão seguinte, virado para a
   frente.
5. **Given** o último cartão do baralho, já virado, **When** o estudante o marca, **Then**
   aparece o resumo da sessão (User Story 4).
6. **Given** o estudante está no cartão 2 ou seguinte, **When** carrega em "Anterior", **Then**
   aparece o cartão anterior, virado para a frente, com a indicação da marcação que já tem, e
   "Sei" e "A rever" estão ativos.
7. **Given** o estudante voltou a um cartão marcado como "Sei", **When** escolhe "A rever",
   **Then** a marcação desse cartão passa a "A rever" (substitui a anterior, não se soma) e
   aparece o cartão seguinte.
8. **Given** o estudante está no cartão 1, **When** olha para os botões, **Then** "Anterior"
   está inativo.

---

### User Story 3 - Ver o progresso no baralho (Priority: P2)

O estudante vê sempre em que cartão está e quanto falta, através de um texto do tipo
"Cartão 3 de 10" e de uma barra de progresso.

**Why this priority**: ajuda a gerir a sessão, mas a app já tem valor sem isto.

**Independent Test**: abrir a app e ver "Cartão 1 de 10"; marcar dois cartões e ver
"Cartão 3 de 10" e a barra a avançar.

**Acceptance Scenarios**:

1. **Given** a app acabou de abrir, **When** o estudante olha para o indicador, **Then** vê
   "Cartão 1 de 10" e a barra de progresso vazia.
2. **Given** o estudante marcou 2 cartões, **When** olha para o indicador, **Then** vê
   "Cartão 3 de 10" e a barra preenchida em 2/10 (20 %).
3. **Given** o estudante marcou todos os cartões, **When** aparece o resumo, **Then** a barra de
   progresso está completa (100 %).
4. **Given** o estudante marcou 3 cartões e está no cartão 4, **When** carrega em "Anterior",
   **Then** o indicador mostra "Cartão 3 de 10" e a barra continua em 3/10 (30 %), porque o
   cartão 3 continua marcado.

---

### User Story 4 - Resumo da sessão e recomeçar (Priority: P2)

Depois de marcar o último cartão, o estudante vê um resumo com quantos cartões marcou como "Sei" e
quantos como "A rever", e a lista dos cartões a rever. Um botão "Recomeçar" limpa tudo e volta ao
primeiro cartão.

**Why this priority**: dá ao estudante a perceção do que sabe, que é o "porquê" da app; depende
das marcações (US2).

**Independent Test**: fazer uma sessão completa com 6 "Sei" e 4 "A rever", confirmar as contagens
e os 4 nomes listados, carregar em "Recomeçar" e ver "Cartão 1 de 10" sem marcações.

**Acceptance Scenarios**:

1. **Given** o estudante marcou 6 cartões como "Sei" e 4 como "A rever", **When** aparece o
   resumo, **Then** o resumo mostra 6 "Sei", 4 "A rever" e a lista com os nomes das 4 marcas
   marcadas como "A rever".
2. **Given** o estudante marcou todos os cartões como "Sei", **When** aparece o resumo,
   **Then** o resumo mostra 10 "Sei", 0 "A rever" e a mensagem "Não há cartões a rever." em vez
   de uma lista vazia.
3. **Given** o resumo está visível, **When** o estudante carrega em "Recomeçar", **Then** todas as
   marcações são limpas e aparece o primeiro cartão, virado para a frente, com "Cartão 1 de 10" e
   a barra vazia.

---

### User Story 5 - Baralhar os cartões (Priority: P3)

O estudante pode baralhar os cartões para que apareçam numa ordem aleatória e não decore a ordem.

**Why this priority**: melhora o estudo em sessões repetidas, mas a app funciona sem isto.

**Independent Test**: carregar em "Baralhar" várias vezes e confirmar que a ordem dos cartões
muda e que cada marca continua a aparecer exatamente uma vez por sessão.

**Acceptance Scenarios**:

1. **Given** o primeiro cartão está visível e nada foi marcado, **When** o estudante carrega em
   "Baralhar", **Then** os cartões passam a seguir uma nova ordem aleatória, aparece o primeiro
   cartão dessa ordem virado para a frente e o indicador mostra "Cartão 1 de 10".
2. **Given** o baralho foi baralhado, **When** o estudante percorre a sessão até ao fim,
   **Then** cada uma das 10 marcas aparece exatamente uma vez.
3. **Given** o estudante já marcou alguns cartões, **When** carrega em "Baralhar", **Then** a
   sessão recomeça: todas as marcações são limpas, os cartões passam a seguir uma nova ordem
   aleatória e aparece o primeiro cartão dessa ordem, virado para a frente, com
   "Cartão 1 de 10" e a barra vazia.

---

### Edge Cases

- O cartão seguinte aparece sempre virado para a frente, mesmo que o anterior estivesse virado
  para o verso quando foi marcado.
- Clicar várias vezes seguidas no cartão alterna sempre entre frente e verso, sem saltar cartões.
- Um clique ou toque nos botões "Sei" / "A rever" não vira o cartão; só marca.
- Ao voltar com "Anterior" a um cartão já marcado, os botões de marcação ficam ativos sem ser
  preciso virá-lo de novo, porque o verso já foi visto.
- "Anterior" leva sempre ao cartão imediatamente anterior na ordem atual; pode usar-se várias
  vezes seguidas até ao cartão 1.
- O resumo só aparece quando se marca o último cartão da ordem; voltar atrás e remarcar
  cartões a meio não mostra o resumo.
- No resumo não há botão "Anterior"; o resumo só tem "Recomeçar".
- Se o baralho não puder ser carregado, a app mostra uma mensagem de erro em português
  ("Não foi possível carregar o baralho.") em vez de um ecrã vazio.
- Com 0 cartões "A rever", o resumo mostra uma mensagem em vez de uma lista vazia
  (US4, cenário 2).
- Numa largura de 360 px, o cartão, os botões, o indicador e o resumo cabem no ecrã sem scroll
  horizontal; textos longos (por exemplo, vários fundadores) quebram linha em vez de sair do
  cartão.
- Com a preferência de movimento reduzido ativa no sistema, o cartão vira sem animação (ou com
  animação mínima).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O baralho MUST ter pelo menos 8 cartões, cada um com frente e verso. Esta versão
  tem 10 cartões, um por marca (ver "Conteúdo do baralho").
- **FR-002**: A app MUST mostrar um cartão de cada vez. Clicar ou tocar no cartão MUST virá-lo da
  frente para o verso; voltar a clicar MUST regressá-lo à frente.
- **FR-003**: Cada cartão MUST poder ser marcado como "Sei" ou "A rever". Depois de marcar, a app
  MUST passar ao cartão seguinte, virado para a frente. "Sei" e "A rever" MUST ficar inativos
  até o estudante ter visto o verso desse cartão; depois disso ficam ativos, mesmo que o cartão
  volte à frente.
- **FR-004**: O estudante MUST poder baralhar o baralho, ficando os cartões numa ordem aleatória
  em que cada cartão aparece exatamente uma vez. Baralhar, em qualquer momento da sessão, MUST
  recomeçar a sessão: limpa todas as marcações e mostra o primeiro cartão da nova ordem, virado
  para a frente.
- **FR-005**: Um indicador de progresso MUST mostrar a posição atual no formato
  "Cartão N de T" e uma barra de progresso proporcional ao número de cartões já marcados.
- **FR-006**: Depois de marcado o último cartão, a app MUST mostrar um resumo com o número de
  cartões "Sei", o número de cartões "A rever", a lista dos nomes das marcas a rever e um botão
  "Recomeçar".
- **FR-007**: "Recomeçar" MUST limpar todas as marcações e voltar ao primeiro cartão, virado para
  a frente.
- **FR-008**: A interface MUST ser limpa e legível e funcionar em telemóvel e em desktop: de
  360 px de largura até ao desktop, sem scroll horizontal, com todos os controlos visíveis e
  utilizáveis por toque e por rato.
- **FR-009**: Todas as ações (virar, marcar, voltar ao anterior, baralhar, recomeçar) MUST ser possíveis só com
  teclado; Enter e Espaço MUST virar o cartão em foco.
- **FR-010**: Todos os elementos interativos MUST ter uma etiqueta acessível que descreva a ação
  (por exemplo, "Virar cartão", "Sei", "A rever", "Anterior", "Baralhar", "Recomeçar").
- **FR-011**: Texto e controlos MUST ter contraste de nível WCAG AA.
- **FR-012**: Com a preferência de movimento reduzido ativa, a viragem do cartão MUST acontecer
  sem animação (ou com animação mínima).
- **FR-013**: Todo o texto da interface MUST estar em português de Portugal.
- **FR-014**: Um botão "Anterior" MUST levar ao cartão anterior na ordem atual, virado para a
  frente e com a indicação da marcação que já tem. Marcar de novo esse cartão MUST substituir a
  marcação anterior e passar ao cartão seguinte. "Anterior" MUST estar inativo no cartão 1 e
  não aparece no resumo.

### Conteúdo do baralho

Factos verificados pela equipa a 2026-11-24, com fontes em [factos.md](./factos.md) (ver
Assumptions):

| # | Frente  | País de origem   | Ano de fundação | Fundador(es)                                      |
|---|---------|------------------|-----------------|---------------------------------------------------|
| 1 | Ferrari | Itália           | 1947            | Enzo Ferrari                                      |
| 2 | Porsche | Alemanha         | 1931            | Ferdinand Porsche                                 |
| 3 | Toyota  | Japão            | 1937            | Kiichiro Toyoda                                   |
| 4 | Volvo   | Suécia           | 1927            | Assar Gabrielsson e Gustaf Larson                 |
| 5 | Renault | França           | 1899            | Louis, Marcel e Fernand Renault                   |
| 6 | SEAT    | Espanha          | 1950            | Instituto Nacional de Industria (INI), com a Fiat |
| 7 | Škoda   | República Checa  | 1895            | Václav Laurin e Václav Klement                    |
| 8 | Hyundai | Coreia do Sul    | 1967            | Chung Ju-yung e Chung Se-yung                     |
| 9 | Ford    | Estados Unidos   | 1903            | Henry Ford                                        |
| 10| Tesla   | Estados Unidos   | 2003            | Martin Eberhard e Marc Tarpenning                 |

### Key Entities *(include if feature involves data)*

- **Cartão**: uma marca de automóveis. Atributos: frente (nome da marca) e verso (país de
  origem, ano de fundação, fundador(es)).
- **Baralho**: a coleção ordenada de todos os cartões (10 nesta versão), definida fora da lógica
  da app.
- **Sessão**: uma passagem pelo baralho. Tem a ordem atual dos cartões, o cartão atual, se o
  cartão atual está virado, se o verso de cada cartão já foi visto e a marcação
  ("Sei" / "A rever" / sem marcação) de cada cartão.
  Não é guardada entre visitas.
- **Resumo**: o resultado da sessão: contagem "Sei", contagem "A rever" e lista das marcas a
  rever, calculado a partir das marcações.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Uma sessão completa de 10 cartões faz-se do primeiro cartão ao resumo sem erros
  nem ecrãs vazios, em menos de 2 minutos para quem já sabe as respostas.
- **SC-002**: Em 100 % das sessões de teste, as contagens "Sei" e "A rever" do resumo coincidem
  com as marcações feitas e somam 10, e a lista "A rever" contém exatamente as marcas marcadas
  como tal.
- **SC-003**: Todos os cenários de aceitação desta especificação (a checklist de aceitação da
  Task B do trabalho) se verificam manualmente no browser, em telemóvel (360 px) e em desktop.
- **SC-004**: Uma sessão completa faz-se só com teclado, sem usar rato nem toque.
- **SC-005**: Todos os 10 cartões têm factos confirmados pela equipa numa fonte de referência
  antes da entrega.

## Assumptions

- **Ordem inicial**: sem baralhar, os cartões aparecem pela ordem da tabela "Conteúdo do
  baralho".
- **Recomeçar mantém a ordem**: "Recomeçar" limpa as marcações e volta ao primeiro cartão da
  ordem atual (baralhada ou não); não baralha de novo.
- **Barra de progresso**: mede os cartões já marcados sobre o total (0 % no início, 100 % no
  resumo), enquanto o texto mostra a posição do cartão atual.
- **FR-008 reescrito**: "visualmente atrativa" foi substituído por critérios verificáveis
  (legível, responsivo, sem scroll horizontal), em linha com o princípio VII da constitution
  (o polimento visual não é objetivo) e o princípio VIII (verificabilidade).
- **FR-009 a FR-013** vêm dos princípios V e X da constitution e são incluídos para serem
  verificados na mesma checklist.
- **Factos: decisões da equipa (2026-11-24)**:
  - Ferrari: fica 1947, o ano da marca Ferrari (primeiro carro, o 125 S); a empresa de Enzo
    Ferrari, Auto Avio Costruzioni, é de 1939.
  - Tesla: ficam os fundadores originais, Eberhard e Tarpenning; Elon Musk, JB Straubel e Ian
    Wright são também reconhecidos como cofundadores desde 2009.
  - Škoda: fica 1895, a fundação da Laurin & Klement, que passou a Škoda com a fusão de 1925.
  - SEAT: fundada por uma entidade, não por uma pessoa; acrescenta-se "com a Fiat", parceira
    na fundação.
  - Hyundai: acrescenta-se Chung Se-yung, irmão de Chung Ju-yung e cofundador.
- **Task B**: a "Task B" referida em SC-003 é a checklist de critérios de aceitação do
  enunciado do trabalho; os cenários de aceitação desta spec são a sua base.
- **Fora de âmbito**: contas de utilizador, guardar progresso entre visitas, criar ou editar
  cartões, imagens ou logótipos de marcas, repetição espaçada e sons.
