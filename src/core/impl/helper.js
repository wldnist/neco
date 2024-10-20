export const retrieveDataProcess = async ({
  repository,
  method,
  resultKey,
  params,
}) => {
  const result = { [resultKey]: {} };
  if (typeof repository[method] !== "function") return result;
  const data = await repository[method](params);
  if (!data) return result;
  result[resultKey] = data;

  return result;
};
