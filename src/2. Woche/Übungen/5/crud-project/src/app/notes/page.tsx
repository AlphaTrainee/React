// src/app/notes/page.tsx
import { getNotes } from "@/data/queries/getNotes";
import CreateButton from "@/components/CreateButton";
import NoteActions from "@/components/NoteActions";
import Link from "next/link"; // 1. Link-Komponente importieren

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="notes-container">
      <h1>Meine Notizen</h1>

      <CreateButton />

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>Keine Notizen vorhanden.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              {/* 2. Den Titel mit dem Link zur Detailseite umschließen */}
              <h3>
                <Link href={`/notes/${note.id}`} className="note-title-link">
                  {note.title}
                </Link>
              </h3>

              <p>{note.content}</p>
              <span className="note-date">
                Erstellt am: {new Date(note.created_at).toLocaleString("de-DE")}
              </span>

              <NoteActions id={note.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
