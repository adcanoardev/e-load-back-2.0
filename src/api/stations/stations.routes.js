const { isAdmin } = require("../../middlewares/auth");
const { verifyCreateStationFields, verifyUpdateStationFields } = require("../../middlewares/fields");
const {
    createStation,
    updateStation,
    deleteStation,
    getAllStations,
    getStationById,
    getAllStationsAdmin,
} = require("./stations.controller");
// const { createStation, updateStation, deleteStation, getAllStations, getStationById, getAllStationsAdmin, getAddressStationById } = require("./stations.controller");

const stationsRoutes = require("express").Router();

stationsRoutes.post("/", [verifyCreateStationFields, isAdmin], createStation);
stationsRoutes.put("/:id", [verifyUpdateStationFields, isAdmin], updateStation);
stationsRoutes.delete("/:id", [isAdmin], deleteStation);
stationsRoutes.get("/", getAllStations);
stationsRoutes.get("/stations-admin", getAllStationsAdmin);
// stationsRoutes.get("/station-address", getAddressStationById),
stationsRoutes.get("/:id", getStationById);

module.exports = stationsRoutes;
