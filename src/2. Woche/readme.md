# NextJS

```bash
npx create-next-app@latest app --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

## sql

```bash
# Für SQLite:
npm install sqlite3 sqlite
npm install --save-dev @types/sqlite3

# Für MariaDB / MySQL:
npm install mysql2

# Für MSSQL:
npm install mssql
npm install --save-dev @types/mssql
```

## Server Komponenten

### Der Hauptbefehl

- npx create-next-app@latest
  Das lädt das offizielle Installations-Werkzeug von Next.js in der allerneuesten Version (@latest) herunter und startet es sofort, ohne dass du es dauerhaft global auf deinem Rechner installieren musst.

- app
  Das ist schlicht und ergreifend der Name deines Projektordners. Der Befehl erstellt einen neuen Ordner namens app auf deiner Festplatte und packt das gesamte Projekt dort hinein.

### Die Konfigurations-Schalter (Flags)

- --ts (TypeScript)
  Schaltet TypeScript ein. Das bedeutet, dein Projekt nutzt .ts und .tsx Dateien statt normalem JavaScript. Es sorgt für strenge Typisierung und hilft dir, Fehler im Code zu finden, noch bevor der Code überhaupt ausgeführt wird.

- --tailwind (Tailwind CSS)
  Installiert das Tailwind-Framework und konfiguriert es direkt. Damit ist das Projekt sofort für den oben besprochenen Utility-First-Ansatz einsatzbereit. Du kannst direkt mit Klassen wie flex oder p-4 arbeiten.

- --eslint (ESLint)
  Installiert einen "Code-Polizisten". ESLint scannt deinen Code während des Schreibens und meckert sofort (z. B. in VS Code), wenn du Syntaxfehler machst, Variablen vergisst oder unsauberen Code schreibst.

- --app (App Router)
  Das ist die Aktivierung für die moderne Architektur von Next.js (das Prinzip mit der Aufteilung in Server- und Client-Komponenten, das wir gerade besprochen haben). Dadurch wird die Ordnerstruktur auf den aktuellen app-Ordner-Standard festgelegt.

- --src-dir (Src-Verzeichnis)
  Zwingt Next.js dazu, den gesamten Quellcode deines Projekts in einen Unterordner namens src/ zu packen. Das hält das Projekt sauber, weil Konfigurationsdateien (wie für Tailwind oder ESLint) außen liegen und dein eigentlicher App-Code sauber im src-Ordner getrennt ist.

- --import-alias "@/\*"
  Das ist eine enorme Erleichterung für Pfadangaben im Code. Statt bei tief verschachtelten Dateien lästige relative Pfade wie import Button from "../../../components/Button" schreiben zu müssen, definiert das @ das Hauptverzeichnis. Du kannst dann von überall aus einfach import Button from "@/components/Button" schreiben.

- --turbopack
  Schaltet den brandneuen, in Rust geschriebenen Compiler von Vercel ein. Er ersetzt das ältere Webpack und sorgt dafür, dass der lokale Entwicklungsserver extrem schnell startet und Änderungen im Code quasi verzögerungsfrei (Hot Reloading) im Browser angezeigt werden.

### Fazit

Wenn du diesen Befehl im Terminal ausführst, hast du danach ein schlüsselfertiges Profi-Setup: Modernste Ordnerstruktur (--app, --src-dir), fehlerprüfendes TypeScript (--ts), sauberer Code-Stil (--eslint), fertiges Styling-System (--tailwind), einfache Importwege (--import-alias) und maximale Geschwindigkeit beim Entwickeln (--turbopack).

## Client Components

- nach dem Laden werden Client Components in Next.js **hydratisiert**
  Das Wort Hydratisierung (oder englisch Hydration) klingt total chemisch, bedeutet im Webdesign aber einfach nur: Der statische HTML-Code wird mit JavaScript zum Leben erweckt.
  Man kann sich das wie eine Trockenblume vorstellen, die man mit Wasser gießt, damit sie aufblüht.
