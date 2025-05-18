async function get() {
    try {
      const resposta = await fetch('http://localhost:3000/doc/');
      const doc = await resposta.json();

      const corpoTabela = document.getElementById('corpoTabela');
      corpoTabela.innerHTML = '';

      doc.forEach(doc => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${doc.doccod}</td>
          <td>${doc.doctccod}</td>
          <td>${doc.docv}</td>
          <td>${doc.docobs}</td>
        `;
        corpoTabela.appendChild(linha);
      });
    } catch (erro) {
      console.error('Erro ao carregar funcionários:', erro);
    }
  }

  window.onload = function() {
    document.getElementById('btnMostrar').addEventListener('click', get);}