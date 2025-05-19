// Função para buscar os dados do servidor e preencher a tabela
    document.addEventListener("DOMContentLoaded", function () {
        fetch("http://localhost:3000/tc")
            .then(res => res.json())
            .then(dados => {
                const corpoTabela = document.getElementById("corpoTabela");
                corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela

                dados.forEach(dado => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${dado.tccod}</td>
                        <td>${dado.tcdes}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deletar(${dado.tccod})">Deletar</button>
                            <button class="btn btn-warning btn-sm" onclick="editar(${dado.tccod})">Editar</button>  
                        </td>

                    `;
                    corpoTabela.appendChild(tr);
                });
            })
            .catch(erro => console.error(erro));

        // Função para deletar um registro
        window.deletar = function (id) {
            fetch(`http://localhost:3000/tc/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(resposta => {
                    alert("Registro deletado com sucesso!");
                    // Atualiza a tabela após a exclusão
                    document.getElementById("corpoTabela").innerHTML = "";
                    location.reload();
                })
                .catch(erro => {
                    alert("Erro ao deletar o registro.");
                    console.error(erro);
                });
        };
        // Função para editar um registro direto na tabela pois o botão de editar está na tabela    
        window.editar = function (id) {
            const tr = event.target.closest("tr");
            const descricaoCell = tr.querySelector("td:nth-child(2)");
            const descricao = prompt("Digite a nova descrição:", descricaoCell.textContent);
            if (descricao) {
                fetch(`http://localhost:3000/tc/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tcdes: descricao })
                })
                    .then(res => res.json())
                    .then(resposta => {
                        alert("Registro atualizado com sucesso!");
                        // Atualiza a tabela após a edição
                        location.reload();
                    })
                    .catch(erro => {
                        alert("Erro ao atualizar o registro.");
                        console.error(erro);
                    });
            }
        };
        
        
    });
        
    // post
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/tc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resposta => {
        alert("Dados salvos com sucesso!");
        console.log(resposta);
    })
    .catch(erro => {
        alert("Erro ao salvar os dados.");
        console.error(erro);
    });

});