import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  applicationName: "momiji",
  title: "momiji",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    notranslate: true,
  },
  manifest: "/manifest.json",
  other: { google: "notranslate" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-black text-[18px] text-white">
      <body>{children}</body>
    </html>
  );
}
