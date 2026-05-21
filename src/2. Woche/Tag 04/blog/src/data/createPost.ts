"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(title: string, description: string) {
  await db.execute({
    sql: "INSERT INTO `posts` (`title`, `description`) VALUES (?,?) ",
    args: [title, description],
  });
  revalidatePath("/posts");
}
