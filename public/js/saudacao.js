      window.onload = function () {
        fetch('/api/NomeUsuarioLogado', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            const nome = data.nome;
            const msg = nome ? `Bem-vindo, ${nome}!` : 'Bem-vindo, visitante!';
            document.getElementById("bemvindo").innerText = msg;
        })
        .catch(error => {
            console.error('Erro ao buscar nome:', error);
            document.getElementById("bemvindo").innerText = 'Bem-vindo, visitante!';
        });
        };