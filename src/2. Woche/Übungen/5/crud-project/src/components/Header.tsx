// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="main-header">
      <Link href="/" className="header-link-home">
        Home
      </Link>
      <Link href="/notes" className="header-link-notes">
        Meine Notizen
      </Link>
    </header>
  );
}
