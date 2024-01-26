import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momiji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[18px]">
      <body>{children}</body>
    </html>
  );
}
