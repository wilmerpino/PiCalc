import express from "express";
import cors from "cors";
const helmet = require("helmet");

import routes from "./routes";
import config from "./config";

//Para no crear la variable de entorno utilizamos dev
const ENV = process.env.NODE_ENV || 'dev';
const PORT = config[ENV]["port"] || 3000;

const app = express();

//Middlewere
const allowedOrigins = ["http://localhost:4000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());


//Agrega encabezados adicionales para mejorar la seguridad del sitio
app.use(helmet());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;