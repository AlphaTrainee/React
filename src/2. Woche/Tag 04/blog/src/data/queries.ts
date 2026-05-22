"use server";

import { db } from "@/lib/db";
import { postSchema, postsSchema } from "./schema";

async function delay() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

export async function getAllPosts() {
  await delay();
  const data = await db.execute("SELECT id, title, description FROM posts");
  return postsSchema.parse(data.rows);
}

export async function getFilteredPosts(criteria: string) {
  await delay();
  const data = await db.execute({
    sql: "SELECT id, title, description FROM posts WHERE title LIKE  ?",
    args: [`%${criteria}%`],
  });
  return postsSchema.parse(data.rows);
}

export async function getPost(id: number) {
  await delay();
  const data = await db.execute({
    sql: "SELECT id, title, description FROM posts WHERE id = ?",
    args: [id],
  });
  return postSchema.parse(data.rows[0]);
}
