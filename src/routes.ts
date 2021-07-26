import {Router} from 'express';
import Controller from "./controller";
import { checkJwt } from './middleware';

const routes = Router(); 

routes.post("/api/login", Controller.Login);

routes.get("/api/pi", checkJwt, Controller.Pi);

export default routes;

