/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.uuid("uuid").defaultTo(knex.raw("(UUID())")).notNullable().unique();
    table.string("code", 10).notNullable().unique();
    table.string("name", 100).notNullable().unique();
    table.enum("status", ["ACTIVE", "INACTIVE", "DELETED"]).defaultTo("ACTIVE");
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
  return knex.schema.dropTable("category");
};