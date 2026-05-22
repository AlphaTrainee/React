// src/components/NoteActions.tsx
"use client";

import { updateNote } from "@/data/actions/updateNote";
import { deleteNote } from "@/data/actions/deleteNote";

interface NoteActionsProps {
  id: number;
}

export default function NoteActions({ id }: NoteActionsProps) {
  const handleUpdate = async () => {
    // Update mit festen Werten für diese ID
    await updateNote({
      id: id,
      title: `Notiz ${id} (Aktualisiert)`,
      content: "Dieser Inhalt wurde aktualisiert.",
    });
  };

  const handleDelete = async () => {
    await deleteNote({ id });
  };

  return (
    <div className="note-actions-group">
      <button onClick={handleUpdate} className="btn-update">
        Bearbeiten
      </button>
      <button onClick={handleDelete} className="btn-delete">
        Löschen
      </button>
    </div>
  );
}
