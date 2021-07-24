const expect = require("chai").expect;
const request = require("supertest");
const app = require("../src/index.ts");


describe("POST Login", () => {
  it("Usuario o Contraseña no validos", async () => {
        const res = await request(app)
          .post("/login")
          .send({
            login: "xxxx",
            password: "xxxx",
          });
        
        expect(res.status).to.equal(400);        
  });

    it("Autenticado", async () => {
      const res = await request(app).post("/login").send({
        login: "santiago",
        password: "password",
      });

      expect(res.status).to.equal(200);
    });
});
