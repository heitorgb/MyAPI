window.onload = function () {
        fetch('/api/dadosUserLogado', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            const nome = data.usunome;
            const email = data.usuemail;
            const cod = data.usucod;
            document.getElementById("nome").value = nome;
            document.getElementById("email").value = email;
            document.getElementById("cod").value = cod;
        })
        .catch(error => {
            console.error('Erro ao buscar nome:', error);
            document.getElementById("nome").value = 'Usuário não encontrado';
            document.getElementById("email").value = 'Usuário não encontrado';
        });
        };


document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/dadosUserLogado', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(userData => {
            const id = userData.usucod;

            return fetch(`${BASE_URL}/auth/atualizarCadastro/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        })
        .then(res => res.json())
        .then(resposta => {
            alert("Dados salvos com sucesso!");
            console.log(resposta);
            location.reload();
        })
        .catch(erro => {
            alert("Erro ao salvar os dados.");
            console.error(erro);
        });
});
