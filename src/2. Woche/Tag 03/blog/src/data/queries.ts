// src/data/queries.ts
import { db } from "./db"; // Pfad zu Ihrer db.ts prüfen

export type Post = {
  id: number;
  title: string;
  description: string;
};

// 1. ALLE POSTS HOLEN (Wichtig für die normale Übersicht ohne Suche)
export async function getAllPosts(): Promise<Post[]> {
  const data = await db.execute("SELECT id, title, description FROM posts");
  return data.rows as unknown as Post[];
}

// 2. KOMBINIERTE SUCHE (Sucht im Titel ODER in der Beschreibung)
export async function searchPosts(criteria: string): Promise<Post[] | null> {
  const data = await db.execute({
    sql: "SELECT id, title, description FROM posts WHERE title LIKE ? OR description LIKE ?",
    args: [`%${criteria}%`, `%${criteria}%`],
  });

  if (data.rows.length === 0) {
    return null;
  }

  return data.rows as unknown as Post[];
}

// 3. EINZELNEN POST HOLEN (Für die Detailseite via ID)
export async function getPost(id: number | string): Promise<Post | null> {
  const data = await db.execute({
    // CAST sorgt dafür, dass SQLite die ID immer als Text vergleicht, egal ob sie in der DB als INT oder TEXT liegt
    sql: "SELECT id, title, description FROM posts WHERE CAST(id AS TEXT) = CAST(? AS TEXT)",
    args: [id.toString()],
  });

  if (!data.rows || data.rows.length === 0) {
    return null;
  }

  // LibSQL-Zeile sauber in das Post-Objekt zwingen
  const row = data.rows[0];
  return {
    id: Number(row.id),
    title: String(row.title),
    description: String(row.description),
  } as Post;
}
