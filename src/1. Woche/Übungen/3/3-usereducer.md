# Erstellt das Projektverzeichnis und das Grundgerüst

npm create vite@latest use-reducer -- --template react-ts

##

.prettierrc.json

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5"
}
```

## Wechsel in den Ordner

cd use-reducer

## Installiert die notwendigen Bibliotheken (die "Bauteile")

npm install
npm run dev

## Übung: Counter mit History via `useReducer`

Ziel: Ein Counter, der `+1`, `-1`, `Reset` kann und zusätzlich eine **History** (Liste der letzten Aktionen) führt. Das ist klein, aber zeigt klar, warum `useReducer` sinnvoll ist.

---

## Teilaufgabe 1: State + Actions definieren

**Aufgabe:** Definiere State (count + history) und Action-Typen.

---

## Teilaufgabe 2: `initialState` anlegen

**Aufgabe:** Starte bei `count = 0` und leerer History.

---

## Teilaufgabe 3: Reducer implementieren

**Aufgabe:** Implementiere `reducer(state, action)`:

- `INC`: count + 1, History-Eintrag `"+1"`
- `DEC`: count - 1, History-Eintrag `"-1"`
- `RESET`: count = 0, History-Eintrag `"reset"`

---

## Teilaufgabe 4: `useReducer` im `App` nutzen

**Aufgabe:** Verwende `useReducer(reducer, initialState)` und zeige den Counter an.

---

## Teilaufgabe 5: Buttons verdrahten

**Aufgabe:** Baue Buttons, die `dispatch` auslösen: `INC`, `DEC`, `RESET`.

---

## Teilaufgabe 6: History anzeigen (max. 5 Einträge)

**Aufgabe:** Zeige die letzten 5 Aktionen als Liste an.

---
