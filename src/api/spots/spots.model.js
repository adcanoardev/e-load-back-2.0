const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema(
    {
        power: {
            type: String,
            required: true,
            enum: ["2.3 kW", "3.7 kW", "7.4 kW", "11 kW", "22 kW", "43 kW", "50 kW"],
        },
        type: { type: String, required: true, enum: ["CHAdeMO", "CCS2", "Type2", "Schuko"] },
        rate: { type: String, required: true },
        load: { type: Number, default: 0, max: 100 },
        station: { type: mongoose.Types.ObjectId, ref: "stations" },
        state: { type: String, required: true, enum: ["Libre", "Ocupado", "Fuera de Servicio"], default: "Libre" },
    },
    {
        timestamps: true,
        collection: "spots",
    },
);

const Spot = mongoose.model("spots", spotSchema);
module.exports = Spot;
