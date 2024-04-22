const Usuario = require('../models/Usuario');

exports.obterTodosUsuarios = async (req, res) => {
    try {
        console.log("Obtendo todos os usuários");
        const usuarios = await Usuario.find();
        console.log("Usuários obtidos:", usuarios);
        res.status(200).json(usuarios);
    } catch (erro) {
        console.error("Erro ao obter usuários:", erro.message);
        res.status(400).json({mensagem: erro.message})
    }
};

exports.criarUsuario = async (req, res) => {
    console.log("Dados recebidos para novo usuário:", req.body);
    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });

    try {
        console.log("Salvando novo usuário");
        await novoUsuario.save();
        console.log("Novo usuário criado:", novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (erro) {
        console.error("Erro ao criar usuário:", erro.message);
        res.status(400).json({mensagem: erro.message});
    }
};

exports.atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    console.log("Atualizando usuário ID:", id);
    const atualizacoes = req.body;
    console.log("Dados recebidos para atualização:", atualizacoes);

    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, atualizacoes, { new: true });
        if (!usuarioAtualizado) {
            console.log("Usuário não encontrado, ID:", id);
            return res.status(404).json({mensagem: "Usuário não encontrado"});
        }
        console.log("Usuário atualizado:", usuarioAtualizado);
        res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro.message);
        res.status(400).json({mensagem: erro.message});
    }
};

exports.deletarUsuario = async (req, res) => {
    const { id } = req.params;
    console.log("Deletando usuário ID:", id);

    try {
        const usuarioDeletado = await Usuario.findByIdAndDelete(id);
        if (!usuarioDeletado) {
            console.log("Usuário não encontrado, ID:", id);
            return res.status(404).json({mensagem: "Usuário não encontrado"});
        }
        console.log("Usuário deletado com sucesso, ID:", id);
        res.status(200).json({mensagem: "Usuário deletado com sucesso"});
    } catch (erro) {
        console.error("Erro ao deletar usuário:", erro.message);
        res.status(400).json({mensagem: erro.message});
    }
};
