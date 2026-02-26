const { isAuth, isAdmin } = require("../../middlewares/auth");
const { verifyCreateCommentFields } = require("../../middlewares/fields");
const {
    createComment,
    deleteComment,
    getAllComments,
    getCommentById,
    getAllCommentsByStation,
} = require("./comments.controller");

const commentsRoutes = require("express").Router();

commentsRoutes.post("/", [verifyCreateCommentFields, isAuth], createComment);
commentsRoutes.delete("/:id", [isAdmin], deleteComment);
commentsRoutes.get("/", getAllComments);
commentsRoutes.get("/:id", getCommentById);
commentsRoutes.get("/station/:id", getAllCommentsByStation);

module.exports = commentsRoutes;
