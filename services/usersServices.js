import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import Jimp from "jimp";
import path from "path";
import { promises as fs } from "fs";
import { v4 } from "uuid";

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

export const changeAvatar = async (originalname, tmpUpload, _id) => {
  const avatarsDir = path.resolve("public", "avatars");
  const fileName = `${_id}-${v4()}${originalname}`;
  const resultUpload = path.resolve(avatarsDir, fileName);

  const image = await Jimp.read(tmpUpload);
  image.resize(250, 250).write(resultUpload);
  await fs.unlink(tmpUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  return avatarURL;
};
