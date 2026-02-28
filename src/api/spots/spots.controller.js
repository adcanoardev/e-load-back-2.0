const mongoose = require("mongoose");
const Station = require("../stations/stations.model");
const User = require("../users/users.model");
const Spot = require("./spots.model");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const createSpot = async (req, res) => {
    try {
        const stationId = req.body.station;

        // ✅ valida stationId
        if (!isValidId(stationId)) {
            return res.status(400).json({ msg: "Invalid station id" });
        }

        const newSpot = new Spot(req.body);
        await newSpot.save();

        await Station.findByIdAndUpdate(stationId, { $push: { spots: newSpot._id } });

        return res.status(200).json(newSpot);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const updateSpot = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ evita CastError
        if (!isValidId(id)) {
            return res.status(400).json({ msg: "Invalid spot id" });
        }

        const spot = await Spot.findById(id);
        if (!spot) {
            return res.status(404).json({ msg: "Not Found" });
        }

        // (opcional) si permites cambiar station, valida también
        if (req.body.station && !isValidId(req.body.station)) {
            return res.status(400).json({ msg: "Invalid station id" });
        }

        const spotUpdated = await Spot.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(spotUpdated);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const deleteSpot = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ evita CastError -> 500
        if (!isValidId(id)) {
            return res.status(400).json({ msg: "Invalid spot id" });
        }

        const spot = await Spot.findById(id);
        if (!spot) {
            return res.status(404).json({ msg: "Not Found" });
        }

        const stationId = spot.station?.toString();

        // ✅ si spot.station existe, limpia referencia en station
        if (stationId && isValidId(stationId)) {
            await Station.findByIdAndUpdate(stationId, { $pull: { spots: spot._id } });
        }

        const spotDeleted = await Spot.findByIdAndDelete(id);
        return res.status(200).json(spotDeleted);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getAllSpots = async (req, res) => {
    try {
        const spots = await Spot.find();
        return res.status(200).json(spots);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getAllSpotsByStation = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ evita CastError
        if (!isValidId(id)) {
            return res.status(400).json({ msg: "Invalid station id" });
        }

        const station = await Station.findById(id).populate("spots");
        if (!station) {
            return res.status(404).json({ msg: "Not Found" });
        }

        return res.status(200).json(station.spots);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getAllSpotsByUser = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ evita CastError
        if (!isValidId(id)) {
            return res.status(400).json({ msg: "Invalid user id" });
        }

        const user = await User.findById(id).populate("spots");
        if (!user) {
            return res.status(404).json({ msg: "Not Found" });
        }

        return res.status(200).json(user.spots);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getSpotById = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ evita CastError
        if (!isValidId(id)) {
            return res.status(400).json({ msg: "Invalid spot id" });
        }

        const spot = await Spot.findById(id);
        if (!spot) {
            return res.status(404).json({ msg: "Not Found" });
        }

        return res.status(200).json(spot);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    createSpot,
    updateSpot,
    deleteSpot,
    getAllSpots,
    getAllSpotsByStation,
    getAllSpotsByUser,
    getSpotById,
};
