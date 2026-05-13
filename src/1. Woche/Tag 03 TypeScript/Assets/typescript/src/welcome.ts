function welcome(name: string | null) {
  if (name === null) {
    return "Welcome Unknown!";
  }
  return `Welcome, ${name}!`;
}
