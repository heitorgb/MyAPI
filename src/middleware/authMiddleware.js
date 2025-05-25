const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const token = req.cookies.token; // Pega o token do cookie

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'chave-secreta');
        req.usuario = decoded; // Armazena dados decodificados para uso futuro
        next();
    } catch (err) {
        return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
    }
}

module.exports = autenticarToken;
