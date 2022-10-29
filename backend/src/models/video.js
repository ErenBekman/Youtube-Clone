const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: String,
    visibility: String,
    videoUrl: String,
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

VideoSchema.set("toObject", { virtuals: true });
VideoSchema.set("toJSON", { virtuals: true });

VideoSchema.virtual("commentCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "video_id",
  count: true,
});

module.exports = mongoose.model("Video", VideoSchema);
