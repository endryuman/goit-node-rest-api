import bcryptjs from "bcryptjs";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import { signupUserSchema } from "../schemas/usersSchemas.js";
import { checkUserExists } from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";

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
