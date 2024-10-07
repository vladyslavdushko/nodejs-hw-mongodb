import Contact from '../db/models/contact.js';
import createHttpError from 'http-errors';
export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactsByID = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }
  return contact;
};

export const deleteContactByID = async (contactId) => {
  const contact = await Contact.findById(contactId);
  console.log(contact, 'contact');

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return await Contact.findByIdAndDelete(contactId);
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};

export const patchContactByID = async (contactId, payload) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  const updatedContact = await contact.updateOne(payload);
  return updatedContact;
};
