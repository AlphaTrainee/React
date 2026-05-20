import { createClient } from "@libsql/client";
import { fileURLToPath } from "node:url";
import path from "node:path";

// 1. Ermittelt den absoluten Pfad zu genau DIESER Skriptdatei
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Baut den Pfad absolut: Raus aus dem aktuellen Ordner, rein in "data"
const dbPath = path.resolve(__dirname, "..", "data", "blog.db");

// 3. Übergibt den sicheren, absoluten Pfad an LibSQL
const client = createClient({ url: `file:${dbPath}` });

await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
    )
`);

console.log("Created posts table");

// Die 10 gewünschten Beispiel-Posts
const posts = [
  {
    title: "Einführung in TypeScript",
    description:
      "Warum statische Typisierung die Fehlerquote in großen Web-Projekten massiv senkt.",
  },
  {
    title: "Die Evolution von ECMAScript",
    description:
      "Von einfachen Browser-Skripten zu modernen ES-Modulen und asynchroner Programmierung.",
  },
  {
    title: "Architektur-Muster im Vergleich",
    description:
      "Separation of Concerns: Warum klare Schichten-Trennung der Schlüssel zu wartbarem Code ist.",
  },
  {
    title: "Fehlersuche ohne Verzweiflung",
    description:
      "Strategien für effektives Debugging und warum aussagekräftige Fehlermeldungen Gold wert sind.",
  },
  {
    title: "Datenbanken im Wandel",
    description:
      "Ein Blick auf SQLite und LibSQL für schlanke, lokale und eingebettete Anwendungen.",
  },
  {
    title: "Clean Code Prinzipien",
    description:
      "Wie man Code so schreibt, dass er auch in fünf Jahren noch ohne Kopfschmerzen lesbar ist.",
  },
  {
    title: "Laufzeitumgebungen verstehen",
    description:
      "Die Unterschiede zwischen Node.js, Deno und modernen Web-Browser-Engines im Detail.",
  },
  {
    title: "Automatisierte Tests",
    description:
      "Warum Unit Tests die beste Versicherung gegen unbemerkt eingeschleuste Bugs sind.",
  },
  {
    title: "Effizientes Ressourcen-Management",
    description:
      "Wie man Software schreibt, die auch auf älterer Hardware noch performant läuft.",
  },
  {
    title: "Das API-Design Handbuch",
    description:
      "Best Practices für den Entwurf von klaren, vorhersehbaren und robusten Schnittstellen.",
  },
];

// Automatisiertes Einfügen in die SQLite-Datenbank
console.log("Füge Beispiel-Daten ein...");

for (const post of posts) {
  await client.execute({
    sql: "INSERT INTO posts (title, description) VALUES (?, ?)",
    args: [post.title, post.description],
  });
}

console.log("Erfolgreich 10 Posts in die Datenbank eingetragen.");
