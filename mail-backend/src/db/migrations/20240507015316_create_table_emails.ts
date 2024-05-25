import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("mails", (table) => {
    table.increments();
    table.integer("from_id");
    table.string("subject");
    table.text("body");
    table.integer("level");
    table.integer("parent_id");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.fn.now());
    table.dateTime("deleted_at");

    table.foreign("parent_id").references("mails.id").onDelete("CASCADE");
    table.foreign("from_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("mails");
}
