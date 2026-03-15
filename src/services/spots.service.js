const Station = require("../models/Station");
const User = require("../models/User");
const Spot = require("../models/Spot");

const create = async (body) => {
    const spot = new Spot(body);
    await spot.save();
    await Station.findByIdAndUpdate(body.station, { $push: { spots: spot._id } });
    return spot;
};

const update = async (id, body) => {
    const spot = await Spot.findById(id);
    if (!spot) {
        const err = new Error("Spot not found");
        err.status = 404;
        throw err;
    }
    return Spot.findByIdAndUpdate(id, body, { new: true });
};

const remove = async (id) => {
    const spot = await Spot.findById(id);
    if (!spot) {
        const err = new Error("Spot not found");
        err.status = 404;
        throw err;
    }
    if (spot.station) {
        await Station.findByIdAndUpdate(spot.station, { $pull: { spots: spot._id } });
    }
    return Spot.findByIdAndDelete(id);
};

const getAll = async () => Spot.find();

const getById = async (id) => {
    const spot = await Spot.findById(id);
    if (!spot) {
        const err = new Error("Spot not found");
        err.status = 404;
        throw err;
    }
    return spot;
};

const getByStation = async (stationId) => {
    const station = await Station.findById(stationId).populate("spots");
    if (!station) {
        const err = new Error("Station not found");
        err.status = 404;
        throw err;
    }
    return station.spots;
};

const getByUser = async (userId) => {
    const user = await User.findById(userId).populate("spots.spot");
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    return user.spots;
};

module.exports = { create, update, remove, getAll, getById, getByStation, getByUser };
