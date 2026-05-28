import { useActionState } from "react";
import { subscribeToNewsletter } from "./actions"; // kein .ts im import

// Optional: Falls du den State-Typ auch hier explizit brauchst
import type { FormState } from "./actions";

export default function Newsletter() {
  // TODO:
  // useActionState in TypeScript inferiert (errät) die Typen meistens automatisch
  // anhand der Action-Funktion.
  // Initialisiere den Hook mit der Action und 'null' als Startwert.

  // TypeScript inferiert hier automatisch:
  // message -> string | null
  // formAction -> (payload: FormData) => void
  // isPending -> boolean
  const [message, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    null,
  );

  return (
    <div className="newsletter-box">
      <h3>Newsletter (TS)</h3>

      {/* Das Formular wird mit der formAction verknüpft */}
      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="form-input"
          />
        </div>

        {/* Der Button wird über das isPending von useActionState deaktiviert */}
        <button type="submit" disabled={isPending} className="btn-submit">
          {isPending ? "Wird gesendet..." : "Abonnieren"}
        </button>
      </form>

      {/* Die Message (Typ: string | null) wird nur angezeigt, wenn sie existiert */}
      {message && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
