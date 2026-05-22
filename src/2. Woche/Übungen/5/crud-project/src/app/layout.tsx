// src/app/layout.tsx
import Header from "@/components/Header";
import "./globals.css"; // Stelle sicher, dass deine CSS-Datei hier importiert ist

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
