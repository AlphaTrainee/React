## Fragen

### Frage 1

**Was ist das Problem mit folgendem Data-Fetching-Code?**

```ts
useEffect(() => {
  fetch("/api/data")
    .then((res) => res.json())
    .then((data) => setData(data));
}, []);
```

## fehlende Absicherung (Ladezustand, Fehlerbehandlung, Server-Side-Rendering)

### Frage 2

**Warum wird empfohlen, Server Functions nicht für Data Fetching in Next.js zu verwenden?**

es kann nur POST genutzt werden

KI:

<blockquote>
1. POST-Anfragen blockieren das Caching

Der wichtigste Grund ist die Performance.

    Normale API-Abfragen (GET): Der Browser und Next.js können die Antwort einer GET-Anfrage super einfach im Zwischenspeicher (Cache) merken. Wenn der User die Seite noch mal aufruft, kommen die Daten blitzschnell ohne Server-Anfrage aus dem Cache.

    Server Actions (POST): HTTP-POST-Anfragen sind laut Web-Standard dafür da, Daten auf dem Server zu verändern (z. B. einen Post erstellen). Sie werden niemals automatisch gecacht. Jedes einzelne Daten-Fetching über eine Server Action zwingt den Server, die Arbeit jedes Mal komplett neu zu machen.

2. Schlechtes Zusammenspiel mit Suchmaschinen (SEO) und URLs

Weil Server Actions auf POST basieren, hängen sie an keinem eindeutigen Link.
Wenn du Daten über eine Server Action filterst (z. B. eine Suche nach "Schuhe"), kannst du diesen Zustand nicht einfach als URL speichern (/produkte?suche=schuhe) und an einen Freund schicken. Bei einem Seiten-Reload wären die geladenen Daten sofort wieder weg. 3. Sicherheits- und Architektur-Risiken

Server Actions sind dafür gebaut, sicher Daten vom Client entgegenzunehmen und Mutationen (Schnittstellen zur Datenbank) auszuführen. Wenn man sie als reines Fetching-Werkzeug missbraucht, tunnelt man das sauber getrennte Schichten-Modell von Next.js.

</blockquote>

### Frage 3

**Was ist die Ausgabe der folgenden Zod-Validierung?**

```ts
const userSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
});

const result = userSchema.safeParse({
  name: "Alice",
  age: 16,
});

console.log(result.success);
```

## false

### Frage 4

**Was macht folgende Mutation beim Absenden des Formulars?**

```ts
const mutation = useMutation({
  mutationFn: (newUser) =>
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    }),
  onSuccess: () => {
    console.log("User created!");
  },
});

<form
  onSubmit={(e) => {
    e.preventDefault();
    mutation.mutate({ name: "Jane" });
  }}
>
  <button type="submit">Create User</button>
</form>;
```

## Es wird IMMER der User Jane erzeugt

### Frage 5

**Was macht die Option `staleTime` im folgenden Code?**

```ts
useQuery(["todos"], fetchTodos, { staleTime: 10000 });
```

staleTime ist die Zeit, bis die Daten als alt Markiert werden und neu geladen werden
