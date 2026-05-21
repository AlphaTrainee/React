## Fragen und Antworten

### 1) Frage

- Wir haben folgende RSC für eine Page. Die Seite dauert, weil `getPeople` langsam ist. Was können wir tun, um die User Experience zu verbessern (außer `getPeople` zu optimieren)?

```tsx
export default async function People() {
  const people = await getPeople();
  return (
    <ul>
      {people.map((person) => (
        <li key={person}>
          <span>{person}</span>
        </li>
      ))}
    </ul>
  );
}
```

### Antwort

```tsx
import { Suspense } from "react";
import { Loading } from "@/components/Loading";

export default async function People() {
  const people = await getPeople();
  return (
    <ul>
      <Suspense fallback={<Loading />}>
        {people.map((person) => (
          <li key={person}>
            <span>{person}</span>
          </li>
        ))}
      </Suspense>
    </ul>
  );
}
```

---

### 2) Frage: Fehler in `getPeople` soll nicht die ganze App kaputt machen

- Betrachte folgende RSC. Wenn in `getPeople` ein Fehler geworfen wird, rendert die ganze React App nicht mehr. Wie verbessern wir das so, dass nur `PeopleList` fehlschlägt?

```tsx
export async function PeopleList() {
  const people = await getPeople();
  return (
    <ul>
      {people.map((person) => (
        <li key={person}>
          <span>{person}</span>
        </li>
      ))}
    </ul>
  );
}
```

### Antwort

```tsx
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default async function People() {
  const people = await getPeople();
  return (
    <ul>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          {people.map((person) => (
            <li key={person}>
              <span>{person}</span>
            </li>
          ))}
        </ErrorBoundary>
      </Suspense>
    </ul>
  );
}
```

---

### 3) Frage: Vorteil von React Server Functions vs. API Routes

### Antwort

kein http fetch, also kein Reload

---

### 4) Frage: Warum sind React Server Functions für Data Fetching nicht empfohlen?

### Antwort

- Daten laden (GET): Direkt in der async Server Component erledigen (nutzt effizientes Caching).
- Daten ändern/löschen/speichern (POST): Über React Server Functions / Actions abwickeln.

---

### 5) Frage: Build Error im folgenden Component - was ist das Problem?

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(1);

  async function saveCount(count: number) {
    "use server";
    db.count.save(count);
  }

  function handleClick() {
    setCount((prev) => {
      const newCount = prev + 1;
      saveCount(newCount);
      return newCount;
    });
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

### Antwort

Der Build Error entsteht, weil versucht wird, eine Inline-"use server"-Funktion innerhalb einer "use client"-Datei zu deklarieren.
