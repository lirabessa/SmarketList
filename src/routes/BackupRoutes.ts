import { Router } from "express";
import { BackupController } from "../controllers";
import { authorization } from "../middlewares";


const routes = Router();

routes.get('/', BackupController.backup);

export default routes;