import { insertContact } from "@/data/insertContact";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Führt die Funktion aus. Wenn hier ein SQL-Fehler fliegt,
    // springt der Code sofort in den catch-Block.
    const result = await insertContact(data);

    // Falls die Funktion nicht abstürzt, aber ein "ok: false" zurückgibt
    if (!result || !result.ok) {
      return Response.json(
        {
          error: "Die Datenbank-Operation war nicht erfolgreich.",
          // HIER wird der SQL-Fehler ausgegeben, der aus insertContact kommt:
          message: result?.errorDetails || "Unbekannter SQL-Fehler",
        },
        { status: 500 },
      );
    }

    // Erfolg: Daten wurden gespeichert
    return Response.json({ success: true }, { status: 201 });
  } catch (sqlError: any) {
    // Gibt den konkreten SQL-/Laufzeitfehler im Terminal (Server-Log) aus
    console.error("Konkreter Fehler in der API-Route:", sqlError);

    // Schickt den konkreten Fehlertext (z.B. Syntax-Fehler) an den Browser
    return Response.json(
      {
        error: "Datenbank- oder Serverfehler aufgetreten.",
        message: sqlError.message || String(sqlError),
      },
      { status: 500 },
    );
  }
}
