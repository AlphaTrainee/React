## Ziel der Übung

Du erstellst ein React-Projekt mit Vite, richtest ESLint (Linting) und Prettier (Formatierung) ein, integrierst beides in VS Code und experimentierst anschließend bewusst mit unterschiedlichen Prettier-Regeln.

---

## Teil A: React-Projekt mit Vite erstellen

### Schritt A1: Projekt scaffolden

**Aufgabe**

1. Öffne ein Terminal.
2. Erstelle ein neues Vite-Projekt.
3. Wähle im Prompt: Framework "React", Variant "JavaScript" 

**Befehle**

```bash
npm create vite@latest
```

**Lösung (eine mögliche Prompt-Auswahl)**

* Project name: `vite-react-eslint-prettier`
* Framework: `React`
* Variant: `JavaScript` (oder `TypeScript`)

Vite nutzt create-vite als Scaffolding-Tool. 

---

### Schritt A2: Abhängigkeiten installieren und Dev-Server starten

**Aufgabe**

1. In den Projektordner wechseln.
2. Dependencies installieren.
3. Dev-Server starten.

**Lösung**

```bash
cd vite-react-eslint-prettier
npm install
npm run dev
```

Wenn alles passt, läuft die App lokal im Browser.

---

## Teil B: ESLint im Vite-React-Projekt einrichten

### Schritt B1: `eslint.config.js` anlegen/ersetzen

**Aufgabe**
Lege im Projekt-Root eine Datei `eslint.config.js` an (oder ersetze sie), damit React/JSX korrekt gelintet wird.

**Lösung: `eslint.config.js`**

```js
import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
];
```

---



## Teil C: Prettier einrichten und mit ESLint konfliktfrei kombinieren

### Schritt C1: Prettier installieren

**Aufgabe**
Installiere Prettier und zusätzlich `eslint-config-prettier`, damit ESLint keine Formatierungsregeln erzwingt, die Prettier widersprechen.

**Lösung**

```bash
npm i -D prettier eslint-config-prettier
```

---

### Schritt C2: Prettier-Konfiguration anlegen

**Aufgabe**
Lege eine Prettier-Konfig an.

**Lösung: `.prettierrc.json`**

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5"
}
```

Optional: `.prettierignore`

```txt
dist
node_modules
```

---

### Schritt C3: ESLint so erweitern, dass Prettier-Konflikte deaktiviert werden

**Aufgabe**
Binde `eslint-config-prettier` als letztes Element in die Flat-Config ein.

**Lösung: `eslint.config.js` (Ergänzung)**

```js
import prettier from "eslint-config-prettier";

// ...deine bisherigen config-Objekte

export default [
  // ...deine bisherigen Einträge
  prettier
];
```

Warum: `eslint-config-prettier` schaltet ESLint-Regeln ab, die mit Prettier kollidieren (Formatierung macht Prettier). 

---


## Teil D: ESLint + Prettier in VS Code verwenden

### Schritt D1: VS-Code Extensions installieren

**Aufgabe**
Installiere in VS Code:

* "ESLint"
* "Prettier - Code formatter"

Prettier Extension: ([Visual Studio Marketplace][3])

---

### Schritt D2: Workspace-Settings setzen

**Aufgabe**
Setzte die Einstellung, so dass beim Speichern automatisch formatiert wird.


## Teil E: Prettier-Einstellungen ausprobieren (Experimentieraufgaben)

### Schritt E1: Eine "chaotische" Datei anlegen

**Aufgabe**
Erstelle `src/demo-formatting.jsx` mit absichtlich schlechtem Stil.

**Lösung: `src/demo-formatting.jsx`**

```jsx
export default function Demo( {title,items,enabled} ){
  const data={title:title,items:items,enabled:enabled,meta:{ createdAt:new Date(), tags:["a","b","c"]}}
  return (
    <div  className="demo"  >
      <h2>{ title }</h2>
      {enabled? <ul>{items.map((x)=> <li key={x.id}>{x.name}</li>)}</ul> : <p>disabled</p>}
      <pre>{JSON.stringify(data,null,2)}</pre>
    </div>
  )
}
```

**Test**

* Speichern und beobachten, wie Prettier formatiert.

---

### Schritt E2: Drei Prettier-Experimente

#### Experiment 1: Zeilenumbruch über `printWidth`

**Aufgabe**
Ändere `"printWidth"` von `100` auf `60`, speichere `demo-formatting.jsx`.

**Lösung (Erwartung)**

* Längere JSX-Ausdrücke und Objekte werden aggressiver umgebrochen.

---

#### Experiment 2: Semikolons an/aus (`semi`)

**Aufgabe**
Ändere `"semi": true` auf `"semi": false`, speichere.

**Lösung (Erwartung)**

* Semikolons verschwinden an Statement-Enden.

---

#### Experiment 3: Quotes (`singleQuote`)

**Aufgabe**
Ändere `"singleQuote": true` auf `"singleQuote": false`, speichere.

**Lösung (Erwartung)**

* Strings werden auf doppelte Quotes umgestellt (mit Ausnahmen, wenn Escaping sonst schlechter wäre).
