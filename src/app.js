const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const { errorHandler } = require("./middlewares/errorHandler");
const { notFound } = require("./middlewares/notFound");

const commentsRoutes = require("./routes/comments.routes");
const paymentsRoutes = require("./routes/payments.routes");
const spotsRoutes = require("./routes/spots.routes");
const stationsRoutes = require("./routes/stations.routes");
const usersRoutes = require("./routes/users.routes");

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rutas
app.use("/api/comments", commentsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/spots", spotsRoutes);
app.use("/api/stations", stationsRoutes);
app.use("/api/users", usersRoutes);

// Manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
