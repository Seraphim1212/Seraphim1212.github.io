// Script compartilhado por index.html, loginV.html e loginD.html.
// Só conecta handlers quando o elemento existe na página atual.

const botaoVoltar = document.getElementById('botao-voltar');
if (botaoVoltar) {
    botaoVoltar.addEventListener('click', () => {
        window.location.href = './index.html';
    });
}

const botaoPagDiretoria = document.getElementById('botao-pag-diretoria');
if (botaoPagDiretoria) {
    botaoPagDiretoria.addEventListener('click', () => {
        window.location.href = './loginD.html';
    });
}

const botaoPagVoluntario = document.getElementById('botao-pag-voluntario');
if (botaoPagVoluntario) {
    botaoPagVoluntario.addEventListener('click', () => {
        window.location.href = './loginV.html';
    });
}
