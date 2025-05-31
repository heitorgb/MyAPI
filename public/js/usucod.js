      window.onload = function () {
        fetch('/api/usucod', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            const usucod = data.usucod;
            
            document.getElementById("docusucod").value = usucod;
        })
        .catch(error => {
            console.error('Erro ao buscar nome:', error);
            document.getElementById("bemvindo").innerText = 'Bem-vindo, visitante!';
        });
        };