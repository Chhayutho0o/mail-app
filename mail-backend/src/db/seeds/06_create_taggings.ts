import { Knex } from "knex";
import { random, sample } from "lodash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("taggings").del();
  const mails = await knex("mails").select();
  const tags = await knex("tags").select();
  const updateTags = tags.slice(0, 5);
  const data = [];
  for (const mail of mails) {
    const numberOfTags = random(0, 2);
    for (let i = 0; i < numberOfTags; i++) {
      data.push({
        tag_id: sample(updateTags.map((item) => item.id)),
        mail_id: mail.id,
      });
    }
  }
  // Inserts seed entries
  await knex("taggings").insert(data);
}
