// src/lib/db.ts
import { createClient } from "@libsql/client";
import mysql from "mysql2/promise";

// Einheitliches Interface für deine App und Skripte
interface UniversalDB {
  execute: (options: string | { sql: string; args?: any[] }) => Promise<any>;
  close: () => Promise<void>;
}

const dbType = process.env.DB_TYPE || "libsql";

let db: UniversalDB;

if (dbType === "mysql") {
  // 1. MySQL / MariaDB Verbindungspool erstellen
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
  });

  db = {
    async execute(options) {
      let sql = "";
      let args: any[] = [];

      if (typeof options === "string") {
        sql = options;
      } else {
        sql = options.sql;
        args = options.args || [];
      }

      // SQLite nutzt "AUTOINCREMENT", MySQL verlangt "AUTO_INCREMENT"
      if (sql.includes("AUTOINCREMENT")) {
        sql = sql.replace("AUTOINCREMENT", "AUTO_INCREMENT");
      }

      const [rows] = await pool.execute(sql, args);
      return { rows };
    },

    async close() {
      await pool.end();
      console.log("MySQL-Verbindungspool sauber geschlossen.");
    },
  };

  console.log("Zentrale DB-Engine auf MYSQL/MARIADB umgestellt.");
} else {
  // Fallback auf LibSQL / SQLite
  const client = createClient({
    url: process.env.DB_URL || "file:src/data/blog.db",
  });

  db = {
    async execute(options) {
      return await client.execute(options);
    },

    async close() {
      // Lokales SQLite benötigt kein zwingendes Schließen über Netzwerk-Pools
    },
  };

  console.log("Zentrale DB-Engine auf LIBSQL/SQLITE umgestellt.");
}

export { db };
