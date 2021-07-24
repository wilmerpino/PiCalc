import { Request, Response } from "express";
import config from "./config";
import * as jwt from "jsonwebtoken";

class Controller{
    static Login = async (req: Request, res: Response) => {
        const {login, password} = req.query;
        const jtwSecret = config['dev']['jtwSecret'];

        try{
            if (login === undefined || password === undefined) {
                throw 'No se recibieron los parámetros';
            }

            if(login !== config["dev"]["login"] || password !== config['dev']['password']){
                throw "Usuario o contraseña no válidos";
            }

            const token = jwt.sign({ userId: login},  jtwSecret,  { expiresIn: "9h" });

            res.json({
                success: true,
                message: 'Usuario autenticado',
                token: token
            });
        }
        catch(exception){
            res.status(500).json({
                success: false,
                message: exception
            });
            
        }
    }

    static Pi = async (req: Request, res: Response) => {
        const random_limit = <string>req.query["random_limit"];
        try{
            if (random_limit === undefined){
                throw 'No se recibió el parámetro ramdom_limit';
            }
            let rl = parseInt(random_limit);
            if(rl === NaN){
                throw "Random limit debe ser número";
            }
            if (rl < 0) {
                throw "El random limit debe ser mayor a 0";
            }
            
            const rand =  Math.random() * rl;
            const pi = Math.PI.toFixed(rand);
              res.json({
                numero_random: Math.trunc(rand),
                random_limit: rl,
                pi: pi,
              });
        }
        catch(exception){
            res.status(500).json({
                success: false,
                message: exception,
            });
        }
    }
}

export default Controller;