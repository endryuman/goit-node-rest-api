import { Contact } from "../models/contactModel.js";

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const removingContact = await Contact.findByIdAndDelete(contactId);
    return removingContact;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(value) {
  try {
    const newContact = Contact.create(value);
    return newContact;
  } catch (err) {
    console.log(err);
  }
}

async function renewContact(contactId, updatedData) {
  try {
    const updatedUser = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    );
    return updatedUser || null;
  } catch (err) {
    console.log(err);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  renewContact,
};
