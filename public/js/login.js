document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuemail = document.getElementById('email').value;
  const ususenha = document.getElementById('senha').value;

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuemail, ususenha })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'http://localhost:3000/dash';
    } else {
      alert(data.mensagem || 'Email ou senha incorretos!');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao tentar fazer login');
  }
});
