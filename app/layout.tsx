import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onochu",
  description: "KNU_POW music taste profile and recommendation web app MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
