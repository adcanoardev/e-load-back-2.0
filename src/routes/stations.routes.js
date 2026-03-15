const router = require("express").Router();
const { isAdmin } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validate");
const ctrl = require("../controllers/stations.controller");

router.get("/",              ctrl.getAllStations);
router.get("/admin",         isAdmin,  ctrl.getAllStationsAdmin);
router.get("/:id",           ctrl.getStationById);
router.post("/",             isAdmin,  validate(schemas.createStation), ctrl.createStation);
router.put("/:id",           isAdmin,  validate(schemas.updateStation), ctrl.updateStation);
router.delete("/:id",        isAdmin,  ctrl.deleteStation);

module.exports = router;
