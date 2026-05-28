"use server";

// Wir definieren einen Typ für unseren State, das macht es sauberer.
// Zu Beginn ist er null, später ein String (die Nachricht).
export type FormState = string | null;

export async function subscribeToNewsletter(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // TODO:
  // 1. Hole die Email: formData.get('email')
  //    Achtung TS: formData.get() gibt 'FormDataEntryValue | null' zurück.
  //    Du musst sicherstellen, dass es ein string ist.
  // 2. Simuliere Delay (await new Promise...).
  // 3. Wenn email === "error@test.com" -> Fehler String zurückgeben.
  // 4. Sonst -> Erfolgs String zurückgeben.

  // 1. Hole die Email aus den Formulardaten
  const email = formData.get("email");

  // Sichere Prüfung für TypeScript, um sicherzustellen, dass es ein string ist
  if (!email || typeof email !== "string") {
    return "Bitte gib eine gültige E-Mail-Adresse ein.";
  }

  // 2. Simuliere das geforderte Delay von 2 Sekunden
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 3. Wenn email === "error@test.com" -> Fehler String zurückgeben
  if (email === "error@test.com") {
    return "Fehler: Diese E-Mail-Adresse ist gesperrt.";
  }

  // 4. Sonst -> Erfolgs String zurückgeben
  return "Erfolgreich für den Newsletter angemeldet!";
}
