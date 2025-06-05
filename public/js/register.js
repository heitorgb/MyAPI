// post
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(resposta => {
            alert("Dados salvos com sucesso!");
            console.log(resposta);
            location.reload(); // Atualiza a página após gravar
        })
        .catch(erro => {
            alert("Erro ao salvar os dados.");
            console.error(erro);
        });

});