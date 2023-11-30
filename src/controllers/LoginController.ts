import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { generateToken } from "../middlewares";
import Entrada from "../io/entrada";
import UsuarioController from "./UsuarioController";


class LoginController{
    public async login(req: Request, res: Response){
        try{
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ email: email, senha: senha}, '-__v');
            if(usuario){
                if (usuario.termos.aceito === false) {
                        console.log(`Os termos de Usuário foram atualizados, deseja aceitar?`);
                        console.log(`1 - Sim`)
                        console.log(`2 - Não`)
                        let entrada = new Entrada()
                        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
                        switch (opcao) {
                            case 1:
                                usuario.termos.aceito = true
                                usuario.save()
                                console.log(`Termos aceitos com sucesso`)
                                const token = await generateToken(usuario);               
                                res.set('Authorization', `Bearer ${token}`);
                                res.status(200).json({message:'Login realizado com sucesso...', token:token});
                                break
                            case 2:
                                console.log(`Não foi possível concluir a operação`)
                                res.status(500).json({message:'Não foi possível progredir'});
                                usuario.nome = null;
                                usuario.email = null;
                                usuario.senha = null;
                                await usuario.save();
                                break
                            default:
                                console.log(`Operação não entendida :(`)
                        }
                }else{
                    const token = await generateToken(usuario);               
                    res.set('Authorization', `Bearer ${token}`);
                    res.status(200).json({message:'Login realizado com sucesso...', token:token});
                }
            }else{
                res.status(404).json({message: `usuario não encontrado, email ou senha incorreto....`});
            }
        }catch(error){
            console.log(error)
            res.status(500).json(error);
        }
    }

    public async testeLogin(req: Request, res:Response){
        const usuario = await Usuario.findOne({ email: "", senha: ""}, '-__v');
        const token = await generateToken(usuario);
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({message:'Login realizado com sucesso...', token:token});
    }
}



export default new LoginController();