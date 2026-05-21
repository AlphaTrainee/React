export function ErrorAlert({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <h2>Etwas ist schiefgelaufen</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Nochmal versuchen</button>
    </div>
  );
}
