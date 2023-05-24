import asyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import generateToken from "../utils/generateToken.js";


const authUser = asyncHandler(async (req, res) => {
  res.json({ message: "authentication controller" });
});

// @desc User registeration controller

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error(`User ${email} already exists`);
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res,user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

export { authUser, registerUser };
