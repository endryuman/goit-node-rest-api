import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  renewContact,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contactList = await listContacts();
    res.status(200).json({
      contacts: contactList,
    });
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (contact) {
      return res.status(200).json({
        contact,
      });
    } else {
      return res.status(404).json({
        error: "Contact not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id);
    if (contact) {
      return res.status(200).json({
        contact,
      });
    } else {
      return res.status(404).json({
        error: "Contact not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const createContact = async (req, res, next) => {
  const { value, error } = createContactSchema(req.body);
  if (error)
    return res.status(400).json({
      msg: "Invalid contact data..",
    });

  const { name, email, phone } = value;

  try {
    const contact = await addContact(name, email, phone);
    return res.status(201).json({
      contact,
    });
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const updateContact = async (req, res, next) => {
  const { value, error } = updateContactSchema(req.body);
  console.log(value);

  if (Object.keys(value).length === 0) {
    return res.status(400).json({
      msg: "Body must have at least one field",
    });
  }

  if (error) {
    return res.status(400).json({
      msg: "Invalid contact data..",
    });
  }

  const { name, email, phone } = value;

  try {
    const contact = await renewContact(req.params.id, req.body);
    if (contact) {
      return res.status(200).json({
        contact,
      });
    } else {
      return res.status(404).json({
        error: "Contact not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};
