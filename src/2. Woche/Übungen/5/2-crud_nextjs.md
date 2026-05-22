## Übung

Du baust eine CRUD-App (**Notes**) mit **Next.js (App Router)**:

- **R (Read)**: nur über **RSC** und **Query-Funktionen** in `src/data/queries/*`
  - Read ist aufgeteilt in **List** und **Detail**
- **C/U/D**: über **Server Actions**, je Action in **eigener Datei** in `src/data/actions/*`
- **Kein Formular**
  - Actions werden **serverseitig** durch **hardcoded Argumente** ausgelöst
- **Zod**: nur in `src/data/schema.ts` und **nur für Read-Outputs**
- DB: **SQLite via libSQL** (`@libsql/client`) als lokale Datei

- Zeitstempel:
  - **Insert**: `created_at`/`updated_at` durch **SQL Defaults** (`CURRENT_TIMESTAMP`)
  - **Update**: `updated_at` (`new Date().toISOString()`)

- Shared Layout: Header mit Links über `app/layout.tsx`
- DB-Init Script: erstellt DB + seedet Einträge (simpel)
- DB Client: `src/lib/db.ts` exportiert `getClient()`

- Schema minimal mit Zod

---

## Projektstruktur (Ordner/Dateien)

```txt
src/
  app/
    layout.tsx
    page.tsx
    notes/
      page.tsx
      [id]/
        page.tsx
        edit/
          page.tsx
  components/
    Header.tsx
  data/
    app.db
    schema.ts
    queries/
      getNotes.ts
      getNoteById.ts
    actions/
      createNote.ts
      updateNote.ts
      deleteNote.ts
  lib/
    db.ts
scripts/
  init-db.ts
.env.local
```

---

## Setup

### Install

```bash
pnpm add zod @libsql/client
```

### `.env.local`

```bash
LIBSQL_URL="file:./src/data/app.db"
```

### VS Code Inline Chat Prompts (für `scripts/init-db.ts`)

**Prompt 1 (Erstellung):**

> "Write a simple TypeScript script scripts/init-db.ts that uses @libsql/client, connects to process.env.LIBSQL_URL, creates a notes table, and inserts 5 seed notes. Use SQL defaults for created_at and updated_at (CURRENT_TIMESTAMP). Close the client at the end."

---

## Teil 0: DB Script

### Aufgabe

- Lege `scripts/init-db.ts` an.
- Script verbindet sich mit `process.env.LIBSQL_URL`.
- Erstellt Tabelle `notes` mit:
  - `created_at`/`updated_at` Default `CURRENT_TIMESTAMP`

- Insertet 5 Notes (hardcoded).
- Schließt am Ende: `client.close()`.

**SQL-Hinweis (Tabelle erstellen):**

```sql
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
```

**SQL-Hinweis (Insert):**

```sql
INSERT INTO notes (id, title, content) VALUES (wert1, wert2, wert3);
```

Ausführen:

```bash
node src/scripts/init-db.ts
```

---

## Teil 1: DB Client

### Aufgabe

- Erstelle `src/lib/db.ts`.
- Exportiere `getClient()`, damit du pro Operation schließen kannst.
- In jeder Query/Action: `try/finally` + `client.close()`.

---

## Teil 2: Zod Schema

### Aufgabe

- Erstelle `src/data/schema.ts`.

- Definiere:
  - `noteRowSchema`
  - `noteListSchema = z.array(noteRowSchema)`

---

## Teil 3: R (Read) – List und Detail als Queries

### Teil 3a: Query `getNotes` (List)

#### Aufgabe

- Erstelle `src/data/queries/getNotes.ts`.
- Implementiere `getNotes(): Promise<NoteRow[]>`.
- Führe SQL aus und validiere das Ergebnis über `noteListSchema.parse(res.rows)`.
- Schließe immer den Client.

**SQL-Hinweis:**

