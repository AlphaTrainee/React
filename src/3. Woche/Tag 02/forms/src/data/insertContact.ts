import { type Contact } from "@/data/schema";
import { db as client } from "../lib/db";

export async function insertContact({ name, email, reason, notes }: Contact) {
  // let client: Client | undefined;
  let ok = true;
  let errorDetails: string | null = null; // Speichert die SQL-Fehlermeldung

  try {
    /* client = createClient({
      url: "file:src/data/contacts.db",
    });
    */
    await client.execute({
      sql: "INSERT INTO contacts(name, email, reason, notes) VALUES (?, ?, ?, ?)", // ? verhindert SQL Injections
      //FALSCH: Gefahr von SQL-Injections sql: `INSERT INTO contact(name, email, reason, notes) VALUES (${name}, ${email}, ${reason}, ${notes})` ,
      args: [name, email, reason, notes],
    });
  } catch (err: any) {
    console.log(err);
    ok = false;
    errorDetails = err.message || String(err); // Hier wird der SQL-Fehler gesichert!
  }

  // Gibt den Status UND die konkrete Fehlermeldung zurück
  return { ok, errorDetails };
}
