const { isAuth, isAdmin } = require("../../middlewares/auth");
const { verifyCreateUserFields, verifyUpdateUserFields } = require("../../middlewares/fields");
const uploadImage = require("../../middlewares/file");
const { signUp, updateUser, deleteUser, login, getAllUsers, getUserById, checkSession } = require("./users.controller");

const usersRoutes = require("express").Router();

usersRoutes.post("/", uploadImage.single("image"), signUp);
// usersRoutes.post("/",[verifyCreateUserFields], uploadImage.single('image'), signUp);
usersRoutes.patch("/:id", [isAuth], updateUser);
usersRoutes.put("/:id", [isAuth], uploadImage.single("image"), updateUser);
// usersRoutes.put("/:id", [verifyUpdateUserFields, isAuth], uploadImage.single('image'), updateUser);
usersRoutes.delete("/:id", [isAdmin], deleteUser);
usersRoutes.post("/login", login);
usersRoutes.get("/", getAllUsers);
usersRoutes.get("/check", [isAuth], checkSession);
usersRoutes.get("/:id", getUserById);

module.exports = usersRoutes;
