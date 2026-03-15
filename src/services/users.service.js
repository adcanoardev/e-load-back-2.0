const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateSign } = require("../utils/jwt");
const { deleteFile } = require("../middlewares/upload");

const signUp = async ({ body, file }) => {
    // Forzar rol user aunque venga admin en el body
    body.rol = "user";

    const user = new User(body);
    if (file) user.image = file.path;

    await user.save();
    return user;
};

const login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
    }

    const token = generateSign(user.id, user.username);
    return { token, user };
};

const getAll = async () => {
    return User.find().select("-password");
};

const getById = async (id) => {
    const user = await User.findById(id).select("-password");
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    return user;
};

const update = async (id, { body, file, requestingUser }) => {
    const user = await User.findById(id);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    // Solo admin puede cambiar roles
    if (requestingUser.rol !== "admin") {
        delete body.rol;
    }

    // Solo el propio usuario o un admin puede actualizar
    if (requestingUser.rol !== "admin" && requestingUser._id.toString() !== id) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    if (file) {
        if (user.image) await deleteFile(user.image);
        body.image = file.path;
    }

    if (body.password) {
        body.password = bcrypt.hashSync(body.password, 10);
    }

    return User.findByIdAndUpdate(id, body, { new: true }).select("-password");
};

const remove = async (id, requestingUser) => {
    const user = await User.findById(id);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    // Solo admin puede borrar otros usuarios
    if (requestingUser.rol !== "admin" && requestingUser._id.toString() !== id) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    if (user.image) await deleteFile(user.image);
    return User.findByIdAndDelete(id);
};

module.exports = { signUp, login, getAll, getById, update, remove };
