import knex from "knex";

jest.mock("knex", () => {
  const fn = () => {
    return {
      table: jest.fn().mockReturnThis(),
      raw: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      sum: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      whereIn: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      whereRaw: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      groupByRaw: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    };
  };
  return fn;
});

const knexConfigMock = jest.fn();
export const dbClientMock = knex(knexConfigMock);
