      window.onload = function () {
        fetch('/api/dadosUserLogado', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            const usucod = data.usucod;
            
            document.getElementById("docusucod").value = usucod;
        })
        .catch(error => {
            console.error('Erro ao buscar codigoUser:', error);
        });
        };