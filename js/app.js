// Ponto de entrada: carrega o baralho, guarda a sessão e liga os eventos.

import { validarBaralho, criarSessao } from "./state.js";
import { render, mostrarErro } from "./ui.js";

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

async function iniciar() {
  try {
    cards = await carregarBaralho();
  } catch (erro) {
    console.error(erro);
    mostrarErro();
    return;
  }
  atualizar(criarSessao(cards));
}

iniciar();
