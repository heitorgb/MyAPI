document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BASE_URL}/tc`)
        .then(res => res.json())
        .then(dados => {
            const corpoTabela = document.getElementById("corpoTabela");
            corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela

            dados.forEach(dado => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
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
    window.deletar = async function (id) {
        try {
            // Verifica se existe algum registro na doc com doctccod igual ao id
            const docRes = await fetch(`${BASE_URL}/doc?doctccod=${id}`);
            const docData = await docRes.json();

            // Filtra apenas os documentos que possuem o doctccod igual ao id
            const vinculados = Array.isArray(docData)
                ? docData.filter(doc => doc.doctccod == id)
                : [];

            if (vinculados.length > 0) {
                alert("Não é possível excluir: existem documentos vinculados a este registro.");
                return;
            }

            // Se não existir, pode deletar
            await fetch(`${BASE_URL}/tc/${id}`, {
                method: "DELETE"
            });
            alert("Registro deletado com sucesso!");
            location.reload();
        } catch (erro) {
            alert("Erro ao deletar o registro.");
            console.error(erro);
        }
    };
    // Função para editar um registro direto na tabela pois o botão de editar está na tabela    
    window.editar = function (id) {
        const tr = event.target.closest("tr");
        const descricaoCell = tr.querySelector("td:nth-child(2)");
        const valorAtual = descricaoCell.textContent;

        // Cria um input para edição inline
        const input = document.createElement("input");
        input.type = "text";
        input.value = valorAtual;
        input.className = "form-control form-control-sm";
        descricaoCell.innerHTML = "";
        descricaoCell.appendChild(input);
        input.focus();

        // Salva ao pressionar Enter ou ao perder o foco
        function salvar() {
            const novaDescricao = input.value.trim();
            if (novaDescricao && novaDescricao !== valorAtual) {
                fetch(`${BASE_URL}/tc/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tcdes: novaDescricao })
                })
                    .then(res => res.json())
                    .then(resposta => {
                        alert("Registro atualizado com sucesso!");
                        descricaoCell.textContent = novaDescricao;
                    })
                    .catch(erro => {
                        alert("Erro ao atualizar o registro.");
                        descricaoCell.textContent = valorAtual;
                        console.error(erro);
                    });
            } else {
                descricaoCell.textContent = valorAtual;
            }
        }

        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                salvar();
            } else if (e.key === "Escape") {
                descricaoCell.textContent = valorAtual;
            }
        });

        input.addEventListener("blur", salvar);
    };
});
// post
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(`${BASE_URL}/tc`, {
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