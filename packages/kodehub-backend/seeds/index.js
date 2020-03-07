import 'dotenv/config';
import connectToDatabase from '../src/app/mongoose';
import createUsers from './000_user';
import models from '../src/app/models';

async function startSeed() {
  // connect to the db
  const mongoose = await connectToDatabase();

  // seeding some data
  console.log('Seeding users data');
  await createUsers(models);

  // close connection to the db
  mongoose.connection.close(false, () => {
    console.log('MongoDb connection closed.');
    process.exit(0);
  });
}

startSeed();
