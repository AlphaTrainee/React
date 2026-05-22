// src/data/actions/deleteNote.ts
"use server";

import { getClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteNote(args: { id: number }) {
  const client = getClient();

  try {
    await client.execute({
      sql: "DELETE FROM react_notes WHERE id = ?;",
      args: [args.id],
    });
  } catch (error) {
    console.error("Fehler beim Löschen der Notiz:", error);
  } finally {
    await client.close();
  }

  revalidatePath("/notes");
}
