import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { isIdValid } from "../controllers/middlewares/isIdValid.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isIdValid, getOneContact);

contactsRouter.delete("/:id", isIdValid, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", isIdValid, updateContact);

contactsRouter.patch("/:id/favorite", isIdValid, updateStatusContact);

export default contactsRouter;
