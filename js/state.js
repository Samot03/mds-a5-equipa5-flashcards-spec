// Lógica de estado: funções puras, sem acesso ao DOM (contracts/state-api.md).

const MINIMO_CARTOES = 8;
const CAMPOS_TEXTO = ["id", "marca", "pais", "fundador"];
const VALORES_MARCA = ["sei", "rever"];

function textoValido(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

function cartaoValido(cartao) {
  return (
    cartao !== null &&
    typeof cartao === "object" &&
    CAMPOS_TEXTO.every((campo) => textoValido(cartao[campo])) &&
    Number.isInteger(cartao.ano)
  );
}

export function validarBaralho(dados) {
  if (!Array.isArray(dados) || dados.length < MINIMO_CARTOES) {
    return false;
  }
  const ids = new Set(dados.map((cartao) => cartao?.id));
  return dados.every(cartaoValido) && ids.size === dados.length;
}

export function criarSessao(cards) {
  return {
    ordem: cards.map((cartao) => cartao.id),
    indice: 0,
    virado: false,
    vistos: {},
    marcas: {},
    terminado: false,
  };
}

export function virar(s) {
  if (s.terminado) {
    return s;
  }
  const virado = !s.virado;
  const vistos = virado ? { ...s.vistos, [idAtual(s)]: true } : s.vistos;
  return { ...s, virado, vistos };
}

function idAtual(s) {
  return s.ordem[s.indice];
}

function eUltimo(s) {
  return s.indice === s.ordem.length - 1;
}

export function podeMarcar(s) {
  return s.vistos[idAtual(s)] === true;
}

export function marcar(s, valor) {
  if (s.terminado || !podeMarcar(s) || !VALORES_MARCA.includes(valor)) {
    return s;
  }
  const marcas = { ...s.marcas, [idAtual(s)]: valor };
  if (eUltimo(s)) {
    return { ...s, marcas, terminado: true };
  }
  return { ...s, marcas, indice: s.indice + 1, virado: false };
}

export function anterior(s) {
  if (s.terminado || s.indice === 0) {
    return s;
  }
  return { ...s, indice: s.indice - 1, virado: false };
}

export function progresso(s) {
  return {
    posicao: s.indice + 1,
    total: s.ordem.length,
    marcados: Object.keys(s.marcas).length,
  };
}

export function cartaoAtual(s, cards) {
  const id = s.ordem[s.indice];
  return cards.find((cartao) => cartao.id === id);
}
