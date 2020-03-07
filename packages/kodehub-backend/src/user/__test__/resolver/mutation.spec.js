import {
  updateUserResolver,
  deleteUserResolver
} from '../../resolver/mutation';
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

describe('updateUserResolver', () => {
  it('will be updated when data is valid', async () => {
    /**
     * Create a user data
     */
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const user = new User(_doc);
    await user.save();

    // updating user data
    const _updates = {
      id: _doc._id,
      username: 'superadmin',
      email: 'superadmin@gmail.com'
    };

    await updateUserResolver({}, { input: _updates }, { models: { User } });
    const result = await User.findById(_doc._id);
    expect(result.username).toEqual(_updates.username);
    expect(result.email).toEqual(_updates.email);
  });

  it('will fail if ID is not provided', async () => {
    /**
     * Create a user data
     */
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const user = new User(_doc);
    await user.save();

    // updating user data
    const _updates = {
      username: 'superadmin',
      email: 'superadmin@gmail.com'
    };

    await updateUserResolver({}, { input: _updates }, { models: { User } });
    const result = await User.findById(_doc._id);
    expect(result.username).not.toEqual(_updates.username);
    expect(result.email).not.toEqual(_updates.email);
  });

  it('will fail if ID is not valid object ID', async () => {
    try {
      await updateUserResolver(
        {},
        { input: { id: 'xtrasid123' } },
        { models: { User } }
      );
    } catch (error) {
      expect(error.message).toContain('Cast to ObjectId failed');
    }
  });

  it('not allowed to update password', async () => {
    /**
     * Create a user data
     */
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };

    const user = new User(_doc);
    await user.save();

    // updating user data
    const _updates = {
      id: '507f191e810c19729de860ea',
      username: 'superadmin',
      email: 'superadmin@gmail.com',
      password: 'newPassword123'
    };

    await updateUserResolver({}, { input: _updates }, { models: { User } });
    const result = await User.findById(_doc._id);
    // password will be ignored & still the same
    expect(result.password).toEqual(user.password);
  });
});

describe('deleteUserResolver', () => {
  it('will return thrue is delete success', async () => {
    /**
     * Create a user data
     */
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };
    const user = new User(_doc);
    await user.save();

    const result = await deleteUserResolver(
      {},
      { id: user._id },
      { models: { User }, user: { role: 'USER' } }
    );

    expect(result).toEqual(true);
  });

  it('will return false if user ID is not found', async () => {
    /**
     * Create a user data
     */
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'superuser',
      email: 'super@gmail.com',
      role: 'USER',
      password: 'superpassword'
    };
    const user = new User(_doc);
    await user.save();

    const result = await deleteUserResolver(
      {},
      { id: '507f191e810c19729de86000' },
      { models: { User }, user: { role: 'ADMIN' } }
    );
    expect(result).toEqual(false);
  });
});
