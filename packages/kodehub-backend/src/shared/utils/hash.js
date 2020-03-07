'use strict';
import bcrypt from 'bcrypt';

export async function generateUserPasswordHash(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// for pagination cursor
export const toCursorHash = string => Buffer.from(string).toString('base64');

export const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');
