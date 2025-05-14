const cors = require('cors');
const expreess = require('express');
const pool = require('./db');
const app = expreess();
app.use(cors());
app.use(expreess.json());
//post
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//get
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
//get by id
app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
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
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        const result = await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *', [nome, email, id]);
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
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
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
app.delete('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM usuarios');
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