const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

// Conectando a essa gambiarra senseless 
const dbURI = 'mongodb://localhost:27017/padraoMVC'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com MongoDB estabelecida'))
  .catch(err => console.log(err));

// Middleware para parsear JSON
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Cornosssss');
});

//gambi inicial
app.get('/users/:userId/books/:bookId', (req, res) => {
    const { userId, bookId } = req.params;
    console.log(userId);
    console.log(bookId);
    res.send(req.params);
});

// importando rotas xd xd 
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

// Observa a baguncinha 
app.listen(PORT, () => {
    console.log(`O servidor está funcionando na porta: ${PORT}`);
});
