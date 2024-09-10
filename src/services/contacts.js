import Contact from '../db/models/contact.js';

export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactsByID = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
