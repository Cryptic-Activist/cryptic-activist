import { describe, expect, test } from 'vitest';
import { createSystemMessage } from '../../src/functions';

describe('System Message tests', () => {
  test('it should create a new system message', async () => {
    const newSystemMessage = await createSystemMessage({message: 'Some message', url: 'https://www.youtube.com/', userId:'74717840-12e1-4230-a8b8-48b72fef65fb'})
    console.log({ newSystemMessage });
  });
});
