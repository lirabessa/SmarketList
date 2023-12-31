import { Router } from "express";
import UsuarioRoutes from "./UsuarioRoutes";
import LoginController from "../controllers/LoginController";

import ProdutoRoutes from "./ProdutoRoutes";
import CategoriaRoutes from "./CategoriaRoutes";
import ListaRoutes from "./ListaRoutes";
import TermosRoutes from "./TermosRoutes";
import BackupRoutes from "./BackupRoutes";


const routes = Router();

routes.use('/usuario', UsuarioRoutes);
routes.use('/produto', ProdutoRoutes);
routes.use('/categoria', CategoriaRoutes);
routes.use('/lista', ListaRoutes)
routes.use('/termos', TermosRoutes)
routes.use('/backup', BackupRoutes);
routes.post('/login', LoginController.login);
routes.get('/teste-login', LoginController.testeLogin);

export default routes;
