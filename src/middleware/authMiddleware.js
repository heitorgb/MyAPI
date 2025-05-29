const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const token = req.cookies.token;
    const usuemail = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/login'); 
    }

    try {
        const decoded = jwt.verify(token, 'chave-secreta');

     // gera de novo um novo token com 30 minutos
        const novoToken = jwt.sign({ usuemail: decoded.usuemail }, 'chave-secreta', { expiresIn: '1m' });

    // gauda o novo token com mais 30m em cookies
      res.cookie('token', novoToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: false, // ou true em produção com HTTPS
        });

      req.usuario = decoded; // Armazena dados decodificados para uso futuro

        next();
    } catch (err) {
        return res.status(500).redirect('/login');
    }
}

module.exports = autenticarToken;
