const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const createError = require("../middleware/error");
const Comment = require("../models/comment");
const Video = require("../models/video");

router.post("/", authenticateToken, async (req, res, next) => {
  const newComment = new Comment({ ...req.body, user_id: req.user.id });

  try {
    const savedComment = await newComment.save().then((t) =>
      t.populate({
        path: "user_id",
        select: "_id name subscribers",
      })
    );
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
});

router.get("/:video_id", async (req, res, next) => {
  try {
    const comments = await Comment.find({ video_id: req.params.video_id }).populate({
      path: "user_id",
      select: "_id name subscribers",
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    // const video = await Video.findById(res.params.id);
    // || req.user.id === video.user_id
    if (req.user.id === comment.user_id.toString()) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
