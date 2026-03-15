const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
        station: { type: mongoose.Types.ObjectId, ref: "stations", required: true },
        body: { type: String, required: true, trim: true, maxlength: 500 },
    },
    {
        timestamps: true,
        collection: "comments",
    }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
