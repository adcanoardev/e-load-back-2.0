const commentsService = require("../services/comments.service");

const createComment = async (req, res, next) => {
    try {
        const comment = await commentsService.create(req.body, req.user._id);
        return res.status(201).json(comment);
    } catch (err) { next(err); }
};

const deleteComment = async (req, res, next) => {
    try {
        const comment = await commentsService.remove(req.params.id);
        return res.status(200).json(comment);
    } catch (err) { next(err); }
};

const getAllComments = async (req, res, next) => {
    try {
        const comments = await commentsService.getAll();
        return res.status(200).json(comments);
    } catch (err) { next(err); }
};

const getCommentById = async (req, res, next) => {
    try {
        const comment = await commentsService.getById(req.params.id);
        return res.status(200).json(comment);
    } catch (err) { next(err); }
};

const getAllCommentsByStation = async (req, res, next) => {
    try {
        const comments = await commentsService.getByStation(req.params.id);
        return res.status(200).json(comments);
    } catch (err) { next(err); }
};

module.exports = {
    createComment,
    deleteComment,
    getAllComments,
    getCommentById,
    getAllCommentsByStation,
};
