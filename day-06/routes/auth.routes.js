const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email address",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user.__id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registered",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    message: "this is protected route",
  });
});

/*
 * POST /api/auth/login
 */

/*
 * controller
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email address",
    });
  }

  const isPasswordMatched = user.password === password;

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookies("jwt_token", token);

  res.status(201).json({
    message: "User logged in",
  });
});

module.exports = authRouter;
