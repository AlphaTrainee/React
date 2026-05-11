# React installieren

```
curl -L https://unpkg.com/react@17/umd/react.development.js > react.js
curl -L https://unpkg.com/react-dom@17/umd/react-dom.development.js > react.dom.js
curl -L https://unpkg.com/babel-standalone/babel.min.js > babel.js

```

```
npm create vite@latest
```

-> react
-> javascript

npm install --omit=dev
npm i --save-dev prettier
npm i -D eslint-config-prettier

Um auf einem Produktionsserver Speicherplatz zu sparen und die Sicherheit zu erhöhen, solltest du nur die Pakete installieren, die für den Betrieb der Anwendung zwingend erforderlich sind.

Du kannst die devDependencies (wie Test-Frameworks oder Build-Tools) mit folgendem Befehl ignorieren:
Bash

npm install --omit=dev

Wichtige Details zu diesem Befehl:

    Moderner Standard: Seit npm v8 ist --omit=dev der empfohlene Befehl.

    Abwärtskompatibilität: Der alte Befehl npm install --production funktioniert zwar meistens noch, gilt aber als veraltet (deprecated).

    Umgebungsvariable: Wenn auf deinem Server die Umgebungsvariable NODE_ENV auf production gesetzt ist, führt npm standardmäßig nur eine Installation der normalen Dependencies aus, selbst wenn du nur npm install tippst.
