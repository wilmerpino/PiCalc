import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "./config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPlayloader;
  const jtwSecret = config["dev"]["jtwSecret"];

  try {
    jwtPlayloader = <any>jwt.verify(token, jtwSecret);
    res.locals.jwtPlayloader = jwtPlayloader;

    const { userId, userName } = jwtPlayloader;

    const newToken = jwt.sign({ userId, userName }, jtwSecret, {
      expiresIn: "9h",
    });
    res.setHeader("token", newToken);

    next();
  } catch (error) {
    res.status(401).send({ message: "Not Autorized" });
  }
};
