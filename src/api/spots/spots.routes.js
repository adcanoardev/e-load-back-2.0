const { isAdmin, isAuth } = require("../../middlewares/auth");
const {
    createSpot,
    updateSpot,
    deleteSpot,
    getAllSpots,
    getSpotById,
    getAllSpotsByStation,
    getAllSpotsByUser,
} = require("./spots.controller");
const { verifyCreateSpotFields, verifyUpdateSpotFields, verifyUpdateSpotState } = require("../../middlewares/fields");
const spotsRoutes = require("express").Router();

spotsRoutes.post("/", [verifyCreateSpotFields, isAdmin], createSpot);
spotsRoutes.patch("/:id", [verifyUpdateSpotState, isAuth], updateSpot);
spotsRoutes.put("/:id", [verifyUpdateSpotFields, isAdmin], updateSpot);
spotsRoutes.delete("/:id", [isAdmin], deleteSpot);
spotsRoutes.get("/", getAllSpots);
spotsRoutes.get("/:id", getSpotById);
spotsRoutes.get("/station/:id", getAllSpotsByStation);
spotsRoutes.get("/user/:id", [isAuth], getAllSpotsByUser);

module.exports = spotsRoutes;
