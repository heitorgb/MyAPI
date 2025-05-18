const express = require('express');
const cors = require('cors');
const app = express();

const docRoutes = require('./routes/docRoutes');
const tcRoutes = require('./routes/tcRoutes');   // separe depois

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(docRoutes);
app.use(tcRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
