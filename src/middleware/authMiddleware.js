const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const token = req.cookies.token;
    const usunome = req.cookies.usunome;
    const usucod = req.cookies.usucod;
    const usuemail = req.cookies.usuemail;

    if (!token) {
        return res.status(401).redirect('/login'); 
    }

    try {
        const decoded = jwt.verify(token, 'chave-secreta');

     // gera de novo um novo token com 10 minutos
        const novoToken = jwt.sign({ usuemail: decoded.usuemail }, 'chave-secreta', { expiresIn: '10m' });

    // gauda o novo token com mais 10m em cookies
        res.cookie('token', novoToken, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false, // ou true em produção com HTTPS
        });
        res.cookie('usunome',usunome,{
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            
        });
            res.cookie('usucod',usucod,{
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            
        });
            res.cookie('usuemail',usuemail,{
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
        });

      req.usuario = decoded; // Armazena dados decodificados para uso futuro

        next();
    } catch (err) {
        return res.status(500).redirect('/login');
    }
}

module.exports = autenticarToken;
