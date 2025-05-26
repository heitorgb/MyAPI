const express = require('express');
const cors = require('cors');
const app = express();

const docRoutes = require('./routes/docRoutes');
const tcRoutes = require('./routes/tcRoutes'); 
const loginRoutes = require('./routes/loginRoute');
const contaRoutes = require('./routes/contaRoutes');
const contaTipoRoutes = require('./routes/contaTipoRoutes');
const categoriaController = require('./routes/categoriaRoutes');
const naturezaController = require('./routes/naturezaRoutes');
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
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // o endereço do frontend
  credentials: true                //  permite cookies!
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(naturezaController);
app.use(categoriaController);
app.use(contaTipoRoutes);
app.use(contaRoutes);
app.use(docRoutes);
app.use(tcRoutes);
app.use('/',loginRoutes);

app.use(express.static('public/'));

const autenticarToken = require('./src/middleware/authMiddleware');

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/dash',autenticarToken, (req,res)  => {
    res.sendFile(__dirname + '/public/html/dashboard.html')
});

app.get('/listar_registros',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/listar_registros.html')
});

app.get('/lancamentos',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/lancamento.html')
});

app.get('/page',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/page.html')
});

app.get('/cobranca',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/cobranca.html')
});
app.get('/contas',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/conta.html')
});
app.get('/pagina_em_branco',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/pagina-branco.html')
});

app.get('/categoria',(req,res)  => {
    res.sendFile(__dirname + '/public/html/categoria.html')
});
app.get('/sidebar', (req, res) => {
    res.sendFile(__dirname + '/public/html/sidebar.html');
});
app.get('/navbar', (req, res) => {
    res.sendFile(__dirname + '/public/html/navbar.html');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000/login');
});

