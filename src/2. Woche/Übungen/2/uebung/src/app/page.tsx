import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Startseite</h1>
      <Link href="/posts">Zu den Posts</Link>
    </main>
  );
}
