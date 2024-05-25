import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_tags", (table) => {
    table.increments();
    table.integer("tag_id");
    table.integer("user_id");

    table.foreign("tag_id").references("tags.id").onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_tags");
}
