document.addEventListener("DOMContentLoaded", function () {
fetch('/api/dadosUserLogado')
    .then(res => res.json())
    .then(dados => {
      
      return fetch(`${BASE_URL}/catTodos/${dados.usucod}`)
    })
    .then((res) => res.json())
    .then((dados) => {
      const corpoTabela = document.getElementById("corpoTabela");
      corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela

      dados.forEach((dado) => {
        const tr = document.createElement("tr");
        const tipo = dado.cattipo === "R" ? "Receita" : "Despesa";
        tr.innerHTML = `
                        <td>${dado.catcod}</td>
                        <td>${dado.catdes}</td>
                        <td>${tipo}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editar(${dado.catcod})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deletar(${dado.catcod})">Deletar</button>
                        </td>

                    `;
        corpoTabela.appendChild(tr);
      });
    })
    .catch((erro) => console.error(erro));
});

// delete
window.deletar = function (id) {
  fetch(`${BASE_URL}/cat/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((resposta) => {
      alert("Registro deletado com sucesso!");
      // Atualiza a tabela após a exclusão
      document.getElementById("corpoTabela").innerHTML = "";
      location.reload();
    })
    .catch((erro) => {
      alert("Erro ao deletar o registro.");
      console.error(erro);
    });
};

//editar
window.editar = function (id) {
  // Exemplo: obtenha os novos valores do usuário (pode ser via prompt ou modal)
  const novoCatDes = prompt("Digite a nova descrição da categoria:");
  const novoCatTipo = prompt("Digite o novo tipo da categoria (R para Receita, D para Despesa):");

  if (!novoCatDes || !novoCatTipo) {
    alert("Descrição e tipo são obrigatórios para editar.");
    return;
  }

  fetch(`${BASE_URL}/cat/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      catdes: novoCatDes,
      cattipo: novoCatTipo
    }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Registro editado com sucesso!");
      // Atualiza a tabela após a edição
      document.getElementById("corpoTabela").innerHTML = "";
      location.reload();
    })
    .catch((erro) => {
      alert("Erro ao editar o registro.");
      console.error(erro);
    });
};

// post
document
  .getElementById("meuFormulario")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
 
    fetch(`${BASE_URL}/catInsert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resposta) => {
        alert("Dados salvos com sucesso!");
        console.log(resposta);
        location.reload();
      })
      .catch((erro) => {
        alert("Erro ao salvar os dados.");
        console.error(erro);
      });
    });
