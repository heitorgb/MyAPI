const pool = require('../db/db.js');

exports.InsertCategoria = async (req, res) => {
    const { catdes,catsta } = req.body;
    try {
        const result = await pool.query('insert into categoria (catdes,catsta) values ($1, $2) RETURNING *', [catdes,catsta]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir categoria' });
    }
};

exports.listarCategoriaReceita = async (req, res) => {
    try {
        const r = "R"
        const result = await pool.query('select catcod,catdes,catsta from categoria where catsta = $1 ', [r]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
};

exports.listarCategoriaDespesa = async (req, res) => {
    try {
        const d = "D"
        const result = await pool.query('select catcod,catdes,catsta from categoria where catsta = $1 ', [d]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
};

exports.deletarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('delete from categoria where catcod = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Categoria não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
};

exports.editarCategoria = async (req, res) => {
    const { id } = req.params;
    const { catdes } = req.body;
    try {
        const result = await pool.query('update categoria set catdes = $1 WHERE catcod = $2 RETURNING *', [catdes, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar Categoria' });
    }
};