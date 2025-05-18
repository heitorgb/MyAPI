async function deleteLanc() {

    // escuta o click do botão
    document.getElementById('btnDeleteAll').addEventListener('click', async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/doc', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.mensagem); // opcional
          window.location.href = 'dashboard.html';
        } else {
          alert(data.mensagem || 'Erro ao deletar todos os lançamentos!');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar deletar todos os lançamentos');
      }
    });
  }