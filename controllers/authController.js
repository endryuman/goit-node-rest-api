import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { changeAvatar, logining, register } from "../services/usersServices.js";

export const signup = async (req, res, next) => {
  const value = req.body;
  try {
    const user = await register(value);
    return res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    if (err.status === 409) {
      return res.status(409).json({
        message: err.message,
      });
    } else {
      next(HttpError(err.status));
    }
  }
};

export const login = async (req, res, next) => {
  const userId = req.body;
  try {
    const { user, token } = await logining(userId);
    console.log(token);

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.json({ email, subscription });
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (!req.file) {
      res
        .status(400)
        .json({ message: "Please, attach avatar.It is required." });
      return;
    }
    const { path: tmpUpload, originalname } = req.file;

    const avatarURL = await changeAvatar(originalname, tmpUpload, _id);

    res.json({
      avatarURL,
    });
  } catch (err) {
    next(HttpError(err.status));
  }
};
