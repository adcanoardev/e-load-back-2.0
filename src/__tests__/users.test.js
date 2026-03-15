const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/eload-test");
});

afterAll(async () => {
    await User.deleteMany({ username: /^test_auth/ });
    await mongoose.disconnect();
});

describe("Users Auth API", () => {
    const testUser = {
        username: "test_auth_user",
        name: "Test",
        surnames: "Auth",
        email: "test_auth@example.com",
        password: "password123",
    };

    describe("POST /api/users (registro)", () => {
        it("201 registra un usuario nuevo", async () => {
            const res = await request(app).post("/api/users").send(testUser);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body).not.toHaveProperty("password"); // no exponer password
            expect(res.body.username).toBe(testUser.username);
        });

        it("409 si el username ya existe", async () => {
            const res = await request(app).post("/api/users").send(testUser);
            expect(res.status).toBe(409);
        });
    });

    describe("POST /api/users/login", () => {
        it("200 login correcto devuelve token", async () => {
            const res = await request(app)
                .post("/api/users/login")
                .send({ username: testUser.username, password: testUser.password });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("user");
        });

        it("401 con contraseña incorrecta", async () => {
            const res = await request(app)
                .post("/api/users/login")
                .send({ username: testUser.username, password: "wrongpassword" });
            expect(res.status).toBe(401);
        });

        it("401 con usuario inexistente", async () => {
            const res = await request(app)
                .post("/api/users/login")
                .send({ username: "noexiste", password: "abc123" });
            expect(res.status).toBe(401);
        });

        it("400 si faltan campos requeridos", async () => {
            const res = await request(app)
                .post("/api/users/login")
                .send({ username: "" });
            expect(res.status).toBe(400);
        });
    });

    describe("GET /api/users/check", () => {
        it("401 sin token", async () => {
            const res = await request(app).get("/api/users/check");
            expect(res.status).toBe(401);
        });

        it("200 con token válido", async () => {
            const loginRes = await request(app)
                .post("/api/users/login")
                .send({ username: testUser.username, password: testUser.password });
            const { token } = loginRes.body;

            const res = await request(app)
                .get("/api/users/check")
                .set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.username).toBe(testUser.username);
        });
    });
});
