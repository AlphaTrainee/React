import Link from "next/link";
// FIX: getAllPosts und unsere neue searchPosts Funktion laden
import { getAllPosts, getPost, searchPosts } from "@/data/queries";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const criteria = resolvedSearchParams.criteria;

  let dbPosts = null;

  // Wenn ein Suchbegriff im Header eingegeben wurde
  if (typeof criteria === "string" && criteria.trim() !== "") {
    const trimmed = criteria.trim();

    // Prüfen, ob die Eingabe eine reine Zahl ist
    const isNumeric = /^\d+$/.test(trimmed);

    if (isNumeric) {
      // Direkt als String übergeben, unsere neue Query fängt das sauber ab
      const singlePost = await getPost(trimmed);
      dbPosts = singlePost ? [singlePost] : [];
    } else {
      dbPosts = await searchPosts(trimmed);
    }
  } else {
    dbPosts = await getAllPosts();
  }

  const resolvedPosts = dbPosts ?? [];

  const resolveHeading =
    typeof criteria === "string" && criteria.trim() !== ""
      ? `Ergebnisse für "${criteria}"`
      : "Alle Beiträge";

  return (
    <main style={{ padding: "20px" }}>
      <h2>{resolveHeading}</h2>

      {resolvedPosts.length === 0 ? (
        <p>Keine Beiträge gefunden, die zu Ihrer Suche passen.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {resolvedPosts.map((post) => (
            <li
              key={post.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <Link
                href={`/posts/${post.id}`}
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#0070f3",
                }}
              >
                {post.title}
              </Link>
              <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
