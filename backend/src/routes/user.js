const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const createError = require("../middleware/error");
const User = require("../models/user.js");
const Video = require("../models/video.js");

//update user
router.put("/:id", authenticateToken, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
});

//delete user
router.delete("/:id", authenticateToken, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
});

//get a user
router.get("/find/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//subscribe a user
router.put("/sub/:id", authenticateToken, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
});

//unsubscribe a user
router.put("/unsub/:id", authenticateToken, async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

//like a video
router.put("/like/:video_id", authenticateToken, async (req, res, next) => {
  const id = req.user.id;
  const video_id = req.params.video_id;
  try {
    await Video.findByIdAndUpdate(video_id, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
});

//dislike a video
router.put("/dislike/:video_id", authenticateToken, async (req, res, next) => {
  const id = req.user.id;
  const video_id = req.params.video_id;
  try {
    await Video.findByIdAndUpdate(video_id, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
});

//video a user
router.get("/getVideo/:userId", authenticateToken, async (req, res, next) => {
  try {
    const videos = await Video.find({ user_id: req.params.userId }).populate("commentCount");
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
