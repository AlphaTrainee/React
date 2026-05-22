// src/data/queries/getNoteById.ts
import { getClient } from "@/lib/db";
import { type NoteRow } from "../schema";

export async function getNoteById(id: number): Promise<NoteRow | null> {
  const client = getClient();

  try {
    const res = await client.execute({
      sql: "SELECT id, title, content, created_at, updated_at FROM react_notes WHERE id = ?;",
      args: [id],
    });

    // Treiber-Strukturen für MySQL abfangen
    const rows = res.rows || res;

    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as NoteRow;
    }

    // Falls es ein verschachteltes Array [rows, fields] ist
    if (Array.isArray(res) && Array.isArray(res[0]) && res[0].length > 0) {
      return res[0][0] as NoteRow;
    }

    return null;
  } catch (error) {
    console.error(`Fehler beim Laden der Notiz mit ID ${id}:`, error);
    return null;
  } finally {
    await client.close();
  }
}
