import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import Termo from "../models/Termos";
import Produto from "../models/Produto";
import Lista from "../models/Lista";
import Categoria from "../models/Categoria";
import mongoose, { Schema } from "mongoose";

class BackupController{
    public async backup(req:Request, res:Response){
        let URI = process.env.URI_BACKUP || '';

        try{
            const usuarios = await Usuario.find({});
            const termos = await Termo.find({});
            const produtos = await Produto.find({});
            const listas = await Lista.find({});
            const categorias = await Categoria.find({});

            const filtrado = usuarios.map(user => {
                if(user.status === "inativo"){
                    user.email = null;
                    user.senha = null;
                    user.nome = null;
                }
                return user
            })
            const secondaryDbConnection = mongoose.createConnection(URI);
            const UsuarioBackup = secondaryDbConnection.model('Usuario', Usuario.schema);
            const TermoBackup = secondaryDbConnection.model('Termo', Termo.schema);
            const ProdutoBackup = secondaryDbConnection.model('Produto', Produto.schema);
            const ListaBackup = secondaryDbConnection.model('Lista', Lista.schema);
            const Categoriabackup = secondaryDbConnection.model('Categoria', Categoria.schema);

            await UsuarioBackup.collection.drop();
            await TermoBackup.collection.drop();
            await ProdutoBackup.collection.drop();
            await ListaBackup.collection.drop();

            filtrado.forEach(async (user) => {
                await UsuarioBackup.create({
                    '_id': user._id,
                    'email': user.email,
                    'nome': user.nome,
                    'senha': user.senha,
                    'termos': user.termos,
                    'listas': user.listas
                });
            })
            termos.forEach(async (termo) => {
                await TermoBackup.create({
                    '_id': termo._id,
                    'versao': termo.versao,
                    'opcoes': termo.opcoes,
                    'conteudo': termo.conteudo
                });
            })
            produtos.forEach(async (produto) => {
                await ProdutoBackup.create({
                    '_id': produto._id,
                    'nome': produto.nome,
                    'quantidade': produto.quantidade,
                    'checked': produto.checked
                });
            })
            listas.forEach(async (lista) => {
                await ListaBackup.create({
                    '_id': lista._id,
                    'nome': lista.nome,
                    'status': lista.status,
                    'produtos': lista.produtos
                })
            })
            categorias.forEach(async (categoria) => {
                await Categoriabackup.create({
                    '_id': categoria._id,
                    'nome': categoria.nome,
                    'produtos': categoria.produtos
                })
            })

            return res.status(200).json({message: 'Backup realizado com sucesso!'});
        } catch(error){
            return res.status(500).json({message: error});
        }
    }
}

export default new BackupController();