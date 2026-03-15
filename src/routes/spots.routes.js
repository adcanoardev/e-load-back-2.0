const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validate");
const ctrl = require("../controllers/spots.controller");

router.get("/",                  ctrl.getAllSpots);
router.get("/station/:id",       ctrl.getAllSpotsByStation);
router.get("/user/:id",          isAuth,  ctrl.getAllSpotsByUser);
router.get("/:id",               ctrl.getSpotById);
router.post("/",                 isAdmin, validate(schemas.createSpot),      ctrl.createSpot);
router.patch("/:id",             isAuth,  validate(schemas.updateSpotState),  ctrl.updateSpot);
router.put("/:id",               isAdmin, validate(schemas.createSpot),      ctrl.updateSpot);
router.delete("/:id",            isAdmin, ctrl.deleteSpot);

module.exports = router;
