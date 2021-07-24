const expect = require("chai").expect;
const request = require("supertest");
const app = require("../src/index.ts");
import config from "../src/config";

const getToken = async () => {
  const ENV = process.env.NODE_ENV || "dev";
  const { login, password } = config["dev"];
  let res = await request(app).post("/login").send({
    login: login,
    password: password,
  });

  return res.body.token;
};

describe("Calculo PI", () => {
  it("No autenticado", async () => {
    const res = await request(app)
      .get("/pi?random_limit=10")
      .send();

    expect(res.status).to.equal(200);
  });

  it("Valor correcto", async () => {
    const token = await getToken().then((res) => res);
    const res = await request(app)
      .get("/pi?random_limit=10")
      .send()
      .set("auth", token);

    let pi = res.body.pi;
    const rand = res.body.random;

    expect(res.status).to.equal(200);

    pi = pi.split(".")[1];
    expect(pi.lenght).to.equal(rand);
  });
});
