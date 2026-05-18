### Schritt-für-Schritt-Übung: Gleicher Style mit Plain CSS → CSS Modules → Tailwind

#### Ausgangslage

Du baust eine Komponente **`Badge`** (kleines Label), die je nach `variant` anders aussieht:

* `variant="success"`: grünlicher Hintergrund + dunkler grüner Text
* `variant="warning"`: gelblicher Hintergrund + dunkler gelber Text

Ziel-Style (für alle 3 Ansätze identisch):

* Inline-Element, abgerundet, dünner Rahmen, kleiner Innenabstand
* Schrift: klein, fett
* Farben abhängig von `variant`

---

## Teil 0: Badge-Komponente (Basis)

### Aufgabe 0

Erstelle `src/Badge.tsx` mit Props `label` und `variant` (`"success" | "warning"`). Rendere ein `span`.

### Lösung 0

```tsx
// src/Badge.tsx
type Variant = "success" | "warning";

type Props = {
  label: string;
  variant: Variant;
};

export function Badge({ label, variant }: Props) {
  return <span>{label}</span>;
}
```

---

## Teil 1: Plain CSS

### Aufgabe 1A

Lege `src/Badge.css` an und implementiere diese Klassen:

* `.badge` (Basis)
* `.badge.success`
* `.badge.warning`


### Aufgabe 1B

Importiere `Badge.css` in `Badge.tsx` und setze `className` so, dass `variant` als Zusatzklasse wirkt.


### Aufgabe 1C

Nutze `Badge` in `App.tsx` (2 Beispiele).


---

## Teil 2: CSS Modules

### Aufgabe 2A

Benenne `Badge.css` um in `Badge.module.css` und ändere Klassennamen so, dass du sie per Dot-Notation gut verwenden kannst:

* `.badge`
* `.success`
* `.warning`


### Aufgabe 2B

Passe `Badge.tsx` an: Import als `styles` und nutze die gescopten Klassennamen.

---

## Teil 3: Tailwind (gleicher Style, ohne eigene CSS-Datei)

### Aufgabe 3A

Entferne den CSS-Modules-Import aus `Badge.tsx` und ersetze ihn durch Tailwind-Utility-Klassen. Nutze weiterhin `variant` für die Farben.

