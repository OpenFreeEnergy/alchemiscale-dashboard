/**
 * Convert API's list-of-lists format to a proper object.
 *
 * The Alchemiscale API returns some data as arrays of 2-element tuples
 * like [["key1", "value1"], ["key2", "value2"]].
 * This function recursively converts such structures to proper objects
 * like {"key1": "value1", "key2": "value2"}.
 */
export function convertTupleListToObject(data: unknown): unknown {
  if (Array.isArray(data)) {
    // Check if this is a list of 2-element tuples
    const isTupleList = data.every(
      item => Array.isArray(item) && item.length === 2
    );

    if (isTupleList && data.length > 0) {
      // Convert to object
      return Object.fromEntries(
        data.map(([key, value]) => [
          key,
          convertTupleListToObject(value) // Recursively convert nested structures
        ])
      );
    }

    // Otherwise, recursively convert array elements
    return data.map(item => convertTupleListToObject(item));
  }

  if (data !== null && typeof data === 'object') {
    // Recursively convert object values
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        convertTupleListToObject(value)
      ])
    );
  }

  return data;
}

/**
 * Extract a property from an object identified by a key pattern.
 *
 * Searches for keys matching the given prefix, validates there's exactly one match,
 * and extracts the specified property from that object.
 *
 * @param data - The object to search in
 * @param keyPrefix - The prefix to match keys against (e.g., "Transformation-")
 * @param propertyName - The property to extract from the matched object
 * @returns Object containing the value and any error message
 */
export function extractPropertyByKeyPattern<T = unknown>(
  data: unknown,
  keyPrefix: string,
  propertyName: string
): { value?: T; error?: string } {
  if (!data || typeof data !== 'object') {
    return { error: 'Invalid data: expected an object' };
  }

  const matchingKeys = Object.keys(data as Record<string, unknown>).filter(
    key => key.startsWith(keyPrefix)
  );

  if (matchingKeys.length === 0) {
    return { error: `No key found starting with "${keyPrefix}"` };
  }

  if (matchingKeys.length > 1) {
    return { error: `Expected exactly 1 key starting with "${keyPrefix}", found ${matchingKeys.length}` };
  }

  const targetObject = (data as Record<string, unknown>)[matchingKeys[0]];

  if (!targetObject || typeof targetObject !== 'object') {
    return { error: 'Matched key does not contain an object' };
  }

  if (!(propertyName in targetObject)) {
    return { error: `Property "${propertyName}" not found in object` };
  }

  return { value: (targetObject as Record<string, unknown>)[propertyName] as T };
}

/**
 * Extract a property from multiple objects identified by a key pattern.
 *
 * Searches for keys matching the given prefix, validates the expected count,
 * and extracts the specified property from each matched object.
 *
 * @param data - The object to search in
 * @param keyPrefix - The prefix to match keys against (e.g., "SmallMoleculeComponent-")
 * @param propertyName - The property to extract from each matched object
 * @param expectedCount - The expected number of matches (optional)
 * @returns Object containing the array of values and any error message
 */
export function extractPropertiesFromMultipleKeys<T = unknown>(
  data: unknown,
  keyPrefix: string,
  propertyName: string,
  expectedCount?: number
): { values?: T[]; error?: string } {
  if (!data || typeof data !== 'object') {
    return { error: 'Invalid data: expected an object' };
  }

  const matchingKeys = Object.keys(data as Record<string, unknown>).filter(
    key => key.startsWith(keyPrefix)
  );

  if (matchingKeys.length === 0) {
    return { error: `No keys found starting with "${keyPrefix}"` };
  }

  if (expectedCount !== undefined && matchingKeys.length !== expectedCount) {
    return { error: `Expected exactly ${expectedCount} keys starting with "${keyPrefix}", found ${matchingKeys.length}` };
  }

  const values: T[] = [];
  for (const key of matchingKeys) {
    const targetObject = (data as Record<string, unknown>)[key];

    if (!targetObject || typeof targetObject !== 'object') {
      return { error: `Key "${key}" does not contain an object` };
    }

    if (!(propertyName in targetObject)) {
      return { error: `Property "${propertyName}" not found in object at key "${key}"` };
    }

    values.push((targetObject as Record<string, unknown>)[propertyName] as T);
  }

  return { values };
}