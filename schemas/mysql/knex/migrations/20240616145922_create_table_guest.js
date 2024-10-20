/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("guest", (table) => {
    table.increments("id").primary();
    table.uuid("uuid").defaultTo(knex.raw("(UUID())")).notNullable().unique();
    table.string("code", 10).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("created_by", 255);
    table.string("updated_by", 255);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("guest");
};
