const Comment = require("../models/Comment");

const create = async (body, userId) => {
    const comment = new Comment({ ...body, user: userId });
    await comment.save();
    return comment;
};

const remove = async (id) => {
    const comment = await Comment.findById(id);
    if (!comment) {
        const err = new Error("Comment not found");
        err.status = 404;
        throw err;
    }
    return Comment.findByIdAndDelete(id);
};

const getAll = async () => Comment.find().populate("user", "username image");

const getById = async (id) => {
    const comment = await Comment.findById(id).populate("user", "username image");
    if (!comment) {
        const err = new Error("Comment not found");
        err.status = 404;
        throw err;
    }
    return comment;
};

const getByStation = async (stationId) => {
    return Comment.find({ station: stationId })
        .populate("user", "username image")
        .sort({ createdAt: -1 });
};

module.exports = { create, remove, getAll, getById, getByStation };
