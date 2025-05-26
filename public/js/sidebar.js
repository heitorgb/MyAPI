fetch('sidebar')
    .then(response => response.text())
    .then(html => {
    document.getElementById('sidebar-container').innerHTML = html;
});
