const pool =  require ('../db/db.js');

exports.ListarNatureza = async (req,res) => {
    try{
         const result = await pool.query('select natcod,natdes from natureza');
         res.status(201).json(result.rows);
    }catch(error){
         console.error(error);
         res.status(500).json({ error: 'Erro ao buscar conta' });
    }
};

exports.ListarNaturezaDep = async (req,res) => {
    try{
         const result = await pool.query('select natcod,natdes from natureza where natdes = $1', ['Despesa']);
         res.status(201).json(result.rows);
    }catch(error){
         console.error(error);
         res.status(500).json({ error: 'Erro ao buscar conta' });
    }
};

exports.ListarNaturezaRec = async (req,res) => {
    try{
         const result = await pool.query('select natcod,natdes from natureza where natdes = $1', ['Receita']);
         res.status(201).json(result.rows);
    }catch(error){
         console.error(error);
         res.status(500).json({ error: 'Erro ao buscar conta' });
    }
};