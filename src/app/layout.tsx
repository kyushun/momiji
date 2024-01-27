import "./globals.css";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utility/next-auth";

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
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en" className="text-[18px]">
      <body>{children}</body>
    </html>
  );
}
