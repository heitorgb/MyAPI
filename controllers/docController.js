const pool = require('../db/db.js');

exports.criarDoc = async (req, res) => {
    const { docempparcod, docnatcod ,docsta,docdsta,docv,doctccod,docnum,docobs,doccontacod,doccatcod } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO doc (docempparcod,docnatcod,docsta,docdsta,docv,doctccod,docnum,docobs,doccontacod,doccatcod) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [docempparcod, docnatcod ,docsta,docdsta,docv,doctccod,docnum,docobs,doccontacod,doccatcod]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir documento' });
    }
};

exports.listarDocs = async (req, res) => {
    try {
        const result = await pool.query('select doccod, docsta, tcdes, natdes, docv, docobs,contades,catdes from doc join natureza on natcod = docnatcod '+
            'join tc on tccod = doctccod '+ 
            'join conta on contacod = doccontacod '+
            'left join categoria on catcod = doccatcod');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar documentos' });
    }
};

exports.listarDocsReceitas = async (req, res) => { 
    try {
        const natureza = "Receita"    
        const result = await pool.query('select doccod, docsta, tcdes, natdes, docv, docobs,contades,catdes from doc '+ 
            'join natureza on natcod = docnatcod '+
            'join tc on tccod = doctccod '+ 
            'join conta on contacod = doccontacod '+
            'left join categoria on catcod = doccatcod '+
            'where natdes = $1', [natureza]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar documentos' });
    }
};

exports.listarDocsDespesas = async (req, res) => { 
    try {
        const natureza = "Despesa"    
        const result = await pool.query('select doccod, docsta, tcdes, natdes, docv, docobs,contades,catdes from doc '+ 
            'join natureza on natcod = docnatcod '+
            'join tc on tccod = doctccod '+ 
            'join conta on contacod = doccontacod '+
            'left join categoria on catcod = doccatcod '+
            'where natdes = $1', [natureza]);
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

