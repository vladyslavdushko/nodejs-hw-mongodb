import createHttpError from 'http-errors';
import {
  deleteContactByID,
  getContacts,
  getContactsByID,
  createContact,
  patchContactByID,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.status(200).json({
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await getContactsByID(contactId);
  res.status(200).json({
    status: 200,
    data: contacts,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactByID(contactId);
  res.status(204).send();
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await patchContactByID(contactId, req.body);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: req.body,
  });
};
