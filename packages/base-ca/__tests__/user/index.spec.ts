import { describe, expect, test } from 'vitest';
import { createUser } from '../../src/functions/users/index';

import { User } from '../../src/services/prisma';

describe('User tests', () => {
  test('it should create a new user', async () => {
    // const newUser = await createUser({
    //   firstName: 'Davi',
    //   lastName: 'Silvaa',
    //   profileColor: '#eee',
    //   username: 'davi-silvaa',
    //   password: 'asdfaskdfskdf',
    //   privateKeys: ['asdfsdf', 'qwefqjwef'],
    // });
    // console.log(newUser);
    // expect(newUser).instanceOf(User);
  });
});
