var createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var path = require('path');
var logger = require('morgan');



const docRoutes = require('./routes/docRoutes');
const tcRoutes = require('./routes/tcRoutes'); 
const loginRoutes = require('./routes/loginRoute');
const contaRoutes = require('./routes/contaRoutes');
const contaTipoRoutes = require('./routes/contaTipoRoutes');
const categoriaController = require('./routes/categoriaRoutes');
const naturezaController = require('./routes/naturezaRoutes');
const pool = require('./db/db');


const app = express();
//----------------------------------------------------------------
// view engine setup arquivos PUG Tratamento de ERros de rotas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/teste', (req, res) => {
  res.json({ message: 'Rota de teste funcionando!' });
});



//----------------------------------------------------------------

app.get('/teste-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado ao PostgreSQL!', hora: result.rows[0].now });
  } catch (err) {
    console.error('Erro ao conectar:', err);
    res.status(500).json({ error: 'Falha na conexão com o banco' });
  }
});

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

app.get('/lancamento_receita',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/lancamento_receita.html')
});

app.get('/lancamento_despesa',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/lancamento_despesa.html')
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

app.get('/categoria',autenticarToken,(req,res)  => {
    res.sendFile(__dirname + '/public/html/categoria.html')
});
app.get('/nav',autenticarToken, (req, res) => {
    res.sendFile(__dirname + '/public/html/nav.html');
});
app.get('/sidebar',autenticarToken, (req, res) => {
    res.sendFile(__dirname + '/public/html/sidebar.html');
});
app.get('/navbar',autenticarToken, (req, res) => {
    res.sendFile(__dirname + '/public/html/navbar.html');
});


app.get('/api/NomeUsuarioLogado', (req, res) => {
  const nomeUsuario = req.cookies.usunome; // O cookie ainda pode ser lido no servidor
  if (nomeUsuario) {
    res.json({ nome: nomeUsuario });
  } else {
    res.status(401).json({ nome: null });
  }
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000/login');
});

