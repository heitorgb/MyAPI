const express = require('express');
const cors = require('cors');
const app = express();

const docRoutes = require('./routes/docRoutes');
const tcRoutes = require('./routes/tcRoutes'); 
const loginRoutes = require('./routes/loginRoute');
const pool = require('./db/db');

app.get('/teste-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado ao PostgreSQL!', hora: result.rows[0].now });
  } catch (err) {
    console.error('Erro ao conectar:', err);
    res.status(500).json({ error: 'Falha na conexão com o banco' });
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(docRoutes);
app.use(tcRoutes);
app.use('/',loginRoutes);

app.use(express.static('public/'));



app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/dash',(req,res)  => {
    res.sendFile(__dirname + '/public/html/dashboard.html')
});

app.get('/listar_registros',(req,res)  => {
    res.sendFile(__dirname + '/public/html/listar_registros.html')
});

app.get('/lancamentos',(req,res)  => {
    res.sendFile(__dirname + '/public/html/lancamento.html')
});

app.get('/page',(req,res)  => {
    res.sendFile(__dirname + '/public/html/page.html')
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://127.0.0.1:3000/login');
});
