// seed.ts
import { db } from "./src/lib/db"; // Importiert die zentrale Engine

async function main() {
  const shouldReset = process.argv.includes("--reset");

  if (shouldReset) {
    await db.execute("DROP TABLE IF EXISTS posts");
    console.log("Option --reset aktiv: Alte Tabelle wurde gelöscht.");
  }

  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL 
    )
  `);

  console.log("Tabelle 'posts' wurde geprüft/erstellt.");

  const posts = [
    {
      id: 1,
      title: "Willkommen in meinem Blog",
      description: "Dies ist die Beschreibung des ersten Beitrags.",
    },
    {
      id: 2,
      title: "Mein Weg ins Webentwicklung",
      description: "Das ist die Beschreibung des zweiten Beitrags.",
    },
    {
      id: 3,
      title: "Warum ich React liebe",
      description: "Eine kurze Beschreibung des dritten Beitrags.",
    },
    {
      id: 4,
      title: "Moderne Webtechnologien im Überblick",
      description:
        "In diesem Beitrag geht es um moderne Webtechnologien und ihre Anwendung.",
    },
    {
      id: 5,
      title: "Die beliebtesten JavaScript-Frameworks 2025",
      description:
        "Ein Überblick über die beliebtesten JavaScript-Frameworks im Jahr 2025.",
    },
    {
      id: 6,
      title: "React Server Components erklärt",
      description:
        "Wie man mit React Server Components die Performance einer Anwendung verbessert.",
    },
    {
      id: 7,
      title: "SQL vs. NoSQL: Was passt zu meinem Projekt?",
      description:
        "Datenbanken im Vergleich: SQL vs. NoSQL – wann man welche einsetzen sollte.",
    },
    {
      id: 8,
      title: "Einstieg in TypeScript",
      description:
        "Eine Einführung in TypeScript und warum es JavaScript-Projekte sicherer macht.",
    },
    {
      id: 9,
      title: "CSS-Grid vs. Flexbox",
      description:
        "CSS-Grid und Flexbox im Vergleich – wann welches Layout-System sinnvoll ist.",
    },
    {
      id: 10,
      title: "Next.js: Mehr als nur React",
      description:
        "Next.js und seine Vorteile gegenüber einer reinen React-Anwendung im Überblick.",
    },
  ];

  for (const post of posts) {
    await db.execute({
      sql: "INSERT INTO posts (title, description) VALUES (?, ?)",
      args: [post.title, post.description],
    });
  }

  console.log("Posts erfolgreich gespeichert!");

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
