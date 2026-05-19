## Fragen

### 1) Welche Datei definiert im Next.js App Router das Layout eines Routen-Segments, das über mehrere Seiten hinweg bestehen bleibt?

## layout.tsx

### 2) Beim Aufrufen der URL /home in einer Next.js-App wird ein 404-Fehler zurückgegeben. Hier ist der Inhalt des Ordners src/app:

```text
app/
├── globals.css
├── layout.tsx
├── page.tsx
└── home.tsx
```

es müsste so

```text
app/
├── globals.css
├── layout.tsx
├── page.tsx
└── home
      └── page.tsx
```

## aussehen

### 3) Kann eine Next.js Link-Komponente in einer RSC (React Server Component) verwendet werden?

## JA

### 4) In Next.js soll eine Header-Komponente auf jeder Seite platziert werden. Welchen Ansatz würdest du empfehlen?

unter src einen Ordner `components` und darin eine Datei `Header.tsx` erstellen
die Header Datei dann an passender Stelle im Layout einbinden

---

### 5) Beim Aufrufen der URL /customers/10 in einer Next.js-App wird ein 404-Fehler zurückgegeben. Hier ist der Inhalt des Ordners src/app/customers:

```text
app/
├── customers
      └── id
               └── page.tsx
```

der Ordner muss `[id]` heißen
