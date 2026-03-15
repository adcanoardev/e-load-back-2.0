const stationsService = require("../services/stations.service");

const createStation = async (req, res, next) => {
    try {
        const station = await stationsService.create(req.body);
        return res.status(201).json(station);
    } catch (err) { next(err); }
};

const updateStation = async (req, res, next) => {
    try {
        const station = await stationsService.update(req.params.id, req.body);
        return res.status(200).json(station);
    } catch (err) { next(err); }
};

const deleteStation = async (req, res, next) => {
    try {
        const station = await stationsService.remove(req.params.id);
        return res.status(200).json(station);
    } catch (err) { next(err); }
};

const getAllStations = async (req, res, next) => {
    try {
        const stations = await stationsService.getAll();
        return res.status(200).json(stations);
    } catch (err) { next(err); }
};

const getAllStationsAdmin = async (req, res, next) => {
    try {
        const stations = await stationsService.getAllAdmin();
        return res.status(200).json(stations);
    } catch (err) { next(err); }
};

const getStationById = async (req, res, next) => {
    try {
        const station = await stationsService.getById(req.params.id);
        return res.status(200).json(station);
    } catch (err) { next(err); }
};

module.exports = {
    createStation,
    updateStation,
    deleteStation,
    getAllStations,
    getAllStationsAdmin,
    getStationById,
};
