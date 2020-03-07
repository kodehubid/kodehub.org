import mongoose from 'mongoose';
import models from './models';
import configs from './configs';
import createTestData from '../../seeds/002_testData';

const isTest = process.env.NODE_ENV === 'test';
const DB_URL = isTest
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

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

export default connectToDatabase;
