import { Router } from "express";
import TermosController from "../controllers/TermosController";

const routes = Router();

routes.get('/buscar/:id', TermosController.buscarTermoPorId);
routes.get('/buscar', TermosController.buscarTermo);
routes.post('/cadastrar', TermosController.cadastrarTermo);
routes.patch('/atualizar/:id', TermosController.atualizarTermo);
routes.delete('/excluir/:id', TermosController.excluirTermo);

export default routes;