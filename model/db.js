const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./model/contacts.json');
const db = low(adapter);

// у нас он уже создан!!!
// db.defaults({ contacts: [] }).write();

module.exports = db;
