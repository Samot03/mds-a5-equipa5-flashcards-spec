// Ponto de entrada: carrega o baralho, guarda a sessão e liga os eventos.

import {
  validarBaralho,
  criarSessao,
  virar,
  marcar,
  anterior,
  recomecar,
  baralhar,
} from "./state.js";
import { render, mostrarErro, focarPrincipal } from "./ui.js";

const CAMINHO_BARALHO = "data/cards.json";

let cards = [];
let sessao = null;

function atualizar(nova) {
  sessao = nova;
  render(sessao, cards);
}

async function carregarBaralho() {
  const resposta = await fetch(CAMINHO_BARALHO);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao carregar ${CAMINHO_BARALHO}`);
  }
  const dados = await resposta.json();
  if (!validarBaralho(dados)) {
    throw new Error("Baralho inválido");
  }
  return dados;
}

// Depois de mudar de cartão, o foco volta ao cartão (ou ao resumo), para não
// ficar num botão que passou a estar inativo (research R4).
function atualizarEFocar(nova) {
  atualizar(nova);
  focarPrincipal(sessao);
}

function aoClicar(id, acao) {
  document.getElementById(id).addEventListener("click", acao);
}

function ligarEventos() {
  // O <button> nativo também gera "click" com Enter e Espaço (research R3).
  aoClicar("cartao", () => atualizar(virar(sessao)));
  aoClicar("botao-sei", () => atualizarEFocar(marcar(sessao, "sei")));
  aoClicar("botao-rever", () => atualizarEFocar(marcar(sessao, "rever")));
  aoClicar("botao-anterior", () => atualizarEFocar(anterior(sessao)));
  aoClicar("botao-recomecar", () => atualizarEFocar(recomecar(sessao)));
  aoClicar("botao-baralhar", () => atualizarEFocar(baralhar(sessao)));
}

async function iniciar() {
  try {
    cards = await carregarBaralho();
  } catch (erro) {
    console.error(erro);
    mostrarErro();
    return;
  }
  ligarEventos();
  atualizar(criarSessao(cards));
}

iniciar();
