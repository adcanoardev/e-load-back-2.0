const Comment = require("./comments.model");

const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();

        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ msg: "Not Found" });
        }
        const commentDeleted = await Comment.findByIdAndDelete(id);
        return res.status(200).json(commentDeleted);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
const getAllCommentsByStation = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.find({ station: id }).populate("user", "username image");
        if (!comments) {
            return res.status(404).json({ msg: "Not Found" });
        }
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ msg: "Not Found" });
        }
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    createComment,
    deleteComment,
    getAllComments,
    getAllCommentsByStation,
    getCommentById,
};
