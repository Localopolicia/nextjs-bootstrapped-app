import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stitch's Hawaiian Clicker",
  description: "Un juego clicker temático de Stitch y Hawaii",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <link href="https://fonts.googleapis.com/css2?family=Sour+Gummy&display=swap" rel="stylesheet" />
        {children}
      </body>
    </html>
  );
}
