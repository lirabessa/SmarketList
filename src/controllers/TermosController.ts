import { Request,Response } from "express";
import Termo from "../models/Termos";

class TermosController{
    public async cadastrarTermo (req: Request, res: Response){
        try{
            const termo = await Termo.create(req.body);
            res.status(201).json(termo);
        }catch(error){
            res.status(500).json({message: error});
        }
    }
    public async buscarTermo(req: Request, res: Response){
        try{
            const termo = await Termo.find();
            res.status(201).json(termo);
        }catch(error){
            res.status(500).json({message: error});
        }
    }

    public async excluirTermo(req: Request, res: Response){
        try{
            const termo = await Termo.findByIdAndDelete(req.params.id);
            res.status(201).json(termo);
        }catch(error){
            res.status(500).json({message: error});
        }
    }

    public async atualizarTermo(req: Request, res: Response){
        try{
            const termo = await Termo.findByIdAndUpdate(req.params.id, req.body);
            res.status(201).json(termo);
        }catch(error){
            res.status(500).json({message: error});
        }
    }

    public async buscarTermoPorId(req: Request, res: Response){
        try{
            const termo = await Termo.findById(req.params.id);
            res.status(201).json(termo);
        }catch(error){
            res.status(500).json({message: error});
        }
    }
}

export default new TermosController();