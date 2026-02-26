require("dotenv").config();
const PORT = process.env.PORT;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cors = require("cors");
const express = require("express");
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

const db = require("./src/utils/db.js");
db.connectDB();

const commentsRoutes = require("./src/api/comments/comments.routes.js");
const paymentsRoutes = require("./src/api/payments/payments.routes.js");
const spotsRoutes = require("./src/api/spots/spots.routes.js");
const stationsRoutes = require("./src/api/stations/stations.routes.js");
const usersRoutes = require("./src/api/users/users.routes.js");

server.use("/comments", commentsRoutes);
server.use("/payments", paymentsRoutes);
server.use("/spots", spotsRoutes);
server.use("/stations", stationsRoutes);
server.use("/users", usersRoutes);

server.use("/", (req, res) => {
    res.status(200).send("It Works!")
})
server.use((err, req, res) => {
    return res.status(err.status || 500).json(err.message || "Error");
})
server.use("*", (req, res) => {
    return res.status(404).json({msg: 'Not Found'});
})
server.listen(PORT, () => {
    console.log("Server is running!");
})