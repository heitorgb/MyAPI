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