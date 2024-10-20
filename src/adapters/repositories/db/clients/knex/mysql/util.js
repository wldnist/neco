export const checkExistingUUIDProcess = async ({
  dbClient,
  tableName,
  uuid,
}) => {
  const result = await dbClient
    .table(tableName)
    .count({ counted_uuid: "uuid" })
    .where("uuid", uuid)
    .first();

  return result;
};
