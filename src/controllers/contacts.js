import createHttpError from 'http-errors';
import {
  deleteContactByID,
  getContacts,
  getContactsByID,
  createContact,
  patchContactByID,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseContactFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsByID(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContactByID(contactId);

  if (!contact) {
    createHttpError(404, 'Contact not found');
  }

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
  const contactObject = contact.toObject(); // перетворюємо документ на звичайний об'єкт
  delete contactObject.__v; // видаляємо поле __v

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contactObject,
  });
};
