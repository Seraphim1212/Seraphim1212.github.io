const botaoVoltar = document.getElementById('botao-voltar');

botaoVoltar.addEventListener('click', () => {
    window.location.href = '../../../index.html';
});


function showModal(mensagem) {
    document.getElementById('modal-text').innerText = mensagem;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
    document.getElementById('cadastro').reset();
}

document.getElementById('cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const usuario = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;


    if (senha.length < 8) {
        showModal("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    const dadosUsuario = {
        nome: nome,
        usuario: usuario,
        email: email,
        senha: senha
    };

    localStorage.setItem('usuarioCadastrado', JSON.stringify(dadosUsuario));
    
    showModal("Cadastro de voluntário realizado com sucesso!");
});
