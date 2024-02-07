import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";

export const register = async (userData) => {
  const { email, password } = userData;

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    ...userData,
    subscription: "starter",
    password: hashPassword,
  });

  newUser.password = undefined;

  return newUser;
};

export const checkUserExists = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
};

export const logining = async (userId) => {
  const payload = {
    id: userId,
  };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const user = await User.findByIdAndUpdate(userId, { token }, { new: true });
  return { user, token };
};
