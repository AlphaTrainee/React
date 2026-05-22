// src/components/CreateButton.tsx
"use client"; // Zwingend erforderlich für onClick!

import { createNote } from "@/data/actions/createNote";

export default function CreateButton() {
  const handleClick = async () => {
    const title = prompt("Titel der Notiz:");
    if (!title) return; // Abbrechen, wenn kein Titel eingegeben wurde

    const content = prompt("Inhalt der Notiz:") || "";

    // Unsere Server Action aufrufen
    await createNote({ title, content });
  };

  return (
    <button onClick={handleClick} className="btn-create">
      + Neue Notiz erstellen
    </button>
  );
}
