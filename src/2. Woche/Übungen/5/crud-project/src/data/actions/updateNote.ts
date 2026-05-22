// src/data/actions/updateNote.ts
"use server";

import { getClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateNote(args: {
  id: number;
  title: string;
  content: string;
}) {
  const client = getClient();

  try {
    await client.execute({
      sql: "UPDATE react_notes SET title = ?, content = ? WHERE id = ?;",
      args: [args.title, args.content, args.id],
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Notiz:", error);
  } finally {
    await client.close();
  }

  revalidatePath("/notes");
}
