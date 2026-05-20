import Link from "next/link";
// FIX: Hier laden wir die Filter-Funktion für den Titel (oder die Beschreibung, je nach Wunsch)
import { getAllPosts, getFilteredPostsTitle } from "@/data/queries";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Next.js 15 konform: searchParams asynchron auflösen
  const resolvedSearchParams = await searchParams;
  const criteria = resolvedSearchParams.criteria;

  // 2. Datenbank-Abfrage sauber steuern
  let dbPosts = null;

  if (typeof criteria === "string" && criteria.trim() !== "") {
    // Wenn ein Suchbegriff da ist -> Gefilterte Posts aus der DB holen
    dbPosts = await getFilteredPostsTitle(criteria);
  } else {
    // Wenn kein Suchbegriff da ist -> Alle Posts aus der DB holen
    dbPosts = await getAllPosts();
  }

  // 3. Sicherheitsnetz: Falls die DB 'null' liefert (nichts gefunden), ein leeres Array nutzen
  const resolvedPosts = dbPosts ?? [];

  // Dynamische Überschrift ermitteln
  const resolveHeading =
    typeof criteria === "string" && criteria.trim() !== ""
      ? `Posts for "${criteria}"`
      : "All Posts";

  return (
    <main>
      <h2>{resolveHeading}</h2>

      {/* 4. Nutzer-Feedback, falls die Suche ins Leere lief */}
      {resolvedPosts.length === 0 ? (
        <p>Keine Posts zu diesem Suchbegriff gefunden.</p>
      ) : (
        <ul>
          {resolvedPosts.map((post) => (
            <li key={post.id} style={{ marginBottom: "15px" }}>
              {/* Wichtig: Link nutzt jetzt die numerische post.id zur Detailseite */}
              <Link href={`/posts/${post.id}`} style={{ fontWeight: "bold" }}>
                {post.title}
              </Link>
              <p style={{ margin: "4px 0 0 0", color: "#555" }}>
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
