const pool = require('../db/db.js');

exports.listarTCs = async (req, res) => {
    try {
        const result = await pool.query('SELECT tccod, tcdes FROM tc');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar tipos de categoria' });
    }
};
