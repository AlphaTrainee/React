// src/data/queries/getNotes.ts
import { getClient } from "@/lib/db";
import { type NoteRow } from "../schema";

export async function getNotes(): Promise<NoteRow[]> {
  const client = getClient();

  try {
    const res = await client.execute({
      sql: "SELECT id, title, content, created_at, updated_at from react_notes;",
      args: [],
    });

    // Falls der Treiber ein verschachteltes Array [rows, fields] zurückgibt:
    if (Array.isArray(res) && Array.isArray(res[0])) {
      return res[0] as unknown as NoteRow[];
    }

    // Falls die Daten in res.rows stecken (LibSQL / PlanetScale-Stil):
    if (
      res &&
      typeof res === "object" &&
      "rows" in res &&
      Array.isArray(res.rows)
    ) {
      return res.rows as unknown as NoteRow[];
    }

    // Falls die Daten direkt das Array sind:
    if (Array.isArray(res)) {
      return res as unknown as NoteRow[];
    }

    return [];
  } catch (error) {
    console.error("Fehler beim Laden der Notizen:", error);
    return [];
  } finally {
    await client.close();
  }
}
