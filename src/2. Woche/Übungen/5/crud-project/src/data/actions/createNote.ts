// src/data/actions/createNote.ts
"use server";

import { getClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createNote(args: { title: string; content: string }) {
  const client = getClient();

  try {
    // ID wird über AUTO_INCREMENT von MySQL selbst befüllt
    await client.execute({
      sql: "INSERT INTO react_notes (title, content) VALUES (?, ?);",
      args: [args.title, args.content],
    });
  } catch (error) {
    console.error("Fehler beim Erstellen der Notiz:", error);
  } finally {
    await client.close();
  }

  // Zwingt Next.js, die Liste frisch von der DB zu laden
  revalidatePath("/notes");
}
