"use client";

export function ErrorAlert({ error }: { error: Error }) {
  return (
    <div role="alert">
      <h3>Etwas ist schiefgelaufen</h3>
      <p>{error.message}</p>
    </div>
  );
}
