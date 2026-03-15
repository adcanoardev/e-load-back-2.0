const usersService = require("../services/users.service");

const signUp = async (req, res, next) => {
    try {
        const user = await usersService.signUp({ body: req.body, file: req.file });
        return res.status(201).json(user);
    } catch (err) { next(err); }
};

const login = async (req, res, next) => {
    try {
        const { token, user } = await usersService.login(req.body);
        return res.status(200).json({ token, user });
    } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        return res.status(200).json(users);
    } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
    try {
        const user = await usersService.getById(req.params.id);
        return res.status(200).json(user);
    } catch (err) { next(err); }
};

const update = async (req, res, next) => {
    try {
        const user = await usersService.update(req.params.id, {
            body: req.body,
            file: req.file,
            requestingUser: req.user,
        });
        return res.status(200).json(user);
    } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
    try {
        const user = await usersService.remove(req.params.id, req.user);
        return res.status(200).json(user);
    } catch (err) { next(err); }
};

const checkSession = (req, res) => {
    return res.status(200).json(req.user);
};

module.exports = { signUp, login, getAll, getById, update, remove, checkSession };
