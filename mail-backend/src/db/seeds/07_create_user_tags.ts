import { Knex } from "knex";
import { random, sample } from "lodash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user_tags").del();
  const users = await knex("users").select();
  const tags = await knex("tags").select();
  const data = [];
  for (const user of users) {
    for (let i = 0; i < random(5, 10); i++) {
      if (i > 4) {
        data.push({
          user_id: user.id,
          tag_id: sample(
            tags.filter((itme) => itme.id > 5).map((item) => item.id)
          ),
        });
      } else {
        data.push({
          user_id: user.id,
          tag_id: tags[i].id,
        });
      }
    }
  }
  // Inserts seed entries
  await knex("user_tags").insert(data);
}
