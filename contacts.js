const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = function () {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
};

const getContactById = function (contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((el) => el.id == contactId);
    if (contact) console.table(contact);
    else console.log("Contact not found!");
  });
};

const removeContact = function (contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    const removeContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    removeContact.forEach((contact, i) => {
      contact.id = `${i + 1}`;
    });
    fs.writeFileSync(
      contactsPath,
      JSON.stringify(removeContact, null, 2),
      (error) => {
        if (error) {
          console.error(error);
          return;
        }
      }
    );
    console.log("Contact removed!");
  });
};

const addContact = function (name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: `${contacts.length + 1}`,
      name,
      email,
      phone,
    };
    const updateContact = [...contacts, newContact];
    fs.writeFile(
      contactsPath,
      JSON.stringify(updateContact, null, 2),
      (error) => {
        if (error) {
          console.error(error);
          return;
        }
      }
    );
    console.log("The contact has added!");
  });
  listContacts();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
