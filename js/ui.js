// Interface: desenha o ecrã a partir do estado, sem regras de estado (contracts/ui.md).

import { cartaoAtual, podeMarcar, progresso, resumo } from "./state.js";

const NOMES_MARCA = { sei: "Sei", rever: "A rever" };

const ecras = {
  estudo: document.getElementById("ecra-estudo"),
  resumo: document.getElementById("ecra-resumo"),
  erro: document.getElementById("ecra-erro"),
};

const elementos = {
  cartao: document.getElementById("cartao"),
  frenteMarca: document.getElementById("frente-marca"),
  versoPais: document.getElementById("verso-pais"),
  versoAno: document.getElementById("verso-ano"),
  versoFundador: document.getElementById("verso-fundador"),
  anuncioFace: document.getElementById("anuncio-face"),
  marcacaoAtual: document.getElementById("marcacao-atual"),
  botaoSei: document.getElementById("botao-sei"),
  botaoRever: document.getElementById("botao-rever"),
  botaoAnterior: document.getElementById("botao-anterior"),
  tituloResumo: document.getElementById("titulo-resumo"),
  progresso: document.getElementById("progresso"),
  progressoTexto: document.getElementById("progresso-texto"),
  progressoBarra: document.getElementById("progresso-barra"),
  progressoPreenchimento: document.getElementById("progresso-preenchimento"),
  contagemSei: document.getElementById("contagem-sei"),
  contagemRever: document.getElementById("contagem-rever"),
  listaRever: document.getElementById("lista-rever"),
  semRever: document.getElementById("sem-rever"),
};

function mostrarEcra(nome) {
  for (const [chave, ecra] of Object.entries(ecras)) {
    ecra.hidden = chave !== nome;
  }
  elementos.progresso.hidden = nome === "erro";
}

// O texto mostra a posição; a barra mede os cartões já marcados (research R6).
function desenharProgresso(sessao) {
  const { posicao, total, marcados } = progresso(sessao);
  const texto = `Cartão ${posicao} de ${total}`;
  elementos.progressoTexto.textContent = texto;
  elementos.progressoTexto.hidden = sessao.terminado;
  elementos.progressoBarra.setAttribute("aria-valuemax", total);
  elementos.progressoBarra.setAttribute("aria-valuenow", marcados);
  elementos.progressoBarra.setAttribute("aria-valuetext", texto);
  elementos.progressoPreenchimento.style.width = `${(marcados / total) * 100}%`;
}

function textoFaceVisivel(cartao, virado) {
  return virado
    ? `Verso: ${cartao.pais}, ${cartao.ano}, ${cartao.fundador}`
    : `Frente: ${cartao.marca}`;
}

// Id do cartão desenhado por último: só serve para não animar a troca de cartão.
let idDesenhado = null;

// Ao mudar de cartão, a face aparece sem animação; se rodasse, o verso do
// cartão novo ficaria visível durante a viragem (spec, Edge Cases).
function trocarFaceSemAnimacao(virado) {
  elementos.cartao.classList.add("sem-transicao");
  elementos.cartao.classList.toggle("virado", virado);
  void elementos.cartao.offsetWidth; // aplica o estado antes de repor a transição
  elementos.cartao.classList.remove("sem-transicao");
}

function desenharCartao(cartao, virado) {
  elementos.frenteMarca.textContent = cartao.marca;
  elementos.versoPais.textContent = cartao.pais;
  elementos.versoAno.textContent = cartao.ano;
  elementos.versoFundador.textContent = cartao.fundador;
  if (cartao.id === idDesenhado) {
    elementos.cartao.classList.toggle("virado", virado);
  } else {
    trocarFaceSemAnimacao(virado);
    idDesenhado = cartao.id;
  }

  const face = textoFaceVisivel(cartao, virado);
  elementos.cartao.setAttribute("aria-label", `Virar cartão. ${face}`);
  elementos.anuncioFace.textContent = face;
}

function desenharMarcacao(marca) {
  elementos.marcacaoAtual.hidden = !marca;
  elementos.marcacaoAtual.textContent = marca ? `Marcação atual: ${NOMES_MARCA[marca]}` : "";
}

function desenharBotoes(sessao) {
  const bloqueado = !podeMarcar(sessao);
  elementos.botaoSei.disabled = bloqueado;
  elementos.botaoRever.disabled = bloqueado;
  elementos.botaoAnterior.disabled = sessao.indice === 0;
}

function itemLista(texto) {
  const item = document.createElement("li");
  item.textContent = texto;
  return item;
}

function desenharResumo({ sei, rever, aRever }) {
  elementos.contagemSei.textContent = sei;
  elementos.contagemRever.textContent = rever;
  elementos.listaRever.replaceChildren(...aRever.map(itemLista));
  elementos.listaRever.hidden = rever === 0;
  elementos.semRever.hidden = rever > 0;
}

function desenharEstudo(sessao, cards) {
  const cartao = cartaoAtual(sessao, cards);
  desenharCartao(cartao, sessao.virado);
  desenharMarcacao(sessao.marcas[cartao.id]);
  desenharBotoes(sessao);
}

export function render(sessao, cards) {
  mostrarEcra(sessao.terminado ? "resumo" : "estudo");
  desenharProgresso(sessao);
  if (sessao.terminado) {
    desenharResumo(resumo(sessao, cards));
  } else {
    desenharEstudo(sessao, cards);
  }
}

export function focarPrincipal(sessao) {
  const alvo = sessao.terminado ? elementos.tituloResumo : elementos.cartao;
  alvo.focus();
}

export function mostrarErro() {
  mostrarEcra("erro");
}
