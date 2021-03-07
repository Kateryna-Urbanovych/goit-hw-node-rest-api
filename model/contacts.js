const Contact = require('./schemas/contact')

const listContacts = async (
    userId,
    { sortBy, sortByDesc, filter, limit = '5', page = '1' },
) => {
    const results = await Contact.paginate(
        { owner: userId },
        {
            limit,
            page,
            // сортировка - для нее нужна валидация на query!!!
            //  (если вводить несуществующее поле - сортирует по умолчанию)
            sort: {
                ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // name: 1
                ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // name: -1
            },
            // фильтратиция по полю (не по тексту - это поиск - elasticsearch)
            select: filter ? filter.split('|').join(' ') : '',
            populate: {
                path: 'owner',
                select: 'email subscription -_id',
            },
        },
    )
    const { docs: contacts, totalDocs: total } = results
    return { total: total.toString(), limit, page, contacts }
}

const getContactById = async (contactId, userId) => {
    const result = await Contact.findOne({
        _id: contactId,
        owner: userId,
    }).populate({
        path: 'owner',
        select: 'email subscription -_id',
    })
    return result
}

const addContact = async body => {
    const result = await Contact.create(body)
    return result
}

const updateContact = async (contactId, body, userId) => {
    const result = await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        { ...body },
        { new: true },
    )
    return result
}

const removeContact = async (contactId, userId) => {
    const result = await Contact.findOneAndUpdate({
        _id: contactId,
        owner: userId,
    })
    return result
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
