import {Router} from 'express';
import Controller from "./controller";
import { checkJwt } from './middleware';

const routes = Router(); 

routes.post("/login", Controller.Login);

routes.get("/pi", checkJwt, Controller.Pi);

export default routes;

