import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Knex } from "knex";
import { random, sample } from "lodash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("mails").del();
  await knex("recipients").del();

  const data = [];
  const users = await knex("users").select();
  for (const user of users) {
    for (let i = 0; i < random(50, 200); i++) {
      const mail = await knex("mails")
        .insert({
          from_id: user.id,
          subject: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(),
          created_at: faker.date.past(),
        })
        .returning("*");
      const recipients = await knex("users")
        .select()
        .whereNot("id", user.id)
        .orderByRaw("random()")
        .limit(random(1, 10));
      for (const recipient of recipients) {
        const isRead = sample([true, false]);
        const readDate = isRead ? dayjs().format() : null;
        data.push({
          mail_id: mail[0].id,
          to_id: recipient.id,
          is_read: isRead,
          read_date: readDate,
          status: sample(["none", "draft", "sent", "archive", "junk", "trash"]),
        });
      }
    }
  }

  await knex("recipients").insert(data);
}