```sql
SELECT id, title, content, created_at, updated_at
from react_notes
ORDER BY created_at DESC;
```

---

### Teil 3b: Query `getNoteById` (Detail)

#### Aufgabe

- Erstelle `src/data/queries/getNoteById.ts`.
- Implementiere `getNoteById(id: string): Promise<NoteRow | null>`.
- SQL: `WHERE id = ?`
- Validiere über `noteListSchema.parse(res.rows)` und nimm `rows[0] ?? null`.
- Schließe immer den Client.

**SQL-Hinweis:**

```sql
SELECT id, title, content, created_at, updated_at
from react_notes
WHERE id = ?;
```

## Teil 4: C/U/D – Server Actions

**Prinzip:**
Server Action wird über onClick ausgelöst

### Teil 4a: Action `createNote`

#### Aufgabe

- Erstelle `src/data/actions/createNote.ts`.
- Exportiere `createNote(args: { title: string; content: string })`.
- Client schließen.
- Danach `revalidatePath("/notes")` und redirect zur Detailseite.

**SQL-Hinweis:**

```sql
INSERT INTO notes (id, title, content) VALUES (?, ?, ?);
```

### Teil 4b: Action `updateNote`

#### Aufgabe

- Erstelle `src/data/actions/updateNote.ts`.
- Exportiere `updateNote(args: {id: number,title: string; content: string })`.
- `updated_at` wird von **TypeScript** gesetzt
- Client schließen.
- `revalidatePath("/notes")`

**SQL-Hinweis:**

```sql
UPDATE notes
SET title = ?, content = ?, updated_at = ?
WHERE id = ?;
```

---

### Teil 4c: Action `deleteNote`

#### Aufgabe

- Erstelle `src/data/actions/deleteNote.ts`.
- Exportiere `deleteNote(args: { id: number })`.
- Client schließen.
- `revalidatePath("/notes")` und redirect zur Liste.

**SQL-Hinweis:**

```sql
DELETE from react_notes WHERE id = ?;
```

---

## Teil 5: Shared Layout (Header)

### Teil 5a: Header

#### Aufgabe

- Erstelle `src/components/Header.tsx` mit Links:
  - `/`
  - `/notes`

### Teil 5b: Layout

#### Aufgabe

- Erstelle `src/app/layout.tsx` und nutze `<Header />` als Shared Layout.

---

## Teil 6: Pages (RSC) – Read UI + Action-Trigger über Buttons

### Hinweis (wichtig)

- Damit ein **Button** eine **Server Action** per `onClick` auslösen kann, brauchst du **Client Components** (weil `onClick` ein Client-Event ist).
- Deine Seiten bleiben **RSC**, aber du kapselst die Buttons in kleine **Client Components**:
  - `CreateButton` (oben)
  - `NoteActions` (pro Note: Update/Delete)

---

## Teil 6a: Notes List + Create/Update/Delete per Buttons (Client Component)

### Aufgabe

- Passe `src/app/notes/page.tsx` an:
  - Liste weiter über `getNotes()` (RSC).
  - Oben ein **Create-Button**, der eine hardcodete Note erstellt.
  - Pro Note ein **Update**- und **Delete**-Button.

- Kein `searchParams` mehr.
- Server Actions werden über `onClick` aus Client Components aufgerufen:
  - `createNote({ title, content })`
  - `updateNote({ id, title, content })`
  - `deleteNote({ id })`

- Hinweis:
  - lege `src/components/CreateButton.tsx` an
  - und lege `src/components/NoteActions.tsx` gib Update und Delete Button zurück an (diese Komponente nimmt `id` als prop)

---

## Teil 6c: Detail Page

#### Aufgabe

- Erstelle `src/app/notes/[id]/page.tsx`.
- Lade Note über `getNoteById(id)`.
- Wenn nicht gefunden: `notFound()`.
- Zeige Note + Link zurück zur Liste.
