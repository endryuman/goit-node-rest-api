import { Router } from "express";
import {
  getCurrent,
  login,
  logout,
  signup,
} from "../controllers/authController.js";
import {
  checkLoginData,
  checkSignupData,
} from "../middlewares/authMiddleware.js";
import checkToken from "../middlewares/checkToken.js";

const authRouter = Router();

authRouter.post("/register", checkSignupData, signup);

authRouter.post("/login", checkLoginData, login);

authRouter.get("/current", checkToken, getCurrent);

authRouter.post("/logout", checkToken, logout);

export default authRouter;
