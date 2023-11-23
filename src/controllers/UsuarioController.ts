import { Request, Response } from "express";
import Usuario from "../models/Usuario";


class UsuarioController{
    public async cadastrarUsuario(req:Request, res:Response){
        try{
            if(req.body.termos === false || req.body.termos === undefined){
                return res.status(400).json({message: 'Aceite os termos de uso!'});
            }
            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        }catch(error){
            res.status(500).json({message:error});
        }
    }
    public async buscarUsuarioById(req: Request, res: Response){
        try{
            const usuario = await Usuario.findById(req.params.id, '-__v');
            if(usuario){
                res.status(200).json(usuario);
            }else{
                res.status(404).json({message: `usuario ${req.params.id} não encontrado....`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarUsuarioAtivo(req: Request, res: Response) {
        try {
            const usuario = await Usuario.find({ status: 'ativo' }, '-__v');
            
            if (usuario && usuario.length > 0) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Nenhum usuário ativo encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro ao buscar usuários ativos.' });
        }
    }

    public async buscarUsuario(req: Request, res: Response){
        try{
            const usuario = await Usuario.find({});
            if(usuario){
                res.status(200).json(usuario);
            }else{
                res.status(404).json({message: `usuario ${req.params.id} não encontrado....`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarListasUsuario(req: Request, res: Response){
        try{
            const id_usuario = res.locals.jwtpayload._id
            const usuario = await Usuario.findById(id_usuario, '-__v').populate('listas').exec();
            if(usuario){
                res.status(200).json(usuario.listas);
            }else{
                res.status(404).json({message: `usuario ${req.params.id} não encontrado....`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarTermosUsuario(req: Request, res: Response){
        try{
            const id_usuario = res.locals.jwtpayload._id
            const usuario = await Usuario.findById(id_usuario, '-__v').populate('termos').exec();
            if(usuario){
                res.status(200).json(usuario.termos);
            }else{
                res.status(404).json({message: `usuario ${req.params.id} não encontrado....`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async atualizarUsuario(req: Request, res: Response){
        try{
            const usuario = await Usuario.findById(req.params.id, '-__v');
            if(!usuario){
                res.status(404).json({message: `usuario ${req.params.id} não encontrado....`});
            }else{
                const { nome, email } = req.body;
                if(nome){
                    usuario.nome = nome;
                }
                if(email){
                    usuario.email = email;
                }
                await usuario.save();

                res.status(200).json(usuario);
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async excluirUsuario(req: Request, res: Response){
        try{
            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if(!usuario){
                res.status(404).json({message: `usuario ${req.params.id} não encontrado....`});
            }else{
                res.status(404).json({message: `usuario ${req.params.id} excluído com sucesso!`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }
}


export default new UsuarioController();