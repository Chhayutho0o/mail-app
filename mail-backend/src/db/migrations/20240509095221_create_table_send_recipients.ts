import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("recipients", (table) => {
    table.increments();
    table.integer("mail_id");
    table.integer("to_id");
    table.boolean("is_read").defaultTo(false);
    table.dateTime("read_date");
    table.enum("status", ["none", "draft", "sent", "archive", "junk", "trash"]);

    table.foreign("mail_id").references("mails.id").onDelete("CASCADE");
    table.foreign("to_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("recipients");
}
