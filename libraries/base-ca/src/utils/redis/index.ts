import { redisClient } from '@/services/redis';

export const findEntriesWithFieldX = async (
  hashKey: string,
  fieldX: string
) => {
  let cursor = 0;
  const matchingEntries: { field: string; value: string }[] = [];

  do {
    // Perform HSCAN with the current cursor
    const reply = await redisClient.hScan(hashKey, cursor, {
      MATCH: '*',
      COUNT: 100, // Adjust the count as needed
    });

    cursor = reply.cursor;
    const scannedTuples = reply.tuples;

    // Process scanned tuples
    for (const { field, value } of scannedTuples) {
      if (field === fieldX) {
        matchingEntries.push({ field, value });
      }
    }
  } while (cursor !== 0);

  return matchingEntries;
};
