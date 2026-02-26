const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
    {
        coordinates: {
            lat: {type: Number, required: true},
            lng: {type: Number, required: true}
        },
        address: {type: String, required: true},
        likes: {type: Number, default: 0},
        schedule: {type: String, required: true, enum: ["10:00 - 22:00", "24 Horas", "Cerrada"]},
        spots: [{type: mongoose.Types.ObjectId, ref: 'spots'}]       
    },
    {
        timestamps: true,
        collection: 'stations'
    }
)

const Station = mongoose.model('stations', stationSchema);
module.exports = Station;