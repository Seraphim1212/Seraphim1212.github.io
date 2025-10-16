const tela = document.getElementById("tela");
let valorAtual = "";
let operador = "";
let valorAnterior = "";

// Botões numéricos
document.querySelectorAll("[data-num]").forEach(botao => {
  botao.addEventListener("click", () => {
    const num = botao.getAttribute("data-num");

    // impede mais de um ponto no mesmo número
    if (num === "." && valorAtual.includes(".")) return;

    valorAtual += num;
    tela.value = valorAtual;
    operacaoDisplay.textContent = valorAnterior + " " + operador + " " + valorAtual;
  });
});

// Botões de operação (menos o '=')
document.querySelectorAll("[data-op]").forEach(botao => {
  const operacao = botao.getAttribute("data-op");

  if (operacao !== "=") {
    botao.addEventListener("click", () => {
      if (valorAtual === "") return; // evita operador no começo
      if (valorAnterior !== "" && operador !== "") {
        calcularResultado();
      }
      operador = operacao;
      valorAnterior = valorAtual;
      valorAtual = "";
      tela.value = valorAnterior + " " + operador;
    });
  }
});

// Botão de igual (único listener)
document.querySelector("[data-op='=']").addEventListener("click", () => {
  if (valorAnterior === "" || valorAtual === "" || operador === "") return;

  let resultado;

  switch (operador) {
    case "+":
      resultado = Number(valorAnterior) + Number(valorAtual);
      break;
    case "-":
      resultado = Number(valorAnterior) - Number(valorAtual);
      break;
    case "*":
      resultado = Number(valorAnterior) * Number(valorAtual);
      break;
    case "/":
      if (Number(valorAtual) === 0) {
        alert("Erro: Divisão por zero");
        limparTudo();
        return;
      }
      resultado = Number(valorAnterior) / Number(valorAtual);
      break;
  }

  tela.value = resultado;
  valorAtual = resultado.toString();
  operador = "";
  valorAnterior = "";
});

// Função para limpar tudo (botão AC)
function limparTudo() {
  valorAtual = "";
  valorAnterior = "";
  operador = "";
  tela.value = "";
}

// Função para apagar último caractere (backspace)
function backspace() {
  valorAtual = valorAtual.slice(0, -1);
  tela.value = valorAtual;
}