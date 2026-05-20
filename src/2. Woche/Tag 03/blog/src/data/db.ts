// src/lib/db.ts
import { createClient } from "@libsql/client";

// Der Client wird einmalig erstellt und bleibt offen
export const db = createClient({
  url: process.env.DB_URL ?? "file:local.db", // Fallback auf lokale Datei, falls DB_URL leer ist
});
