// src/data/queries.ts
import { db } from "./db"; // Pfad zu Ihrer db.ts anpassen

export type Post = {
  id: number;
  title: string;
  description: string;
};

export async function getAllPosts(): Promise<Post[]> {
  // Kein createClient mehr nötig
  const data = await db.execute("SELECT id, title, description FROM posts");

  // Sicheres Mapping: LibSQL liefert Zeilen, die wir explizit casten
  return data.rows as unknown as Post[];
}

export async function getFilteredPostsTitle(
  criteria: string,
): Promise<Post[] | null> {
  const data = await db.execute({
    sql: "SELECT id, title, description FROM posts WHERE title LIKE ?",
    args: [`%${criteria}%`],
  });

  if (data.rows.length === 0) {
    return null;
  }

  return data.rows as unknown as Post[];
}

export async function getFilteredPostsDescription(
  criteria: string,
): Promise<Post[] | null> {
  const data = await db.execute({
    sql: "SELECT id, title, description FROM posts WHERE description LIKE ?",
    args: [`%${criteria}%`],
  });

  if (data.rows.length === 0) {
    return null;
  }

  return data.rows as unknown as Post[];
}

export async function getPost(id: number): Promise<Post | null> {
  const data = await db.execute({
    sql: "SELECT id, title, description FROM posts WHERE id = ?",
    args: [id],
  });

  if (data.rows.length === 0) {
    return null;
  }

  // Nur die erste gefundene Zeile zurückgeben
  return data.rows[0] as unknown as Post;
}
