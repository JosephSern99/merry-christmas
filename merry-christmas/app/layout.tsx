import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merry Christmas Kayla ❤️",
  description: "A special Christmas message for my dear Kayla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
