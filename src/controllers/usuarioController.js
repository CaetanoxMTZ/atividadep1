const Usuario = require('../models/Usuario');


exports.obterTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (erro) {
        res.status(400).json({mensagem: erro.message})
    }
};

// Criar um novo trouxa
exports.criarUsuario = async (req, res) => {
    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });

    try {
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (erro) {
        res.status(400).json({mensagem: erro.message});
    }
};

// Atualizar um trouxa existente
exports.atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const atualizacoes = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };

    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, atualizacoes, { new: true });
        if (!usuarioAtualizado) {
            return res.status(404).json({mensagem: "trouxa não encontrado faz o L"});
        }
        res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        res.status(400).json({mensagem: erro.message});
    }
};

// Deletar um trouxa
exports.deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioDeletado = await Usuario.findByIdAndDelete(id);
        if (!usuarioDeletado) {
            return res.status(404).json({mensagem: "trouxa não encontrado faz o L"});
        }
        res.status(200).json({mensagem: "trouxa deletado com sucesso achou ruim faz o L"});
    } catch (erro) {
        res.status(400).json({mensagem: erro.message});
    }
};
