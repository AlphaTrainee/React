// src/lib/db.ts
import { createClient } from "@libsql/client";
import mysql from "mysql2/promise";

interface UniversalDB {
  execute: (options: string | { sql: string; args?: any[] }) => Promise<any>;
  close: () => Promise<void>;
}

const dbType = process.env.DB_TYPE || "libsql";

// Die explizit geforderte Funktion, um für jede Operation einen frischen Client zu holen
export function getClient(): UniversalDB {
  if (dbType === "mysql") {
    // MySQL verlangt hier eine einzelne Verbindung (Connection) statt eines Pools,
    // damit das manuelle Schließen pro Operation Sinn ergibt.
    const connectionPromise = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    });

    return {
      async execute(options) {
        const connection = await connectionPromise;
        let sql = typeof options === "string" ? options : options.sql;
        let args = typeof options === "string" ? [] : options.args || [];

        // SQLite nutzt "AUTOINCREMENT", MySQL verlangt "AUTO_INCREMENT"
        if (sql.includes("AUTOINCREMENT")) {
          sql = sql.replace("AUTOINCREMENT", "AUTO_INCREMENT");
        }

        const [rows] = await connection.execute(sql, args);
        return { rows };
      },

      async close() {
        const connection = await connectionPromise;
        await connection.end();
        console.log("MySQL-Verbindung geschlossen.");
      },
    };
  } else {
    // Fallback auf LibSQL / SQLite (Nutzt die URL aus der Aufgabe)
    const client = createClient({
      url:
        process.env.LIBSQL_URL || process.env.DB_URL || "file:src/data/blog.db",
    });

    return {
      async execute(options) {
        return await client.execute(options);
      },

      async close() {
        await client.close(); // Hier jetzt echtes Schließen für LibSQL
        console.log("LibSQL-Verbindung geschlossen.");
      },
    };
  }
}

// Wir exportieren ein Standard-db-Objekt als Fallback abwärtskompatibel,
// falls alte Skripte noch darauf zugreifen wollen.
export const db = {
  execute: async (options: string | { sql: string; args?: any[] }) => {
    const client = getClient();
    try {
      return await client.execute(options);
    } finally {
      await client.close();
    }
  },
  close: async () => {}, // Dummy, da getClient sich jetzt selbst schließt
};
