const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validate");
const ctrl = require("../controllers/payments.controller");

router.get("/user/:id",   isAuth, ctrl.getAllPaymentsByUser);
router.post("/",          isAuth, validate(schemas.createPayment), ctrl.createPayment);
router.delete("/:id",     isAuth, ctrl.deletePayment);

module.exports = router;
