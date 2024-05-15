import { faker } from "@faker-js/faker";
import { branches } from "./variables/constants.js";

export const factoryData = () => {
  let result = [];
  for (const branch of branches) {
    const object = {
      id: branch.id,
      org_id: faker.number.int({
        min: 1,
        max: 100,
      }),
      code: branch.branch_code,
      name: branch.branch_name,
      created_by: "superadmin@superadmin.com",
    };

    result = [...result, object];
  }

  return result;
};

export default factoryData;
