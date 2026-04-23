// Login de diretoria — envia os dados para o backend Node.js
// em POST {API_BASE_URL}/login/diretoria.

async function fazerLoginDiretoria(event) {
    if (event) event.preventDefault();

    const usuario = document.getElementById('input-username').value;
    const senha = document.getElementById('input-senha').value;

    if (!usuario || !senha) {
        alert('Preencha usuário e senha.');
        return;
    }

    try {
        const resp = await fetch(`${window.API_BASE_URL}/login/diretoria`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha }),
        });

        const data = await resp.json().catch(() => ({}));

        if (!resp.ok) {
            alert(data.error || 'Erro ao fazer login.');
            return;
        }

        localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
        alert(`Bem-vindo(a), ${data.user.nome}!`);
    } catch (err) {
        console.error(err);
        alert(
            'Não foi possível conectar ao servidor. Verifique se o backend está rodando em ' +
                window.API_BASE_URL
        );
    }
}

const formLogin = document.getElementById('box-login');
if (formLogin) formLogin.addEventListener('submit', fazerLoginDiretoria);

const botaoLogin = document.getElementById('botao-login');
if (botaoLogin) botaoLogin.addEventListener('click', fazerLoginDiretoria);
