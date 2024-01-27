import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utility/next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
