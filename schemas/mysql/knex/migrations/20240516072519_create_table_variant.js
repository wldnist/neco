/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("variant", (table) => {
    table.increments("id").primary();
    table.uuid("uuid").defaultTo(knex.raw("(UUID())")).notNullable().unique();
    table.string("product_code", 10).notNullable();
    table.string("unit_code", 10).notNullable();
    table.string("code", 10).notNullable().unique();
    table.integer("quantity").notNullable();
    table.text("description");
    table.enum("status", ["ACTIVE", "INACTIVE", "DELETED"]).defaultTo("ACTIVE");
    table.string("created_by", 255);
    table.string("updated_by", 255);
    table.timestamps(true, true);

    table.unique(["product_code", "unit_code", "quantity"], {
      indexName: "variant_composite_index",
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("variant");
};
