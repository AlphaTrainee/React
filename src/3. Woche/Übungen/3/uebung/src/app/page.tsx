import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Übersicht der Übungen</h1>
      <p>Wähle eine der beiden Implementierungen aus:</p>

      <nav className="menu-nav">
        <Link href="/solution1" className="menu-link link-blue">
          Öffne Lösung 1 (useFormStatus)
        </Link>

        <Link href="/solution2" className="menu-link link-green">
          Öffne Lösung 2 (Kurs-Vorlage)
        </Link>
      </nav>
    </main>
  );
}
