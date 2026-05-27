## Übungen

---

### Frage 1

**Wie verbessert die eingebaute Next.js `Form`-Komponente die Formularverarbeitung im Vergleich zu einem nativen `<form>`-Element?**

### Antwort

- es gibt keinen kompletten Reload
- die Validierung der Daten kann direkt auf dem Server stattfinden, mit ZOD

---

### Frage 2

**Welches Argument kann im `console.log` verwendet werden, um den eingegebenen Namen beim Absenden auszugeben?**

```tsx
<form action={(data) => console.log()}>
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</form>
```

### Antwort

```tsx
<form action={(data) => console.log(data.get("name"))}>
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</form>
```

---

### Frage 3

**Was ist das Problem mit folgendem Formular, das eine React Server Action für die Übermittlung verwendet?**

```tsx
<form onSubmit={someServerAction}>...</form>
```

### Antwort

es wird ein kompletter Reaload ausgelöst, mit React serverAction benötigt man kein JavaScript im Browser
die Validierung erfolgt in der Komponente und kann direkt in den Browser ohne ein komplettes Reload zurückgegeben werden

---

### Frage 4

**Was ist der Vorteil der Verwendung des `action`-Attributs gegenüber `onSubmit` für die Formularübermittlung?**

### Antwort

Der Hauptvorteil des action-Attributs ist, dass das Formular auch dann funktioniert, wenn JavaScript im Browser noch nicht geladen ist oder deaktiviert wurde (das Prinzip des Progressive Enhancement).

Bei onSubmit bleibt das Formular dagegen komplett tot, bis das gesamte JavaScript geladen und einsatzbereit ist.

---

### Frage 5

**Warum ist das Ergebnis von `console.log(name)` hier `null`, obwohl ein Name eingegeben und abgesendet wird?**

```tsx
function App() {
  const [name, formAction] = useActionState(updateName, "");
  return (
    <form action={formAction}>
      <input type="text" defaultValue={(name ?? "") as string} />
      <button type="submit">Submit</button>
    </form>
  );
}

async function updateName(_: FormDataEntryValue | null, formData: FormData) {
  const name = formData.get("name");
  console.log(name);
  return name;
}
```

### Antwort

es fehlt

```tsx
name="name"

// in
<input type="text" defaultValue={(name ?? "") as string} />
```
