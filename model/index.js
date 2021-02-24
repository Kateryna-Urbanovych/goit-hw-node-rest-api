const db = require('./db');
const { v4: uuid } = require('uuid');

const listContacts = async () => {
    return db.value();
};

const getContactById = async contactId => {
    return db.find({ id: contactId }).value();
};
// или Number(contactId), если id - это число, а не строка

const addContact = async body => {
    const contactId = uuid();
    const record = {
        id: contactId,
        ...body,
    };
    db.push(record).write();
    return record;
};

const updateContact = async (contactId, body) => {
    const record = db.find({ id: contactId }).assign(body).value();
    db.write();
    return record.id ? record : null;
};

const removeContact = async contactId => {
    const [record] = db.remove({ id: contactId }).write();
    return record;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
