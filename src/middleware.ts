import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "./config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPlayloader;
  const ENV = process.env.NODE_ENV || "dev";
  const jtwSecret = config[ENV]["jtwSecret"];

  try {
      if (token === undefined) {
        throw "Token no proporcionado";
      } 
      
      jwtPlayloader = <any>jwt.verify(token, jtwSecret);
    res.locals.jwtPlayloader = jwtPlayloader;

    const { userId, userName } = jwtPlayloader;

    const newToken = jwt.sign({ userId, userName }, jtwSecret, {
      expiresIn: "9h",
    });

    res.setHeader("token", newToken);

    next();
  } catch (error) {
    res.status(401).send({ message: "No Autorizado" });
  }
};
