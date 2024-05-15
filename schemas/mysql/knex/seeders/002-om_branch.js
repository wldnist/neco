import { factoryData } from "../factories/om_branch.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex) {
  await knex("om_branch")
    .truncate()
    .then(function () {
      return knex("om_branch").insert(factoryData());
    });
};
