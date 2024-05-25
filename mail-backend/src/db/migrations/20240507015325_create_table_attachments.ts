import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("attachments", (table) => {
    table.increments();
    table.integer("mail_id");
    table.string("file_name");
    table.string("file_type");
    table.string("file_size");
    table.string("file_url");
    table.dateTime("created_at").defaultTo(knex.fn.now());

    table.foreign("mail_id").references("mails.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("attachments");
}
