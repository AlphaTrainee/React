// src/app/notes/[id]/page.tsx
import { getNoteById } from "@/data/queries/getNoteById";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailPage({ params }: PageProps) {
  // In modernen Next.js-Versionen müssen params asynchron aufgelöst werden
  const resolvedParams = await params;
  const noteId = parseInt(resolvedParams.id, 10);

  // Validierung der ID
  if (isNaN(noteId)) {
    notFound();
  }

  // Notiz aus der MySQL-Datenbank laden
  const note = await getNoteById(noteId);

  // Wenn getNoteById null zurückgibt, wird die Next.js 404-Seite angezeigt
  if (!note) {
    notFound();
  }

  return (
    <div className="note-detail-container">
      <div className="note-detail-card">
        <h2>{note.title}</h2>
        <p className="note-detail-content">{note.content}</p>

        <div className="note-detail-meta">
          <span>ID: {note.id}</span>
          <span>
            Erstellt am: {new Date(note.created_at).toLocaleString("de-DE")}
          </span>
        </div>
      </div>

      <div className="navigation-back">
        <Link href="/notes" className="btn-back">
          ← Zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}
