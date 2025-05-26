fetch('nav')
    .then(response => response.text())
    .then(html => {
    document.getElementById('nav-container').innerHTML = html;
});
