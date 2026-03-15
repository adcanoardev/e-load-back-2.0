const Station = require("../models/Station");

const create = async (body) => {
    const coordinates = {
        lat: Number(body.coordinatesLat),
        lng: Number(body.coordinatesLng),
    };
    const station = new Station({ ...body, coordinates });
    await station.save();
    return station;
};

const getAll = async () => {
    return Station.find().select("coordinates address schedule");
};

const getAllAdmin = async () => {
    return Station.find().select("address schedule spots").populate("spots");
};

const getById = async (id) => {
    const station = await Station.findById(id).populate("spots");
    if (!station) {
        const err = new Error("Station not found");
        err.status = 404;
        throw err;
    }
    return station;
};

const update = async (id, body) => {
    const station = await Station.findById(id);
    if (!station) {
        const err = new Error("Station not found");
        err.status = 404;
        throw err;
    }
    return Station.findByIdAndUpdate(id, body, { new: true });
};

const remove = async (id) => {
    const station = await Station.findById(id);
    if (!station) {
        const err = new Error("Station not found");
        err.status = 404;
        throw err;
    }
    return Station.findByIdAndDelete(id);
};

module.exports = { create, getAll, getAllAdmin, getById, update, remove };
