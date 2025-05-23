const pool =  require ('../db/db.js');

exports.ListarTipoConta = async (req,res) => {
    try{
         const result = await pool.query('select contatipocod,contatipodes from contatipo');
         res.status(201).json(result.rows);
    }catch(error){
         console.error(error);
         res.status(500).json({ error: 'Erro ao buscar conta' });
    }
};