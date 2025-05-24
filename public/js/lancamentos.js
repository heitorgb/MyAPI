
        document.addEventListener("DOMContentLoaded", function () {
            fetch("http://localhost:3000/doc")
                .then(res => res.json())
                .then(dados => {
                    const corpoTabela = document.getElementById("corpoTabela");
                    corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela

                    dados.forEach(dado => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                        <td>${dado.docv}</td>
                        <td>${dado.tcdes}</td>
                        <td>${dado.natdes}</td>
                        <td>${dado.contades}</td>
                        <td>${dado.docobs}</td>                        
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deletar(${dado.doccod})">Deletar</button>
                        </td>

                    `;
                        corpoTabela.appendChild(tr);
                    });
                })
                .catch(erro => console.error(erro));
        });

        // Deletar
        window.deletar = function (id) {
            fetch(`http://localhost:3000/doc/${id}`, {
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


        // post
        document.getElementById("meuFormulario").addEventListener("submit", function (e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            const data = Object.fromEntries(formData.entries());

            fetch("http://localhost:3000/doc", {
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

        
 // Quando o DOM estiver carregado listar as natureza no options
  document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:3000/natureza")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return response.json();
      })
      .then(data => {
        const select = document.getElementById("natureza");

        data.forEach(natureza => {
          const option = document.createElement("option");
          option.value = natureza.natcod;
          option.textContent = `${natureza.natdes}`;
          select.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar contas:", error);
      });
  });


 // Quando o DOM estiver carregado listar as cobranças no options
  document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:3000/tc")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return response.json();
      })
      .then(data => {
        const select = document.getElementById("tipoCobranca");

        data.forEach(cobranca => {
          const option = document.createElement("option");
          option.value = cobranca.tccod;
          option.textContent = `${cobranca.tcdes}`;
          select.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar contas:", error);
      });
  });


 // Quando o DOM estiver carregado listar as contas no options contas
  document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:3000/conta")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return response.json();
      })
      .then(data => {
        const select = document.getElementById("contacod");

        data.forEach(conta => {
          const option = document.createElement("option");
          option.value = conta.contacod;
          option.textContent = `${conta.contades} (${conta.contatipodes})`;
          select.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar contas:", error);
      });
  });