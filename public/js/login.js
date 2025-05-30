
document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuemail = document.getElementById('email').value;
  const ususenha = document.getElementById('senha').value;
  const loader = document.getElementById('c-loader');
  loader.style.display = 'block';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 2000);

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuemail, ususenha }),
      credentials: 'include' 
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = `${BASE_URL}/dash`;
    } else {
      alert(data.mensagem || 'Email ou senha incorretos!');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao tentar fazer login');
  }
});
