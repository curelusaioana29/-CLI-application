const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(`${id}`);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(`${id}`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
