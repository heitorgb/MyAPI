document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/contaSaldo",{
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(dados => {
            const saldo = document.getElementById("saldo");

            if (dados.length > 0 && dados[0].saldo) {
                const valor = parseFloat(dados[0].saldo);
                saldo.innerText = valor.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            } else {
                saldo.innerText = "Indisponível";
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar saldo:", erro);
            document.getElementById("saldo").innerText = "Erro";
        });
});


// document.addEventListener("DOMContentLoaded", function () {
//   fetch("http://localhost:3000/doc")
//     .then((res) => res.json())
//     .then((dados) => {
//       const corpoTabela = document.getElementById("corpoTableDash");
//       corpoTabela.innerHTML = "";

//       dados.forEach((dado) => {
//         const docsta = dado.docsta === "LA" ? "Aberto" : "Pago";
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//           <td>${dado.contades}</td>
//           <td>${dado.catdes}</td>
//           <td>${dado.docv}</td>
//           <td>${docsta}</td>
//         `;
//         corpoTabela.appendChild(tr);
//       });

//     })
//     .catch((erro) => console.error(erro));
// });

// const datatablesSimple = document.getElementById('datatablesSimple');
// let dataTable;

// fetch('/doc')  // exemplo de chamada AJAX
//   .then(response => response.json())
//   .then(data => {
//     const corpo = document.getElementById('corpoTableDash');
//     corpo.innerHTML = ''; // limpa

//     data.forEach(item => {
//       const linha = `
//         <tr>
//           <td>${dado.contades}</td>
//           <td>${dado.catdes}</td>
//           <td>${dado.docv}</td>
//           <td>${docsta}</td>
//         </tr>`;
//       corpo.innerHTML += linha;
//     });

//     // Agora inicializa
//     dataTable = new simpleDatatables.DataTable(datatablesSimple);
//   });




