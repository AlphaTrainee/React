"use server";

import { type Client, type ResultSet } from "@libsql/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(title: string, description: string) {
  let result: ResultSet | undefined;
  let client: Client | undefined;

  try {
    result = await db.execute({
      sql: "INSERT INTO `posts` (`title`, `description`) VALUES (?,?) ",
      args: [title, description],
    });
  } catch {
    return {
      ok: false,
      id: undefined,
    };
  } finally {
    if (client) client.close();
  }

  revalidatePath("/posts");
  return {
    ok: result ? true : false,
    id: result ? result.lastInsertRowid : undefined,
  };
}
