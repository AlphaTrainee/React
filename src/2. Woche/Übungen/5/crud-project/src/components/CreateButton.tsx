// src/components/CreateButton.tsx
"use client";

import { createNote } from "@/data/actions/createNote";

export default function CreateButton() {
  const handleClick = async () => {
    // Erstellt direkt eine feste, vorgegebene Notiz
    await createNote({
      title: "Neue Notiz (Hardcoded)",
      content: "Inhalt wurde automatisch beim Klicken generiert.",
    });
  };

  return (
    <button onClick={handleClick} className="btn-create">
      + Neue Notiz erstellen
    </button>
  );
}
