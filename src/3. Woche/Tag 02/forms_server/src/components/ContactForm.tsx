"use client";

import { insertContact } from "@/data/insertContact";
import { useActionState } from "react";

export function ContactForm() {
  const [{ result, error, formData, errors }, formAction, isPending] =
    useActionState(insertContact, {
      result: false,
      error: "",
      formData: new FormData(),
      errors: {
        name: null,
        email: null,
        reason: null,
      },
    });

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={(formData.get("name") ?? "") as string}
        />
        <FieldError serverError={errors.name} errorId="name-error" />
      </div>
      <div className="field">
        <label htmlFor="name">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={(formData.get("email") ?? "") as string}
        />
        <FieldError serverError={errors.email} errorId="email-error" />
      </div>
      <div className="field">
        <label htmlFor="reason">Grund für den Kontakt: </label>
        <select
          name="reason"
          id="reason"
          defaultValue={(formData.get("reason") ?? "") as string}
        >
          <option value=""></option>
          <option value="Support">Support</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Sonstiges</option>
        </select>
        <FieldError serverError={errors.reason} errorId="reason-error" />
      </div>
      <div className="field">
        <label htmlFor="notes">Notizen: </label>
        <textarea
          name="notes"
          id="notes"
          defaultValue={(formData.get("notes") ?? "") as string}
        ></textarea>
      </div>

      {!result && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      {isPending && <p role="alert">Speichert...</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

type Err = { message?: string } | null;

function FieldError({
  serverError,
  errorId,
}: {
  serverError: Err;
  errorId: string;
}) {
  if (!serverError) {
    return null;
  }

  return (
    <div id={errorId} role="alert">
      {serverError.message}
    </div>
  );
}
