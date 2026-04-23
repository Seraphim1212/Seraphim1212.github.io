// Cadastro de diretoria — envia os dados para o backend Node.js
// em POST {API_BASE_URL}/cadastro/diretoria.

const botaoVoltar = document.getElementById('botao-voltar');
if (botaoVoltar) {
    botaoVoltar.addEventListener('click', () => {
        window.location.href = './index.html';
    });
}

function showModal(mensagem) {
    document.getElementById('modal-text').innerText = mensagem;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
    const form = document.getElementById('cadastro');
    if (form) form.reset();
}

document.getElementById('cadastro').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const usuario = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const cpfEl = document.getElementById('cpf');
    const cargoEl = document.getElementById('cargo');
    const telefoneEl = document.getElementById('telefone');

    const cpf = cpfEl ? cpfEl.value || null : null;
    const cargo = cargoEl ? cargoEl.value || null : null;
    const telefone = telefoneEl ? telefoneEl.value || null : null;

    if (senha.length < 8) {
        showModal('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    try {
        const resp = await fetch(`${window.API_BASE_URL}/cadastro/diretoria`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                usuario,
                email,
                senha,
                cpf,
                cargo,
                telefone,
            }),
        });

        const data = await resp.json().catch(() => ({}));

        if (!resp.ok) {
            showModal(data.error || 'Erro ao cadastrar. Tente novamente.');
            return;
        }

        showModal('Cadastro de diretoria realizado com sucesso!');
    } catch (err) {
        console.error(err);
        showModal(
            'Não foi possível conectar ao servidor. Verifique se o backend está rodando em ' +
                window.API_BASE_URL
        );
    }
});
