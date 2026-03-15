const spotsService = require("../services/spots.service");

const createSpot = async (req, res, next) => {
    try {
        const spot = await spotsService.create(req.body);
        return res.status(201).json(spot);
    } catch (err) { next(err); }
};

const updateSpot = async (req, res, next) => {
    try {
        const spot = await spotsService.update(req.params.id, req.body);
        return res.status(200).json(spot);
    } catch (err) { next(err); }
};

const deleteSpot = async (req, res, next) => {
    try {
        const spot = await spotsService.remove(req.params.id);
        return res.status(200).json(spot);
    } catch (err) { next(err); }
};

const getAllSpots = async (req, res, next) => {
    try {
        const spots = await spotsService.getAll();
        return res.status(200).json(spots);
    } catch (err) { next(err); }
};

const getSpotById = async (req, res, next) => {
    try {
        const spot = await spotsService.getById(req.params.id);
        return res.status(200).json(spot);
    } catch (err) { next(err); }
};

const getAllSpotsByStation = async (req, res, next) => {
    try {
        const spots = await spotsService.getByStation(req.params.id);
        return res.status(200).json(spots);
    } catch (err) { next(err); }
};

const getAllSpotsByUser = async (req, res, next) => {
    try {
        const spots = await spotsService.getByUser(req.params.id);
        return res.status(200).json(spots);
    } catch (err) { next(err); }
};

module.exports = {
    createSpot,
    updateSpot,
    deleteSpot,
    getAllSpots,
    getSpotById,
    getAllSpotsByStation,
    getAllSpotsByUser,
};
