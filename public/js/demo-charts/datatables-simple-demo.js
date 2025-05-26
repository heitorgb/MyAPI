window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimple');
    let dataTable;

fetch('/doc')  // exemplo de chamada AJAX
  .then(response => response.json())
  .then(data => {
    const corpo = document.getElementById('corpoTableDash');
    corpo.innerHTML = ''; // limpa

    data.forEach(item => {
      const linha = `
        <tr>
          <td>${dado.contades}</td>
          <td>${dado.catdes}</td>
          <td>${dado.docv}</td>
          <td>${docsta}</td>
        </tr>`;
      corpo.innerHTML += linha;
    });

    // Agora inicializa
    dataTable = new simpleDatatables.DataTable(datatablesSimple);
  });
});
