import { createClient } from "@libsql/client";

const client = new createClient({ url: "file:src/data/contacts.db" });

await client.execute({
  sql: `
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      reason TEXT,
      notes TEXT,
      done INTEGER NOT NULL DEFAULT 0
    )
  `,
});

await client.close();
