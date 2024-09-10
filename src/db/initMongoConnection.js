import mongoose from 'mongoose';
import 'dotenv/config';

export const initMongoConnection = async () => {
  try {
    const user = String(process.env.MONGODB_USER);
    const pwd = String(process.env.MONGODB_PASSWORD);
    const url = String(process.env.MONGODB_URL);
    const db = String(process.env.MONGODB_DB);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
