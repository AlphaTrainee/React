## Fragen

### Frage 1

- Wir haben eine Next.js-App mit folgender RSC:

```ts
import Counter from "@/components/Counter";
export default function Home() {
    return (
        <div>
             <Counter />
        </div>
    );
}
```

- Die `Counter`-Komponente sieht so aus:

```ts
import { useState } from "react";
export default function Counter() {
    const [count, setCount] = useState(1);
    return (
        <button
             onClick={() => setCount((prev) => prev + 1)}
        >
             {count}
        </button>
    );
}
```

- Es tritt ein Compile-Error auf. Was ist das Problem?

es fehlt

```ts
"use client";
import { useState } from "react";
....
```

---

### Frage 2

- Läuft eine RSC im Client? Läuft eine Client Component auf dem Server?

### Antwort 2

- RSC: Läuft nur auf dem Server. (0% im Client)
- Client Component: Läuft erst auf dem Server (für das schnelle erste HTML) und danach dauerhaft im Client (für die Klicks und den State).

---

### Frage 3

- Wir haben folgende Komponente, aber beim Rendern tritt ein Fehler auf. Was ist das Problem?

```ts
"use client";
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

### Antwort 3

```ts
"use client";
```

macht eine Client Komponente daraus, async await kann nur in Server Componenten verwendet werden

### Frage 4

- Ist es in einer Next.js-App möglich, eine RSC in eine Client Component zu verschachteln?

### Antwort 4

KI: Ja, das ist möglich – aber NUR über einen ganz bestimmten Trick: als children (Kinder-Element).

Wenn du versuchst, eine Server Component (RSC) wie eine ganz normale Komponente direkt in eine Client Component zu importieren, machst du dir die Server-Eigenschaften kaputt.

_Werde ich wohl erstmal nicht benutzen ...._

---

### Frage 5

- Welche der folgenden Optionen ist in einer RSC **nicht erlaubt**?
  - `fetch`
  - `useEffect`
  - `async / await`

### Antwort 5

useEffect
