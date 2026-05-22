// src/data/schema.ts
import { z } from "zod";

// Validiert eine einzelne Notiz aus der Datenbank
export const noteRowSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, "Titel darf nicht leer sein"),
  content: z.string(),
  created_at: z.string().or(z.date()), // Fängt sowohl SQL-Strings als auch Date-Objekte ab
  updated_at: z.string().or(z.date()),
});

// Validiert ein Array von Notizen (z.B. für Listen-Ansichten)
export const noteListSchema = z.array(noteRowSchema);

// Typ-Exporte, falls du sie im Code für Props oder Variablen brauchst
export type NoteRow = z.infer<typeof noteRowSchema>;
export type NoteList = z.infer<typeof noteListSchema>;
