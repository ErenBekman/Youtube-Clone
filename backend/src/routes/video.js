const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const createError = require("../middleware/error");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Video = require("../models/video");
const User = require("../models/user");

//create a video

router.post("/", authenticateToken, async (req, res, next) => {
  console.log("req.files :>> ", req.files);

  try {
    if (req.files) {
      const videoFile = req.files.video.tempFilePath;

      console.log("req.files.video :>> ", req.files.video);

      cloudinary.uploader
        .upload(videoFile, {
          resource_type: "video",
          public_id: `VideoUploads/${req.files.video.name}`,
          chunk_size: 6000000,
          eager: [
            {
              width: 300,
              height: 300,
              crop: "pad",
              audio_codec: "none",
            },
            {
              width: 160,
              height: 100,
              crop: "crop",
              gravity: "south",
              audio_codec: "none",
            },
          ],
        })
        .then((result) => {
          const videoData = {
            ...req.body,
            videoUrl: result?.url,
          };

          const newVideo = new Video({ user_id: req.user, ...videoData });
          const savedVideo = newVideo.save();
          res.status(200).json(videoData);
        });
    } else {
      const newVideo = new Video({ user_id: req.user.id, ...req.body });
      const savedVideo = await newVideo.save();
      res.status(200).json(savedVideo);
    }
  } catch (err) {
    next(err);
  }
});

//delete a video
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.user_id) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
});

//update a video
router.put("/:id", authenticateToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.user_id.toString()) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
});

//get a video
router.get("/find/:id", async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    }).populate({
      path: "user_id",
      select: "_id name subscribers",
    });

    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
});

router.get("/trend", async (req, res, next) => {
  try {
    const videos = await Video.find()
      .sort({ views: -1 })
      .populate({
        path: "user_id",
        select: "_id name subscribers",
      })
      .populate("commentCount");
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});
router.get("/random", async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]).populate({
      path: "user_id",
      select: "_id name subscribers",
    });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

router.get("/sub", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        console.log("channelId :>> ", channelId);
        return await Video.find({ user_id: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
});

router.get("/tags", async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      $or: [{ title: { $regex: query, $options: "i" } }, { "user_id.name": { $regex: query, $options: "i" } }],
    })
      .limit(40)
      .populate({
        path: "user_id",
        select: "_id name subscribers",
      });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
