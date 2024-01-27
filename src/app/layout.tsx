import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momiji",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    notranslate: true,
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black text-[18px] text-white">
      <body>{children}</body>
    </html>
  );
}
