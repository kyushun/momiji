import NextAuth from "next-auth";

import { authOptions } from "@/utility/next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
