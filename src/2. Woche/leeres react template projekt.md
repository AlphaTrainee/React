# ein neues - leeres - React Projekt anlegen

```
npm create vite@latest mein-react-projekt -- --template react-ts

cd mein-react-projekt

npm i -D tailwindcss @tailwindcss/vite
```

## Zusätzliche Libs

`npm i styled-components`

## Komponenten installieren

```
npm install
npm run dev
```

## Settings

.prettierrc.json

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5"
}
```

vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```
