function ErrorBomb() {
  throw new Error("Die Test-Bombe ist hochgegangen!");
  return null; // Wird nie erreicht
}
