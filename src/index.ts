import express from "express";
import routes from './routes';
import config from './config';

const PORT = config['dev']['port'] || 4000;

const app = express();


app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
