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
import sendEmail from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const register = async (userData) => {
  const { email, password } = userData;

  const hashPassword = await bcryptjs.hash(password, 10);
  const verificationToken = v4();

  const newUser = await User.create({
    ...userData,
    subscription: "starter",
    password: hashPassword,
    verificationToken,
  });

  newUser.password = undefined;

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify email</a>`,
    text: `href="${BASE_URL}/api/users/verify/${verificationToken} Click here to verify email`,
  };

  await sendEmail(verifyEmail);

  return newUser;
};

export const checkUserExists = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
};

export const resendVerify = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify email</a>`,
    text: `href="${BASE_URL}/api/users/verify/${user.verificationToken} Click here to verify email`,
  };

  await sendEmail(verifyEmail);
};

export const logining = async (userId) => {
  const { verify } = await User.findOne({ _id: userId });
  if (!verify) {
    throw HttpError(401);
  }

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

export const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};
