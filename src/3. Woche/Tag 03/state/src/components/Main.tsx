import { type ReactNode } from "react";
export function Main({
  userName,
  children,
}: {
  userName: string | undefined;
  children: ReactNode 
}) {
  return (
    <main>
      <h1>Welcome</h1>
      <p>{userName ? `Hallo ${userName}` : "Bitte log dich ein"}</p>
      {children}
    </main>
  );
}
