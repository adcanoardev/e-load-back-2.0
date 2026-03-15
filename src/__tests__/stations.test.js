const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Station = require("../models/Station");
const User = require("../models/User");
const { generateSign } = require("../utils/jwt");

let adminToken;
let userToken;
let stationId;

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/eload-test");

    // Crear admin y user de prueba
    const admin = await User.create({
        username: "admin_test",
        name: "Admin",
        surnames: "Test",
        email: "admin@test.com",
        password: "password123",
        rol: "admin",
    });
    const user = await User.create({
        username: "user_test",
        name: "User",
        surnames: "Test",
        email: "user@test.com",
        password: "password123",
        rol: "user",
    });

    adminToken = generateSign(admin._id, admin.username);
    userToken = generateSign(user._id, user.username);
});

afterAll(async () => {
    await User.deleteMany({ username: { $in: ["admin_test", "user_test"] } });
    await Station.deleteMany({ address: /test/i });
    await mongoose.disconnect();
});

describe("Stations API", () => {
    describe("GET /api/stations", () => {
        it("devuelve 200 con array", async () => {
            const res = await request(app).get("/api/stations");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("POST /api/stations", () => {
        it("403 sin token", async () => {
            const res = await request(app).post("/api/stations").send({});
            expect(res.status).toBe(401);
        });

        it("403 con token de usuario normal", async () => {
            const res = await request(app)
                .post("/api/stations")
                .set("Authorization", `Bearer ${userToken}`)
                .send({
                    coordinatesLat: 41.65,
                    coordinatesLng: -0.88,
                    address: "Calle test 1",
                    schedule: "24 Horas",
                });
            expect(res.status).toBe(403);
        });

        it("400 con datos inválidos", async () => {
            const res = await request(app)
                .post("/api/stations")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ address: "X" }); // address demasiado corto, faltan campos
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("details");
        });

        it("201 crea estación con datos válidos", async () => {
            const res = await request(app)
                .post("/api/stations")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                    coordinatesLat: 41.65,
                    coordinatesLng: -0.88,
                    address: "Calle test 123, Zaragoza",
                    schedule: "24 Horas",
                });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.address).toBe("Calle test 123, Zaragoza");
            stationId = res.body._id;
        });
    });

    describe("GET /api/stations/:id", () => {
        it("200 con ID válido", async () => {
            const res = await request(app).get(`/api/stations/${stationId}`);
            expect(res.status).toBe(200);
            expect(res.body._id).toBe(stationId);
        });

        it("400 con ID inválido", async () => {
            const res = await request(app).get("/api/stations/id-invalido");
            expect(res.status).toBe(400);
        });

        it("404 con ID inexistente", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/stations/${fakeId}`);
            expect(res.status).toBe(404);
        });
    });

    describe("DELETE /api/stations/:id", () => {
        it("200 elimina estación como admin", async () => {
            const res = await request(app)
                .delete(`/api/stations/${stationId}`)
                .set("Authorization", `Bearer ${adminToken}`);
            expect(res.status).toBe(200);
        });
    });
});
