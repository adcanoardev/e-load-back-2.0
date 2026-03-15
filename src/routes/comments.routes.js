const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validate");
const ctrl = require("../controllers/comments.controller");

router.get("/",               ctrl.getAllComments);
router.get("/station/:id",    ctrl.getAllCommentsByStation);
router.get("/:id",            ctrl.getCommentById);
router.post("/",              isAuth,  validate(schemas.createComment), ctrl.createComment);
router.delete("/:id",         isAdmin, ctrl.deleteComment);

module.exports = router;
