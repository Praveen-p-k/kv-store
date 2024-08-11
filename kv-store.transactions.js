import { DB_ACTIONS } from "./kv-store.constants.js";
import { log, prompt } from "./kv-store.utils.js";

const handleTransactions = (currentTableRecords) => {
  let newTableRecords = {};
  while (true) {
    const [action, key, value] = prompt("Enter a command: ").split(" ");

    switch (action) {
      case DB_ACTIONS.GET:
        log(newTableRecords[key] || currentTableRecords[key] || null);
        break;
      case DB_ACTIONS.SET:
        newTableRecords[key] = value;
        break;
      case DB_ACTIONS.UNSET:
        if (!newTableRecords[key]) {
          log(`No variable named ${key}`);
        } else {
          newTableRecords[key] = null;
          log(newTableRecords[key]);
        }
        break;
      case DB_ACTIONS.UPDATE:
        if (!newTableRecords[key]) {
          log(`No variable named ${key}`);
        } else {
          newTableRecords[key] = value;
          log(newTableRecords[key]);
        }
        break;
      case DB_ACTIONS.BEGIN:
        newTableRecords = {
          ...newTableRecords,
          ...handleTransactions(newTableRecords),
        };
        break;
      case DB_ACTIONS.COMMIT:
        return { ...currentTableRecords, ...newTableRecords };
      case DB_ACTIONS.ROLLBACK:
        return {};
      default:
        log("Invalid operation");
        break;
    }
  }
};

const table = {};
handleTransactions(table);
