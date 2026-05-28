"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "./actions"; // Pfad anpassen

export default function LoesungZwei() {
  const [message, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    null,
  );

  return (
    <div className="newsletter-box">
      <h2>Lösung 2: Kurs-Vorlage (isPending)</h2>
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
        <button type="submit" disabled={isPending} className="btn-submit">
          {isPending ? "Wird gesendet..." : "Abonnieren"}
        </button>
      </form>
      {message && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
