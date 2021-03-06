import { Request, Response } from "express";
import config from "./config";
import * as jwt from "jsonwebtoken";

/**
 * Clase que contiene los métodos utilziados en la Aplicacion
 */
class Controller{
    /**
     * Realiza la autenticacion del usuario
     * @param req Request
     * @param res Response
     */
    static Login = async (req: Request, res: Response) => {
        const { login, password } = req.body;
        const ENV = process.env.NODE_ENV || "dev";
        const jtwSecret = config[ENV]["jtwSecret"];

        try{
            //Valida que el login y el password vengan con valores
            if (login === undefined || password === undefined) {
                throw 'No se recibieron los parámetros';
            }

            //Compara el login y el password con los valores de la configuracion en dev
            if(login !== config["dev"]["login"] || password !== config['dev']['password']){
                throw "Usuario o contraseña no válidos";
            }

            const token = jwt.sign({ userId: login},  jtwSecret,  { expiresIn: "9h" });

            console.log('Usuario autenticado');
            res.json({
                success: true,
                message: 'Usuario autenticado',
                token: token
            });
        }
        catch(exception){
            console.log(exception);
            res.status(400).json({
                success: false,
                message: exception
            });
            
        }
    }

    /**
     * Método que devuelve el valor de PI con la cantodad de decimales de acuerdo al numero aleatorio pasado como parametro
     * @param req Reques
     * @param res Response
     */
    static Pi = async (req: Request, res: Response) => {
        const random_limit = <string>req.query["random_limit"];
        try{
          //Valida que el numero haya sido pasado como parametro
          if (random_limit === undefined) {
            throw "No se recibió el parámetro ramdom_limit";
          }

          //Valida que sea un numero
          if (isNaN(random_limit)) {
            throw "Debe ingresar un número entero ente 0 y 48";
          }

          //Convierte el  parametro a entero
          let rl = parseInt(random_limit);
          //Valida que el número este entre el rango valido para PI
          if (rl < 0 || rl > 48) {
            throw "El random limit debe ser mayor >= 0  y <= 48";
          }

          //calcula el valor del numero aleatorio
          let rand = Math.random() * (rl - rl / 2) + rl / 2;

          //Devuelve solo la parte entera del numero aleatorio
          rand = Math.trunc(rand);

          //Calcula el valor de PI con la cantidad de decimales de rand
          const pi = Math.PI.toFixed(rand);

          console.log(
            `Request: /pi/?random_limit=${random_limit} (el número random fue calculado en ${rand}) Salida: PiCalc": “${pi}"`
          );
          //Respuesta satifactoria
          res.json({
            random: rand,
            random_limit: rl,
            pi: pi,
          });
        }
        catch(exception){
            console.error(exception);
            res.status(500).json({
                success: false,
                message: exception,
            });
        }
    }
}

export default Controller;