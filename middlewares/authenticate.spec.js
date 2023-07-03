const authenticate = require("./authenticate");
describe("Niddlewares", () => {
  describe("authenticate", () => {
    it("Should have id 1", () => {
      const req = {
        header: jest.fn().mockReturnValue("1"), // Tiene que retornar en la cabecera el valor de 1
      };
      const res = {
        sendStatus: jest.fn(),
      };

      const next = jest.fn();

      authenticate(req, res, next);
      expect(req.header.mock.calls).toEqual([
        ["user_id"], // Se llamo a la cabecera de user_id, necesaria para saber si eres administrador
      ]);
      expect(res.sendStatus.mock.calls).toEqual([]); // No es llamado
      expect(next.mock.calls).toEqual([[]]); // Se recibió pero vacio, next si el id es uno no vayan al sendStatus
    });

    it("Should fail if user is not the one with id 1", () => {
      const req = {
        header: jest.fn().mockReturnValue("2"), // Tiene que retornar en la cabecera el valor de 1
      };
      const res = {
        sendStatus: jest.fn(),
      };

      const next = jest.fn();

      authenticate(req, res, next);
      expect(req.header.mock.calls).toEqual([
        ["user_id"], // Se llamo a la cabecera de user_id
      ]);
      expect(res.sendStatus.mock.calls).toEqual([[403]]); // No recibe nada
      expect(next.mock.calls).toEqual([]); // No es llamado
    });
  });
});
