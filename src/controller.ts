import { Request, Response } from "express";

class Controller{
    static Login = async (req: Request, res: Response) => {
        res.json('token');
    }

    static Pi = async (req: Request, res: Response) => {
        res.json('respuesta');
    }
}

export default Controller;