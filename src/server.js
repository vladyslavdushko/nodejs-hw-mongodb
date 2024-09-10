import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';
import { getContacts, getContactsByID } from './services/contacts.js';

const PORT = Number(process.env.PORT);

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json({
      data: contacts,
      message: 'Successfully found contacts!',
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    const contacts = await getContactsByID(contactId);

    if (!contacts) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      data: contacts,
      message: `Successfully found contact with id ${contactId}!`,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
