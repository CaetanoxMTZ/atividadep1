const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 
const path = require('path'); 


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html')); 
});


router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email: email });

        if (usuario && usuario.senha === senha) {
            res.redirect('http://localhost:8000'); 
        } else {
          
            res.redirect('/auth/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocorreu um erro interno no servidor');
    }
});

module.exports = router;
