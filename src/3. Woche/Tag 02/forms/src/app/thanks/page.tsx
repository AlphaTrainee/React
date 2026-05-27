import Link from "next/link";

export default async function Thanks({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  return (
    <main>
      <h2>Formular erfolgreich abgeschickt</h2>
      <p>
        Danke <b>{(await searchParams).name}</b>, wir melden uns.
      </p>
      <Link href="/">Zur Übersicht</Link>
    </main>
  );
}
