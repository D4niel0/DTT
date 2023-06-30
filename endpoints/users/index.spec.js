const handlers = require("./index");

describe("Endpoints", () => {
  describe("users", () => {
    describe("get", () => {
      it("return to user json", async () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }), // Se resuelve usando ese valor
        };

        const res = {
          status: jest.fn().mockReturnThis(), // Usa el mismo status
          send: jest.fn(), // No devuelve nada
        };

        await handlers({ axios }).get({}, res); // Configurado el controlador
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
      });
    });
    describe("post", () => {
      it("create a resource", async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        const req = {
          body: "request body", // Body que enviamos
        };

        await handlers({ axios }).post(req, res);

        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users", "request body"],
        ]);
      });
    });
    describe("put", () => {
      it("updates resource", async () => {
        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {
          body: "request body",
          params: {
            // Parametros a enviar para el test
            id: 12,
          },
        };

        const res = {
          sendStatus: jest.fn(),
        };

        await handlers({ axios }).put(req, res);

        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.put.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/12", "request body"],
        ]);
      });
    });
    describe("delete", () => {
      it("delete a resource", async () => {
        const axios = {
          delete: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {
          params: {
            id: 54,
          },
        };

        const res = {
          sendStatus: jest.fn(),
        };

        await handlers({ axios }).delete(req, res);

        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.delete.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/54"],
        ]);
      });
    });
  });
});
