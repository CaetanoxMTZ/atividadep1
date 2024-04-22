// server.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 3000;
const path = require('path');

require('dotenv').config();

// Conexão ao MongoDB
const dbURI = 'mongodb://localhost:27017/padraoMVC';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com MongoDB estabelecida'))
  .catch(err => console.error('Falha ao conectar com MongoDB:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para parsear corpos de solicitação do tipo form-urlencoded
app.use(express.static(path.join(__dirname, 'views'))); // Ajuste conforme sua estrutura de diretórios
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Configuração de rotas
app.use('/auth', authRoutes); // Todas as rotas de autenticação estão sob '/auth'

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
    console.log('Para verificar o funcionamento, acesse: http://localhost:' + PORT);
});
