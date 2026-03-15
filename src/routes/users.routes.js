const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/auth");
const { validate, schemas } = require("../middlewares/validate");
const { uploadImage } = require("../middlewares/upload");
const ctrl = require("../controllers/users.controller");

// Auth
router.post("/login",   validate(schemas.login),      ctrl.login);
router.post("/",        uploadImage.single("image"),   ctrl.signUp);

// Sesión
router.get("/check",    isAuth,                        ctrl.checkSession);

// CRUD
router.get("/",         isAdmin,                       ctrl.getAll);
router.get("/:id",      isAuth,                        ctrl.getById);
router.put("/:id",      isAuth, uploadImage.single("image"), ctrl.update);
router.patch("/:id",    isAuth, validate(schemas.updateUser), ctrl.update);
router.delete("/:id",   isAdmin,                       ctrl.remove);

module.exports = router;
