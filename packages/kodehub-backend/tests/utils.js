let dbconnection;

import mongoose from 'mongoose';
import createTestData from '../seeds/002_testData';
import configs from '../src/app/configs';
import models from '../src/app/models';

const isTest = process.env.NODE_ENV === 'test';
const DB_URL =
  'mongodb+srv://arrlancore:arrlancore45@cluster0-ojle1.mongodb.net/kodehub-db-test?retryWrites=true&w=majority';
console.log('DB_URL', DB_URL);

const connectToDatabase = needSeed => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', configs.mongodb.debug);

  isTest && needSeed && makeTestEnvironment();

  return mongoose.connect(DB_URL);
};

const makeTestEnvironment = async () => {
  console.info('Prepare database for testing');
  // clear db
  await Promise.all([
    models.User.deleteMany({}),
    models.Bookmark.deleteMany({})
  ]);
  // seed data
  await createTestData(models);
};

export async function startDb() {
  dbconnection = await connectToDatabase();
  return {
    closeConnection: () => dbconnection.close()
  };
}
