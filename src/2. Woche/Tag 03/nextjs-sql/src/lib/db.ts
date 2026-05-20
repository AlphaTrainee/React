// src/lib/db.ts
import mysql from "mysql2/promise";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbType = process.env.DB_TYPE;

// Globale Variablen, um die Verbindung wiederzuverwenden (Connection Pooling)
let mariadbConnection: mysql.Pool | null = null;
let sqliteConnection: any = null;

export async function getDbConnection() {
  // --- WELT 1: MARIADB / MYSQL ---
  if (dbType === "mariadb") {
    if (!mariadbConnection) {
      mariadbConnection = mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
      });
    }
    return {
      type: "mariadb",
      // Eine standardisierte Methode zum Abfragen, damit der Rest der App gleich bleibt
      query: async (sql: string, params?: any[]) => {
        const [rows] = await mariadbConnection!.execute(sql, params);
        return rows;
      },
    };
  }

  // --- WELT 2: SQLITE (Als Fallback) ---
  if (dbType === "sqlite") {
    if (!sqliteConnection) {
      sqliteConnection = await open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
      });
      // Erstelle eine Testtabelle, falls sie nicht existiert
      await sqliteConnection.exec(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          body TEXT
        )
      `);
    }
    return {
      type: "sqlite",
      query: async (sql: string, params?: any[]) => {
        return await sqliteConnection.all(sql, params);
      },
    };
  }

  throw new Error(
    `Datenbank-Typ "${dbType}" wird von der Weiche nicht unterstützt.`,
  );
}
