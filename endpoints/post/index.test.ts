const request = require("supertest");
const app = require("../../server");

describe("Server", () => {
  describe("Endpoints", () => {
    describe("Post POST", () => {
      it("creates a new port", async () => {
        const response = await request(app) // Esperamos la respuesta de lo que nos devuelve request
          .post("/") // Post a la raiz donde tenemos los post
          .send({ userId: 5 }) // Los datos que le vamos a enviar
          .set("user_id", 1) // La cabecera
          .set("Content-Type", "application/json"); // La cabecera
        expect(response.statusCode).toEqual(201);
        expect(response.body.userId).toEqual(5);
        expect(response.body).toHaveProperty("id"); // Que tenga la propiedad
      });

      it("does not creates a new port", async () => {
        const response = await request(app) // Esperamos la respuesta de lo que nos devuelve request
          .post("/") // Post a la raiz donde tenemos los post
          .send({ userId: 100 }) // Los datos que le vamos a enviar
          .set("user_id", 1) // La cabecera
          .set("Content-Type", "application/json"); // La cabecera
        expect(response.statusCode).toEqual(400);
      });
    });
  });
});
