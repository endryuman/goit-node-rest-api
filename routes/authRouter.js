import { Router } from "express";
import {
  getCurrent,
  login,
  logout,
  resendVerifyEmail,
  signup,
  updateAvatar,
  verifyEmail,
} from "../controllers/authController.js";
import {
  checkLoginData,
  checkSignupData,
  validateVerificationEmail,
} from "../middlewares/authMiddleware.js";
import checkToken from "../middlewares/checkToken.js";
import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post("/register", checkSignupData, signup);

authRouter.post("/login", checkLoginData, login);

authRouter.get("/current", checkToken, getCurrent);

authRouter.patch("/avatars", checkToken, upload.single("avatar"), updateAvatar);

authRouter.post("/logout", checkToken, logout);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateVerificationEmail, resendVerifyEmail);

export default authRouter;
