import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tags").del();
  const COLORS = [
    "#FFFF00", // Yellow
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
    "#000000", // Black
    "#FFFFFF", // White
    "#808080", // Gray
    "#00FFFF", // Cyan
    "#FF00FF", // Magenta
    "#40E0D0", // Turquoise
    "#E6E6FA", // Lavender
  ];

  const data = [
    { name: "Important", color: "#FF0000", level: 1 }, // red
    { name: "Personal", color: "#008000", level: 2 }, // green
    { name: "Todo", color: "#0000FF", level: 3 }, // blue
    { name: "Later", color: "#800080", level: 4 }, // purple
    { name: "Work", color: "#FFA500", level: 5 }, // orange
  ];

  for (let i = 0; i < COLORS.length; i++) {
    data.push({
      name: faker.lorem.word(),
      color: COLORS[i],
      level: i + 6,
    });
  }
  // Inserts seed entries
  await knex("tags").insert(data);
}
