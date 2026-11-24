// Interface: desenha o ecrã a partir do estado, sem regras de estado (contracts/ui.md).

const ecras = {
  estudo: document.getElementById("ecra-estudo"),
  resumo: document.getElementById("ecra-resumo"),
  erro: document.getElementById("ecra-erro"),
};

function mostrarEcra(nome) {
  for (const [chave, ecra] of Object.entries(ecras)) {
    ecra.hidden = chave !== nome;
  }
}

export function render(sessao, cards) {
  mostrarEcra(sessao.terminado ? "resumo" : "estudo");
}

export function mostrarErro() {
  mostrarEcra("erro");
}
