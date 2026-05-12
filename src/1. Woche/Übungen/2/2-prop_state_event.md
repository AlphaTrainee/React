## Übung: Eine React-Komponente, vier Teilbereiche

Ziel: Du baust eine einzige Komponente `CounterCard` und nutzt sie in `App.jsx`. Jeder Teil erweitert dieselbe Komponente.

---

## Teil 1: Props

### Aufgabe (Schritte)

1. Öffne `src/App.jsx`.
2. Erstelle in derselben Datei eine Komponente `CounterCard`.
3. `CounterCard` soll Props annehmen: `title` und `initial`.
4. `CounterCard` soll rendern:

   * eine Überschrift mit `title`
   * einen Text: `Startwert: {initial}`

## Teil 2: useState

### Aufgabe (Schritte)

1. Importiere `useState` in `App.jsx`.
2. In `CounterCard`: Lege State `count` an, initialisiert mit `initial`.
3. Zeige `Aktueller Wert: {count}` an (statt nur Startwert).


## Teil 3: Event

### Aufgabe (Schritte)

1. Füge zwei Buttons hinzu: `+1` und `-1`.
2. Beim Klick soll `count` jeweils erhöht bzw. verringert werden.
3. Nutze dabei die funktionale Form von `setCount`.


---

## Teil 4: Callback to parent

### Aufgabe (Schritte)

1. In `App`: Lege State `lastAction` an (z. B. `"Keine"`).
2. Übergib an `CounterCard` eine Prop `onChange`.
3. `CounterCard` soll bei jeder Änderung `onChange(newCount)` aufrufen.
4. `App` zeigt an: `Letzter Wert aus Kind: {lastAction}`.


