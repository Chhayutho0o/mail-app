import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tags", (table) => {
    table.increments();
    table.string("name");
    table.string("color");
    table.integer("level");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tags");
}
