import {Router} from 'express';
import Controller from "./controller";

const routes = Router(); 

routes.post("/login", Controller.Login);

routes.get("/pi", Controller.Pi);

export default routes;

