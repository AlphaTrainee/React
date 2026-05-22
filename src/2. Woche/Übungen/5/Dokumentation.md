# Installation

```bash
npx create-next-app@latest crud-project --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack

cd crud-project
```

## sql

```bash
# Für SQLite:
npm i @libsql/client
npm i zod

# Für MariaDB / MySQL:
npm i mysql2

# Hilfsfunktion um den seeder bequem zu nutzen
npm install -D tsx
```

## package.json

```json
  "scripts": {
    "db:new": "node --env-file=.env.local --import tsx ./seed.mjs",
    "db:reset": "node --env-file=.env.local --import tsx ./seed.mjs --reset"
  },
```

```bash
# Datenbank neu erzeugen
npm run db:new

# Datenbank resetten
npm run db:reset
```
