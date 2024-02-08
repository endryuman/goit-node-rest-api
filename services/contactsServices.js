import { Contact } from "../models/contactModel.js";

async function listContacts(owner) {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId, owner) {
  try {
    const contact = await Contact.findById(contactId)
      .where("owner")
      .equals(owner);

    return contact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId, owner) {
  try {
    const removingContact = await Contact.findByIdAndDelete(contactId)
      .where("owner")
      .equals(owner);
    return removingContact;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(value, owner) {
  try {
    const newContact = Contact.create({ ...value, owner });
    return newContact;
  } catch (err) {
    console.log(err);
  }
}

async function renewContact(contactId, updatedData, owner) {
  try {
    const updatedUser = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    )
      .where("owner")
      .equals(owner);
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
