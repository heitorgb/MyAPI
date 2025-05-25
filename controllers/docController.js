const pool = require('../db/db.js');

exports.criarDoc = async (req, res) => {
    const { docempparcod, docnatcod ,docsta,docdsta,docv,doctccod,docnum,docobs,doccontacod } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO doc (docempparcod, docnatcod ,docsta,docdsta,docv,doctccod,docnum,docobs,doccontacod) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [docempparcod, docnatcod ,docsta,docdsta,docv,doctccod,docnum,docobs,doccontacod]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir documento' });
    }
};

exports.listarDocs = async (req, res) => {
    try {
        const result = await pool.query('select doccod, docsta, tcdes, natdes, docv, docobs,contades from doc join natureza on natcod = docnatcod join tc on tccod = doctccod join conta on contacod = doccontacod');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar documentos' });
    }
};


exports.deletarDoc = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM doc WHERE doccod = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Documento não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar documento' });
    }
};

exports.deletarTodos = async (req, res) => {
    try {
        await pool.query('DELETE FROM doc');
        res.status(200).json({ message: 'Todos os documentos foram deletados' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar todos documentos' });
    }
};

