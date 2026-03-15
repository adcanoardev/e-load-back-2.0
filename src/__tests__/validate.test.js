const { validate, schemas } = require("../middlewares/validate");

// Helper para simular req, res, next
const mockReqRes = (body) => {
    const req = { body };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();
    return { req, res, next };
};

describe("validate middleware", () => {
    describe("schemas.login", () => {
        it("llama next() con datos válidos", () => {
            const { req, res, next } = mockReqRes({ username: "adria", password: "pass123" });
            validate(schemas.login)(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it("devuelve 400 si username está vacío", () => {
            const { req, res, next } = mockReqRes({ username: "", password: "pass123" });
            validate(schemas.login)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).not.toHaveBeenCalled();
        });

        it("devuelve 400 si falta password", () => {
            const { req, res, next } = mockReqRes({ username: "adria" });
            validate(schemas.login)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe("schemas.createStation", () => {
        it("llama next() con datos válidos", () => {
            const { req, res, next } = mockReqRes({
                coordinatesLat: 41.65,
                coordinatesLng: -0.88,
                address: "Calle Mayor 10, Zaragoza",
                schedule: "24 Horas",
            });
            validate(schemas.createStation)(req, res, next);
            expect(next).toHaveBeenCalled();
        });

        it("devuelve 400 con schedule inválido", () => {
            const { req, res, next } = mockReqRes({
                coordinatesLat: 41.65,
                coordinatesLng: -0.88,
                address: "Calle Mayor 10, Zaragoza",
                schedule: "Siempre Abierto", // no está en el enum
            });
            validate(schemas.createStation)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("devuelve 400 si address es demasiado corta", () => {
            const { req, res, next } = mockReqRes({
                coordinatesLat: 41.65,
                coordinatesLng: -0.88,
                address: "C/",
                schedule: "24 Horas",
            });
            validate(schemas.createStation)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe("schemas.createPayment", () => {
        it("llama next() con tarjeta válida", () => {
            const { req, res, next } = mockReqRes({
                cardHolderName: "Adrian Canoar",
                number: "1234567890123456",
                valMonth: "08",
                valYear: "27",
            });
            validate(schemas.createPayment)(req, res, next);
            expect(next).toHaveBeenCalled();
        });

        it("devuelve 400 si el número tiene menos de 16 dígitos", () => {
            const { req, res, next } = mockReqRes({
                cardHolderName: "Adrian Canoar",
                number: "12345",
                valMonth: "08",
                valYear: "27",
            });
            validate(schemas.createPayment)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("devuelve 400 con mes inválido", () => {
            const { req, res, next } = mockReqRes({
                cardHolderName: "Adrian Canoar",
                number: "1234567890123456",
                valMonth: "13", // mes inexistente
                valYear: "27",
            });
            validate(schemas.createPayment)(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});
