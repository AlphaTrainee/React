## Debugging-Aufgabe: Next.js Routing (App Router) – Async Params + Promise

### Setup

Ziel: Du debugst **Route**, **Shared Layout**, **Route-Parameter**, **Liste via `map`**.
Wichtig: **Alle Funktionen, die `params` bekommen, sind `async` und geben ein `Promise` zurück.**

Projektstruktur (Soll):

```txt
app/
  layout.tsx
  page.tsx
  posts/
    layout.tsx
    page.tsx
    [slug]/
      page.tsx
lib/
  posts.ts
```

Daten:

```ts
// lib/posts.ts
export type Post = { slug: string; title: string; excerpt: string };

export const posts: Post[] = [
  { slug: "hello-next", title: "Hello Next", excerpt: "First post excerpt" },
  { slug: "routing-101", title: "Routing 101", excerpt: "Routing basics" },
  { slug: "layouts", title: "Layouts", excerpt: "Shared UI via layouts" },
];
```

---

## Teilaufgabe 1: Navigation ist kaputt (Route + Shared Layout UX)

### Problem

Auf `/` soll ein Link **zu** `/posts` führen, und auf `/posts` soll ein Link **zurück** nach `/` führen. Aktuell landet man in 404

### Fehlerhafter Code

```tsx
// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/post">Go to Posts</Link>
    </main>
  );
}
```

### Aufgabe

Fixe den Link (Route-Namen) und ergänze eine klare Rücknavigation in `/posts/page.tsx` (UX).

---

### Antwort

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      {/* FIX: Route von /post zu /posts korrigiert */}
      <Link href="/posts">Go to Posts</Link>
    </main>
  );
}
```

## Teilaufgabe 2: Shared Layout wird nicht angezeigt

### Problem

Unter `/posts` soll ein Shared Layout erscheinen (z. B. Heading/Navigation), aber die Inhalte darunter fehlen.

### Fehlerhafter Code

```tsx
// app/posts/layout.tsx
export default function PostsLayout() {
  return (
    <section>
      <header>
        <h2>Posts Area</h2>
      </header>
    </section>
  );
}
```

### Aufgabe

Warum „verschluckt“ dieses Layout die Pages darunter?

---

### Antwort

```tsx
// app/posts/layout.tsx
import React from "react";

// FIX: children als Prop aufnehmen und im JSX platzieren
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header>
        <h2>Posts Area</h2>
      </header>
      {/* FIX: Hier werden die untergeordneten Seiten hineingerendert */}
      {children}
    </section>
  );
}
```

## Teilaufgabe 3: Dynamische Route `[slug]` – Params falsch typisiert (async + Promise)

### Problem

`/posts/hello-next` zeigt Fehler, weil `params` falsch verwendet wird.

### Fehlerhafter Code

```tsx
// app/posts/[slug]/page.tsx
export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Post: {params.slug}</h1>
    </main>
  );
}
```

### Aufgabe

Was ist das Problem?

### Antwort

Problem: Gleich drei Fehler:

    Der Ordner heißt [slug], also muss die Variable im Typ slug heißen, nicht id.

    In modernen Next.js-Versionen ist params ein Promise. Die Komponente muss async sein und params muss mit await aufgelöst werden.

```tsx
// app/posts/[slug]/page.tsx
// FIX: params ist ein Promise, Komponente ist async
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // FIX: params auflösen vor dem Zugriff
  const resolvedParams = await params;

  return (
    <main>
      <h1>Post: {resolvedParams.slug}</h1>
    </main>
  );
}
```

---

## Teilaufgabe 4: Liste via `map` rendert nicht (Import + Return)

### Problem

`/posts` soll Posts listen, aber es erscheint nichts oder es gibt einen Fehler.

### Fehlerhafter Code

```tsx
// app/posts/page.tsx
import Link from "next/link";
import { posts } from "../lib/posts";

export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => {
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>;
        })}
      </ul>
    </main>
  );
}
```

### Aufgabe

Fixe zwei Dinge:

1. Import-Pfad zu `lib/posts.ts`
2. `map` muss tatsächlich JSX zurückgeben

### Antwort

Problem:

    Der Import-Pfad mit ../lib/posts stimmt von app/posts/page.tsx aus nicht (es müsste ein ../ mehr sein oder der @/-Alias genutzt werden).

    Die map-Funktion nutzt geschweifte Klammern { ... }, hat aber kein return-Statement. Deshalb wird undefined gerendert.

**Korrigierte app/posts/page.tsx (Inklusive Rücklink aus Teilaufgabe 1):**

```tsx
// app/posts/page.tsx
import Link from "next/link";
// FIX 1: Import-Pfad korrigiert (zwei Ebenen hoch aus app/posts/ heraus)
import { posts } from "../../lib/posts";

export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => {
          // FIX 2: Das 'return' wurde hinzugefügt
          return (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>

      {/* UX-FIX aus Teilaufgabe 1: Rücknavigation zur Startseite */}
      <hr style={{ margin: "20px 0" }} />
      <Link href="/">← Zurück zur Startseite</Link>
    </main>
  );
}
```

---

## Teilaufgabe 5: Detailseite zeigt Post-Daten + notFound

### Problem

Detailseite liest den Post anhand `slug`, aber bei unbekanntem `slug` crasht die Seite.

### Fehlerhafter Code

```tsx
// app/posts/[slug]/page.tsx
import { posts } from "../../../lib/posts";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
    </main>
  );
}
```

### Aufgabe

1. Mache die Funktion `async` und gib `Promise<JSX.Element>` zurück
2. Handle `post === undefined` sauber mit `notFound()`

### Antwort

Problem: Wenn posts.find() nichts findet, ist post gleich undefined. Der Zugriff auf post.title bringt die App zum Absturz. Next.js bietet hierfür die Funktion notFound().

```tsx
// app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { posts } from "../../../lib/posts";

// FIX 1: Typisierung als Promise + async Funktion, die Promise<JSX.Element> liefert
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  // Params ordnungsgemäß abwarten
  const resolvedParams = await params;

  // Post in den Daten suchen
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  // FIX 2: Wenn kein Post gefunden wurde, Next.js 404-Seite triggern
  if (!post) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
    </main>
  );
}
```
