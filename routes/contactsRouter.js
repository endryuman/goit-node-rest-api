import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { isIdValid } from "../middlewares/isIdValid.js";
import checkToken from "../middlewares/checkToken.js";

const contactsRouter = express.Router();

contactsRouter.get("/", checkToken, getAllContacts);

contactsRouter.get("/:id", checkToken, isIdValid, getOneContact);

contactsRouter.delete("/:id", checkToken, isIdValid, deleteContact);

contactsRouter.post("/", checkToken, createContact);

contactsRouter.put("/:id", checkToken, isIdValid, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  checkToken,
  isIdValid,
  updateStatusContact
);

export default contactsRouter;
