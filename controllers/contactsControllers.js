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
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const contactList = await listContacts(owner);
    res.status(200).json(contactList);
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const getOneContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const contact = await getContactById(req.params.id, owner);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const contact = await removeContact(req.params.id, owner);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { value, error } = createContactSchema(req.body);
  if (error)
    return res.status(400).json({
      message: error.message,
    });

  try {
    const contact = await addContact(value, owner);
    return res.status(201).json(contact);
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const updateContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { value, error } = updateContactSchema(req.body);

  if (Object.keys(value).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const contact = await renewContact(req.params.id, req.body, owner);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { value, error } = updateStatusContactSchema(req.body);

  if (Object.keys(value).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const contact = await renewContact(req.params.id, req.body, owner);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    next(HttpError(err.status));
  }
};
