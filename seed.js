require("dotenv").config();
const mongoose = require("mongoose");
const Spot = require("./src/api/spots/spots.model");

const spotsIniciales = [
    {
        power: "22 kW",
        type: "Type2",
        rate: "0.35€/kWh",
        load: 0,
        state: "Libre",
    },
    {
        power: "50 kW",
        type: "CCS2",
        rate: "0.45€/kWh",
        load: 80,
        state: "Ocupado",
    },
    {
        power: "7.4 kW",
        type: "Schuko",
        rate: "0.20€/kWh",
        load: 0,
        state: "Fuera de Servicio",
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectado a MongoDB en Docker... 🐋");

        // Limpiamos la colección 'spots'
        await Spot.deleteMany({});
        console.log("Colección spots limpiada.");

        // Insertamos los nuevos
        await Spot.insertMany(spotsIniciales);
        console.log("¡Spots sembrados con éxito! 🌱");

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Error en el seeding:", error);
        process.exit(1);
    }
};

seedDB();
