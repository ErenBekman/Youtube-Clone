const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const createError = require("../middleware/error");
const authenticateToken = require("../middleware/authenticate");

//CREATE A USER
router.post("/signup", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
});

//SIGN IN
router.post("/signin", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    const userData = {
      ...others,
      access_token: token,
    };

    res.cookie("access_token", token, { httpOnly: true }).status(200).json(userData);
  } catch (err) {
    next(err);
  }
});

//me
router.get("/me", authenticateToken, (req, res) => {
  res.json(req.user);
});

//GOOGLE AUTH
router.post("/google", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(user._doc);
    } else {
      const newUser = new User({ ...req.body, fromGoogle: true });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
