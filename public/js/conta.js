document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/dadosUserLogado')
    .then(res => res.json())
    .then(dados => {
      
      return fetch(`${BASE_URL}/conta/${dados.usucod}`)
    })
    .then(res => res.json())
    .then(dados => {
        const corpoTabela = document.getElementById("corpoTabela");
        corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela

        dados.forEach(dado => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${dado.contades}</td>
            <td>${dado.contatipodes}</td>
            <td>${dado.contavltotal}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deletar(${dado.contacod})">Deletar</button>
            </td>

        `;
            corpoTabela.appendChild(tr);
        });
    })
    .catch(erro => console.error(erro));
});
// delete
window.deletar = function (id) {
    fetch(`${BASE_URL}/conta/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (res.status === 200) {
                alert("Registro deletado com sucesso!");
                location.reload();
            } else if (res.status === 500) {
                alert("Existem registros vinculados a este item. Não é possível deletar.");
            }else {
                alert("Erro ao deletar o registro.");
            }
        })
        
};         

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BASE_URL}/conta`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("tipoConta");

            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.tccod;
                option.textContent = item.tcdes;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar tipos de cobrança:", error);
        });
});
// post
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(`${BASE_URL}/conta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
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