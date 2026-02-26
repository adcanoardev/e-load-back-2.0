const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Types.ObjectId, ref: 'users'},
        station: {type: mongoose.Types.ObjectId, ref: 'stations'},
        body: {type: String, required: true}
    },
    {
        timestamps: true,
        collection: 'comments'
    }
)

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;