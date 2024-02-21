import bcryptjs from "bcryptjs";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import {
  signupUserSchema,
  verificationEmailSchema,
} from "../schemas/usersSchemas.js";
import { checkUserExists } from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import multer from "multer";
import { v4 } from "uuid";

export const checkSignupData = catchAsync(async (req, res, next) => {
  const { value, error } = signupUserSchema(req.body);
  if (error)
    return res.status(400).json({
      message: error.message,
    });
  await checkUserExists(value.email);

  req.body = value;

  next();
});

export const validateVerificationEmail = catchAsync(async (req, res, next) => {
  const { value, error } = verificationEmailSchema(req.body);
  if (error)
    return res.status(400).json({
      message: error.message,
    });

  req.body = value;

  next();
});

export const checkLoginData = catchAsync(async (req, res, next) => {
  const { value, error } = signupUserSchema(req.body);
  if (error)
    return res.status(400).json({
      message: error.message,
    });
  const { email, password } = value;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  req.body = user._id;

  next();
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cbk) => {
    cbk(null, "tpm");
  },
  filename: (req, file, cbk) => {
    const extension = file.mimetype.split("/")[1];

    cbk(null, `${req.user.id}-${v4()}.${extension}`);
  },
});

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(new HttpError(400, "Please, upload images only"), false);
  }
};

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("avatar");
