"use client";

import { Contact } from "@/data/schema";
import { useRouter } from "next/navigation";

export function ContactForm() {
  const router = useRouter();
  async function handleAction(formData: FormData) {
    const contact = Object.fromEntries(formData) as Contact; // wieder nur einen Type Assertion

    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      console.error("Es lief etwas schief.");
      return;
    }
    router.push("/thanks");
  }

  return (
    <form action={handleAction}>
      <div className="field">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" />
      </div>
      <div className="field">
        <label htmlFor="name">Email: </label>
        <input type="email" name="email" id="email" />
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
      <button type="submit">Abschicken</button>
    </form>
  );
}
