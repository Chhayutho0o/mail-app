import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("taggings", (table) => {
    table.increments();
    table.integer("tag_id");
    table.integer("mail_id");

    table.foreign("tag_id").references("tags.id").onDelete("CASCADE");
    table.foreign("mail_id").references("mails.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("taggings");
}
