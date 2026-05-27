"use client";

import { Contact } from "@/data/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ContactForm() {
  const router = useRouter();

  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleAction(formData: FormData) {
    setErrorDetails(null);
    setIsPending(true);

    const contact = Object.fromEntries(formData) as Contact;

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          const specificError =
            errorData.message || errorData.error || "Unbekannter Fehler.";
          setErrorDetails(specificError);
        } catch (parseError) {
          setErrorDetails(`Server-Fehler mit Status: ${response.status}`);
        }
        setIsPending(false);
        return;
      }

      router.push("/thanks/?name=" + encodeURIComponent(contact.name));
    } catch (networkError) {
      setErrorDetails(
        "Netzwerkfehler: Der Server konnte nicht erreicht werden.",
      );
      setIsPending(false);
    }
  }

  return (
    <form action={handleAction}>
      {errorDetails && (
        <div className="error-box">
          <span className="error-box-title">Fehler aufgetreten:</span>
          <pre className="error-box-details">{errorDetails}</pre>
        </div>
      )}

      <div className="field">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="field">
        <label htmlFor="reason">Grund für den Kontakt: </label>
        <select name="reason" id="reason">
          <option value=""></option>
          <option value="Support">Support</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Sonstiges</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="notes">Notizen: </label>
        <textarea name="notes" id="notes"></textarea>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Wird gesendet..." : "Abschicken"}
      </button>
    </form>
  );
}
