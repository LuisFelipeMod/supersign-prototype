import type { Metadata } from "next";
import { Rubik } from 'next/font/google'
import "./globals.css";

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "SuperSign Prototype",
  description: "Teste técnico da Supersign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${rubik.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
