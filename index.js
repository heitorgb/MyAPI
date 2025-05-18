const cors = require('cors');
const expreess = require('express');
const pool = require('./db');
const app = expreess();
app.use(cors());
app.use(expreess.json());
app.use(expreess.urlencoded({ extended: true })); // para ler formulário padrão

//post
app.post('/doc', async (req, res) => {
    const { docempparcod,doc_conta_id,doc_cc_id,doctccod, docv,docobs } = req.body;
    try {
        const result = await pool.query('INSERT INTO doc (docempparcod,doc_conta_id,doc_cc_id,doctccod,docv,docobs ) VALUES ($1, $2, $3, $4, $5,$6) RETURNING doctccod,docv,docobs', [docempparcod,doc_conta_id,doc_cc_id,doctccod,docv,docobs]);
        res.status(201).json(result.rows[0]);
        res.json({ mensagem: 'Tudo certo!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get
app.get('/doc', async (req, res) => {
    try {
        const result = await pool.query('SELECT doccod,doctccod,docv,docobs FROM doc');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


//get by id
app.get('/usu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usu WHERE usucod = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
//put
app.put('/usu/:id', async (req, res) => {
    const { id } = req.params;
    const { login, email, senha } = req.body;
    try {
        const result = await pool.query('UPDATE usu SET usuemail = $1, usupassword = $2 WHERE usucod = $3 RETURNING *', [login, email, senha]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
//delete 
app.delete('/doc/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM doc WHERE doccod = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

//delete all
app.delete('/doc', async (req, res) => {
    try {
        const result = await pool.query('delete from doc');
        res.status(200).json({ message: 'All users deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
//start server




//get TC
app.get('/tc', async (req, res) => {
    try {
        const result = await pool.query('SELECT tccod, tcdes FROM tc');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
