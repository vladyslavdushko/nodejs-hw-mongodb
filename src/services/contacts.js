import Contact from '../db/models/contact.js';

export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactsByID = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const deleteContactByID = async (contactId) => {
  return await Contact.findOneAndDelete(contactId);
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};

export const patchContactByID = async (contactId, payload) => {
  const contact = await Contact.findById(contactId);
  const updatedContact = await contact.updateOne(payload);
  return updatedContact;
};
