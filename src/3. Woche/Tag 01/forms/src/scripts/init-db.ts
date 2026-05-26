// scripts/init-db.ts
import { db } from "../lib/db"; // Pfad ggf. anpassen, falls src/lib/db genutzt wird

async function main() {
  const shouldReset = process.argv.includes("--reset");

  if (shouldReset) {
    await db.execute("DROP TABLE IF EXISTS contacts");
    console.log(
      "Option --reset aktiv: Alte Tabelle 'contacts' wurde gelöscht.",
    );
  }

  // Tabelle erstellen mit deinen Spalten und dem AUTOINCREMENT-Switch für MySQL
  let createTableSql = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      reason TEXT,
      notes TEXT,
      done INTEGER NOT NULL DEFAULT 0
    )
  `;

  // SQLite nutzt "AUTOINCREMENT", MySQL verlangt "AUTO_INCREMENT"
  if (
    process.env.DB_TYPE === "mysql" &&
    createTableSql.includes("AUTOINCREMENT")
  ) {
    createTableSql = createTableSql.replace("AUTOINCREMENT", "AUTO_INCREMENT");
  }

  await db.execute(createTableSql);
  console.log("Tabelle 'contacts' wurde geprüft/erstellt.");

  // 3 Beispiel-Datensätze (Seed-Daten)
  const samplecontacts = [
    {
      name: "Max Mustermann",
      email: "max@example.com",
      reason: "Support",
      notes: "Hat Fragen zur API-Anbindung.",
      done: 0,
    },
    {
      name: "Anna Schmidt",
      email: "anna@example.com",
      reason: "Feedback",
      notes: "Sehr zufrieden mit dem Kursmaterial!",
      done: 1,
    },
    {
      name: "Tom Weber",
      email: "tom@example.com",
      reason: "Feature Request",
      notes: "Wünscht sich einen Darkmode für die Tabellen.",
      done: 0,
    },
  ];

  // Daten über die zentrale Engine einfügen
  for (const form of samplecontacts) {
    await db.execute({
      sql: "INSERT INTO contacts (name, email, reason, notes, done) VALUES (?, ?, ?, ?, ?)",
      args: [form.name, form.email, form.reason, form.notes, form.done],
    });
  }

  console.log("Beispiel-Formulare erfolgreich gespeichert!");

  // Verbindung trennen, damit Node das Terminal freigibt
  await db.close();
}

main().catch(async (err) => {
  console.error("Fehler beim Seeding der contacts-Tabelle:", err);
  try {
    await db.close();
  } catch (_) {}
  process.exit(1);
});
