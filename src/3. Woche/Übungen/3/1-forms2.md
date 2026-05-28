# Übung: useActionState

1. Du sollst ein kleines Formular erstellen, in das der Nutzer seine E-Mail-Adresse eingibt.
2. Es gibt eine Validierung auf dem Server (simuliert).
3. Wenn die E-Mail "error@test.com" ist, soll die Anmeldung fehlschlagen.
4. Bei allen anderen E-Mails ist sie erfolgreich.
5. Der Button soll während des Ladens "Wird gesendet..." anzeigen und deaktiviert sein.

---

### Die Ausgangslage (Starter Code)

Kopiere diese Dateigerrüste in deine `.ts` / `.tsx` Dateien.

**Datei: `actions.ts**`

```tsx
"use server";

// Wir definieren einen Typ für unseren State, das macht es sauberer.
// Zu Beginn ist er null, später ein String (die Nachricht).
export type FormState = string | null;

export async function subscribeToNewsletter(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {
  // TODO:
  // 1. Hole die Email: formData.get('email')
  //    Achtung TS: formData.get() gibt 'FormDataEntryValue | null' zurück.
  //    Du musst sicherstellen, dass es ein string ist.
  
  // 2. Simuliere Delay (await new Promise...).
  
  // 3. Wenn email === "error@test.com" -> Fehler String zurückgeben.
  
  // 4. Sonst -> Erfolgs String zurückgeben.
}

```

**Datei: `Newsletter.tsx**`

```tsx
import { useActionState } from "react";
import { subscribeToNewsletter } from "./actions"; // kein .ts im import

// Optional: Falls du den State-Typ auch hier explizit brauchst
import type { FormState } from "./actions";

export default function Newsletter() {
  // TODO:
  // useActionState in TypeScript inferiert (errät) die Typen meistens automatisch 
  // anhand der Action-Funktion.
  // Initialisiere den Hook mit der Action und 'null' als Startwert.
  
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", maxWidth: "300px" }}>
      <h3>Newsletter (TS)</h3>
      
      {/* TODO: Formular mit action verknüpfen */}
      <form>
        <label>
          E-Mail:
          <br />
          <input type="email" name="email" required />
        </label>
        
        <br /><br />

        {/* TODO: Button disablen bei isPending */}
        <button type="submit">
          Abonnieren
        </button>
      </form>

      {/* TODO: Message anzeigen (Typ ist string | null) */}
      <div style={{ marginTop: "10px" }}>
         {/* ... */}
      </div>
    </div>
  );
}

```

---

### Deine Aufgaben (TypeScript-Fokus)

1. **Typ-Sicherheit in `actions.ts`:**
* Wenn du `formData.get('email')` aufrufst, weiß TypeScript nicht sicher, dass es ein String ist. Nutze `as string` oder eine Prüfung `if (typeof email === 'string')`.
* Der Rückgabewert der Funktion **muss** dem Typ `Promise<FormState>` entsprechen (also Promise, das einen String oder Null auflöst).


2. **Verwendung in `Newsletter.tsx`:**
* Achte darauf, wie `useActionState` die Typen übernimmt. Wenn du mit der Maus über `message` hoverst, sollte deine IDE `string | null` anzeigen.



---



