document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/doc/despesas")
    .then((res) => res.json())
    .then((dados) => {
      const corpoTabela = document.getElementById("corpoTabela");
      corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela
      // Não é necessário buscar por "td" por id, pois eles são criados dinamicamente.
      // Vamos colorir a linha inteira conforme o status

      dados.forEach((dado) => {
        const tr = document.createElement("tr");
        if (dado.docsta === "LA") {
          // tr.style.backgroundColor = "#fff3cd"; // amarelo claro (Bootstrap warning)
          tr.style.color = "#856404"; // texto escuro para contraste
        } else {
          // tr.style.backgroundColor = "#d4edda"; // verde claro (Bootstrap success)
          tr.style.color = "#155724"; // texto escuro para contraste
        }
        const docsta = dado.docsta === "LA" ? "Aberto" : "Pago";
        tr.innerHTML = `
                        <td>${dado.docv}</td>
                        <td>${dado.tcdes}</td>
                        <td>${dado.natdes}</td>
                        <td>${dado.catdes}</td>
                        <td>${dado.contades}</td>
                        <td>${dado.docobs}</td> 
                        <td>
                            ${dado.docsta === "LA" ? '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>': '<i class="fa fa-check-square"></i>'}
                            ${docsta}
                        </td>                              
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deletar(${dado.doccod})">Deletar</button>
                        </td>
                    `;
        corpoTabela.appendChild(tr);
      });
    })
    .catch((erro) => console.error(erro));
});

// Deletar
window.deletar = function (id) {
  fetch(`http://localhost:3000/doc/${id}`, {
    method: "DELETE",
    credentials: "include", // Inclui cookies na requisição, se necessário
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao deletar o registro.");
      return res.json();
    })
    .then(() => {
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

// post
document
  .getElementById("meuFormulario")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    // vamos verificar se o campo docsta está vazio e se sim, vamos colocar LA
    if (!data.docsta || data.docsta.trim() === "") {
      data.docsta = "LA";
    }

    // Buscar o código da natureza específica para 'Despesa'
    try {
      const natRes = await fetch("http://localhost:3000/natureza/despesa");
      if (!natRes.ok) throw new Error("Erro ao buscar natureza");
      const natData = await natRes.json();
      // Supondo que o endpoint retorna um array de naturezas
      if (Array.isArray(natData) && natData.length > 0) {
        data.docnatcod = natData[0].natcod;
      } else {
        console.error("Nenhuma natureza encontrada com natdes = 'D'");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }
    fetch("http://localhost:3000/doc", {
      method: "POST",
      credentials: "include", // Inclui cookies na requisição
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

// Quando o DOM estiver carregado listar as cobranças no options
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:3000/tc")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      return response.json();
    })
    .then((data) => {
      const select = document.getElementById("tipoCobranca");

      data.forEach((cobranca) => {
        const option = document.createElement("option");
        option.value = cobranca.tccod;
        option.textContent = `${cobranca.tcdes}`;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar contas:", error);
    });
});

// Quando o DOM estiver carregado listar as contas no options contas
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:3000/conta", {
    method: "GET",
    credentials: "include", // Inclui cookies na requisição
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      return response.json();
    })
    .then((data) => {
      const select = document.getElementById("contacod");

      data.forEach((conta) => {
        const option = document.createElement("option");
        option.value = conta.contacod;
        option.textContent = `${conta.contades} (${conta.contatipodes})`;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar contas:", error);
    });
});
// listagem de categorias
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/catTodos", {
    method: "GET",
    credentials: "include", // Inclui cookies na requisição
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      return response.json();
    })
    .then((data) => {
      const select = document.getElementById("categoria");

      data.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.catcod;
        option.textContent = `${categoria.catdes}`;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar categorias:", error);
    });
});
