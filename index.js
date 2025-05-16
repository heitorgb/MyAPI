const cors = require('cors');
const expreess = require('express');
const pool = require('./db');
const app = expreess();
app.use(cors());
app.use(expreess.json());
//post
app.post('/usu', async (req, res) => {
    const { usuemail, usupassword } = req.body;
    try {
        const result = await pool.query('INSERT INTO usu (usuemail, usupassword) VALUES ($1, $2) RETURNING usucod,usuemail,usupassword', [usuemail,usupassword]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//get
app.get('/usu', async (req, res) => {
    try {
        const result = await pool.query('SELECT usucod,usuemail,usupassword FROM usu');
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
app.delete('/usu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usu WHERE usucod = $1 RETURNING *', [id]);
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
app.delete('/usu', async (req, res) => {
    try {
        const result = await pool.query('delete from usu');
        res.status(200).json({ message: 'All users deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
//start server




app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
