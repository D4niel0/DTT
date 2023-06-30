const postHandlers = require("./index");

describe("Endpoints", () => {
  describe("post", () => {
    it("should create", async () => {
      const mockUsers = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];

      const post = {
        userId: 1,
        title: "Titulo",
        body: "Cuerpo del post",
      };
      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1001 } }), // Se envia con 1001
      };

      await postHandlers({ axios }).post(req, res);
      expect(res.status.mock.calls).toEqual([[201]]); // Esperando que el estatus sea el 201
      expect(res.send.mock.calls).toEqual([[{ id: 1001 }]]); // Esperando que se envie el usuario id de 1001
      expect(axios.get.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/users"], // Que el get se hace también con la URL de los get
      ]);
      expect(axios.post.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/posts", post], // Que sea con esta url y el objeto de post
      ]);
    });

    it("should not create if user if does not exist", async () => {
      const mockUsers = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];

      const post = {
        userId: 3,
        title: "Titulo",
        body: "Cuerpo del post",
      };
      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        sendStatus: jest.fn(),
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }), // Se envia con 1000
      };

      await postHandlers({ axios }).post(req, res);
      expect(axios.post.mock.calls).toEqual([]); // Que el post no se ha llamado
      expect(res.sendStatus.mock.calls).toEqual([[500]]); // Recibe un 500
    });
  });
});
