//document.addEventListener("DOMContentLoaded", function () {
window.onload = function () {
        fetch('/api/dadosUserLogado', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            const nome = data.nome;
            const usucod = data.usucod;
            const email = data.email;
            const msg = nome ? `${nome}` : 'error ao carrear informações do usuário';
            document.getElementById("nome").value = msg;
            document.getElementById("email").value = email;
        })
        .catch(error => {
            console.error('Erro ao buscar nome:', error);
            document.getElementById("nome").value = 'Usuário não encontrado';
            document.getElementById("email").value = 'Usuário não encontrado';
        });
        };