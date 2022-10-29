const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video_id: {
      type: mongoose.Types.ObjectId,
      ref: "video",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Comment", CommentSchema);
