/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("om_user", (table) => {
    table.increments("id").primary();
    table.string("uuid", 36).notNullable().unique();
    table.string("email", 255).notNullable().unique();
    table.string("name", 100).notNullable();
    table.string("phone", 15).notNullable();
    table.date("dob");
    table.integer("status").notNullable();
    table.text("password").notNullable();
    table.boolean("verified").notNullable();
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
  return knex.schema.dropTable("om_user");
};
