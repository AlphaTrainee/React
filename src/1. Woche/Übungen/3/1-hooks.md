## Fragen und Antworten

### 1) TextVanish: Was ist das Problem?

**Aufgabe 1**

```tsx
export function TextVanish({ text }: Props) {
  if (!text) {
    return null;
  }
  const [textToRender, setTextToRender] = useState(text);
  useEffect(() => {
    setTimeout(() => setTextToRender(""), 5000);
  }, []);
  return <span>{textToRender}</span>;
}
```

zuerst die hooks, dann die abfrage

### 2) useEffect-Data-Fetch: Welche Probleme stecken drin?

**Aufgabe 2**

```tsx
const [data, setData] = useState([]);
useEffect(async () => {
  const data = await getData();
  setData(data);
});
```

1. async direkt in useEffect (Der Syntax-Fehler)

Man darf die Funktion, die man an useEffect übergibt, nicht als async deklarieren.

    Warum? useEffect erwartet als Rückgabewert entweder gar nichts (undefined) oder eine "Cleanup-Funktion" (um z.B. Timer zu stoppen). Eine async-Funktion gibt aber technisch gesehen immer ein Promise zurück. React weiß nicht, was es mit diesem Promise anfangen soll, und warnt dich sofort.

    Lösung: Du musst die async-Logik in eine Funktion innerhalb des Effekts verpacken.

2. Fehlendes Dependency-Array (Die Endlosschleife)

Hinter der schließenden geschweiften Klammer des Effekts fehlt das Array (z. B. []).

    Warum? Ohne dieses Array läuft der Effekt nach jedem Rendern der Komponente.

        Die Komponente rendert.

        Der Effekt startet und holt Daten.

        setData(data) wird aufgerufen.

        Ein State-Update löst ein neues Rendern aus.

        Der Effekt startet von vorn...

    Ergebnis: Du hast eine Endlosschleife programmiert, die deinen Rechner und den Server mit Anfragen flutet.

```tsx
useEffect(() => {
  // Eine interne async-Funktion erstellen
  const fetchData = async () => {
    try {
      const result = await getData();
      setData(result);
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  };

  fetchData();

  // Das leere Array [] sorgt dafür, dass dieser Effekt
  // NUR EINMAL beim "Einschalten" (Mount) läuft.
}, []);
```

### 3) useReducer: Auf welchen Typ wird action im "backwards"-Branch eingegrenzt?

**Aufgabe 3**

```ts
type State = { steps: number };
type Action =
  | { type: "forward"; steps: number }
  | { type: "backwards"; steps: number };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "forward":
      return { ...state, steps: state.steps + action.steps };
    case "backwards":
      return { ...state, steps: state.steps - action.steps };
    default:
      return state;
  }
}
```

"Auf den Typ, der die Eigenschaft type: 'backwards' besitzt."
