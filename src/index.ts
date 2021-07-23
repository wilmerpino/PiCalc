import express from "express";
import routes from './routes';

const PORT = process.env.PORT || 3000;

const app = express();


app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
