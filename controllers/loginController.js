const pool = require('../db/db.js');

exports.listarlogin = async (req, res) => {
    try {
        const result = await pool.query('select usuemail, ususenha from usu');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar documentos' });
    }
};

exports.cadastrarlogin = async (req, res) => {
    const { usuemail, ususenha } = req.body;

    try {
        const result = await pool.query('INSERT INTO usu (usuemail, ususenha) VALUES ($1, $2)', [usuemail, ususenha]);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};


const crypto = require('crypto'); // para gerar hash MD5 (igual ao que está no banco)

exports.validarLogin = async (req, res) => {
    const { usuemail, ususenha } = req.body;

    try {
        const result = await pool.query('SELECT usuemail, ususenha FROM usu WHERE usuemail = $1', [usuemail]);

        if (result.rows.length === 0) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado' });
        }

        const usuario = result.rows[0];

        // Gera o hash MD5 da senha recebida
        const senhaHash = crypto.createHash('md5').update(ususenha).digest('hex');

        if (usuario.ususenha !== senhaHash) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Se tudo ok, retorna sucesso
        res.status(200).json({ mensagem: 'Login bem-sucedido' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao validar login' });
    }
};
