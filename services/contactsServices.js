import { v4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";
const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(readResult);
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const searchingContact = contacts.find(
      (contact) => contact.id === contactId
    );
    return searchingContact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const removingContact = await getContactById(contactId);
    const contacts = await listContacts();
    if (removingContact !== null) {
      const newContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    }
    return removingContact;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const dataArr = JSON.parse(readJsonResult);
    const newContact = { name, email, phone, id: v4() };
    dataArr.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(dataArr));
    return newContact;
  } catch (err) {
    console.log(err);
  }
}

async function renewContact(contactId, updatedData) {
  try {
    const dataArr = await listContacts();

    const contactIndex = dataArr.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return null;
    }
    dataArr[contactIndex] = { ...dataArr[contactIndex], ...updatedData };

    await fs.writeFile(contactsPath, JSON.stringify(dataArr));
    return dataArr[contactIndex];
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
