import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    token: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}
