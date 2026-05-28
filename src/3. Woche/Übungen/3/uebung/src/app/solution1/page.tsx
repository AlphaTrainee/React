"use client";

import { useActionState } from "react";
import { subscribeActionKI, ActionStateKI } from "./actionsKI";
import { SubmitButton } from "./SubmitButton";

const initialState: ActionStateKI = {
  success: false,
  message: "",
};

export default function Solution1() {
  const [state, formAction] = useActionState(subscribeActionKI, initialState);

  return (
    <main className="container">
      <h1>Newsletter Anmeldung</h1>

      <form action={formAction} className="form-newsletter">
        <div className="form-group">
          <label htmlFor="email">E-Mail-Adresse:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="form-input"
          />
        </div>

        <SubmitButton />
      </form>

      {state.message && (
        <p
          className={`feedback-message ${state.success ? "feedback-success" : "feedback-error"}`}
        >
          {state.message}
        </p>
      )}
    </main>
  );
}
