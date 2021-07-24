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

describe("GET PI", () => {
  it("No autenticado", async () => {
    const res = await request(app)
      .get("/pi?random_limit=10")
      .send();

    expect(res.status).to.equal(401);
  });

    it("Parametro no válido", async () => {
      const token = await getToken().then((res) => res);
      const res = await request(app)
        .get("/pi?random_limit=200")
        .send()
        .set("auth", token);

      expect(res.status).to.equal(500);
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

    pi = pi.split(".");
    
    expect(pi[1].length).to.equal(rand);
  });
});
