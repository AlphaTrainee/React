// scripts/init-db.ts
import { db } from "../../lib/db"; // Nutzt die zentrale Engine (Pfad angepasst von /scripts aus)

async function main() {
  const shouldReset = process.argv.includes("--reset");

  if (shouldReset) {
    await db.execute("DROP TABLE IF EXISTS react_notes");
    console.log(
      "Option --reset aktiv: Alte Tabelle 'react_notes' wurde gelöscht.",
    );
  }

  // Tabelle erstellen mit den geforderten CURRENT_TIMESTAMP Defaults
  await db.execute(`
    CREATE TABLE IF NOT EXISTS react_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Tabelle 'react_notes' wurde geprüft/erstellt.");

  // 5 geforderte Seed-react_notes
  const notes = [
    {
      title: "Erste Notiz",
      content: "Das ist der Inhalt der ersten Testnotiz.",
    },
    {
      title: "Einkaufsliste",
      content: "Milch, Brot, Kaffee und Eier nicht vergessen.",
    },
    {
      title: "Kurs-Abgabe",
      content: "Das TypeScript-Datenbank-Skript bis heute Abend fertigstellen.",
    },
    {
      title: "Projekt-Idee",
      content: "Eine kleine Notiz-App mit React und LibSQL aufbauen.",
    },
    {
      title: "Wichtiger Hinweis",
      content: "Umgebungsvariablen immer in die .env.local eintragen.",
    },
  ];

  // Daten über die zentrale Engine einfügen
  for (const note of notes) {
    await db.execute({
      sql: "INSERT INTO react_notes (title, content) VALUES (?, ?)",
      args: [note.title, note.content],
    });
  }

  console.log("5 react_notes erfolgreich gespeichert!");

  // Verbindung trennen, damit Node das Terminal freigibt
  await db.close();
}

main().catch(async (err) => {
  console.error("Fehler beim Seeding:", err);
  try {
    await db.close();
  } catch (_) {}
  process.exit(1);
});
