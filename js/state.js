// Lógica de estado: funções puras, sem acesso ao DOM (contracts/state-api.md).

const MINIMO_CARTOES = 8;
const CAMPOS_TEXTO = ["id", "marca", "pais", "fundador"];

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

export function cartaoAtual(s, cards) {
  const id = s.ordem[s.indice];
  return cards.find((cartao) => cartao.id === id);
}
