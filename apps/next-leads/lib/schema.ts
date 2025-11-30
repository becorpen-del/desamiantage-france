export type SchemaObject = Record<string, unknown>;

export function filterSchemaObjects(objects: Array<SchemaObject | null | undefined>): SchemaObject[] {
  return objects.filter((item): item is SchemaObject => Boolean(item));
}

export function stringifySchema(schema: SchemaObject | SchemaObject[]): string {
  return JSON.stringify(schema, null, 2);
}

export function stringifySchemaBundle(objects: Array<SchemaObject | null | undefined>): string {
  const filtered = filterSchemaObjects(objects);

  if (filtered.length === 1) {
    return stringifySchema(filtered[0]);
  }

  return stringifySchema(filtered);
}
