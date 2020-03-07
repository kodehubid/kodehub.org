import {
  getUsersResolver,
  getUserResolver,
  myProfileResolver
} from '../../resolver/query';
import User from '../../model';
import dbSetup from '../../../../tests/db-setup';

beforeAll(async () => await dbSetup.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbSetup.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbSetup.closeDatabase());

describe('getUsersResolver', () => {
  it('will return all users', async () => {
    /**
     * Create a user data
     */
    const _doc1 = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const _doc2 = {
      _id: '507f191e810c19729de860eb',
      username: 'newsuperuser',
      email: 'newsuper@gmail.com',
      role: 'USER',
      password: 'newsuperpassword'
    };

    const user1 = new User(_doc1);
    const user2 = new User(_doc2);
    await user1.save();
    await user2.save();

    // get users
    const results = await getUsersResolver({}, {}, { models: { User } });

    expect(results.length).toEqual(2);

    // default sort desc by createdAt
    expect(results[1]._id).toEqual(user1._id);
    expect(results[0]._id).toEqual(user2._id);
  });
});

describe('getUserResolver', () => {
  it('will return a valid user', async () => {
    /**
     * Create a user data
     */
    const _doc1 = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const user1 = new User(_doc1);
    await user1.save();
    // get users
    const result = await getUserResolver(
      {},
      { id: _doc1._id },
      { models: { User } }
    );
    expect(result._id).toEqual(user1._id);
  });

  it('will return null if user not found', async () => {
    /**
     * Create a user data
     */
    const _doc1 = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const user1 = new User(_doc1);
    await user1.save();
    // get users
    const result = await getUserResolver(
      {},
      { id: '507f191e810c19729de86000' },
      { models: { User } }
    );
    expect(result).toBeNull();
  });

  it('will throw an error when ID is not valid object ID', async () => {
    const result = getUserResolver(
      {},
      { id: '507f191e810c19729de860xx' },
      { models: { User } }
    );
    expect(result).rejects.toThrow();
  });
});

describe('myProfileResolver', () => {
  it('will return a user profile same as login user', async () => {
    /**
     * Create a user data
     */
    const _doc1 = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const user1 = new User(_doc1);
    await user1.save();

    const loggedInUser = { id: user1._id };
    // get users
    const result = await myProfileResolver(
      {},
      {},
      { models: { User }, user: loggedInUser }
    );
    expect(result._id).toEqual(user1._id);
    expect(result.username).toEqual(user1.username);
  });
});
