import { google } from "googleapis";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "./next-auth";

export const createOAuth2Client = async () => {
  const session = await getServerSession(authOptions);

  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/api/auth/callback/google",
  });

  const accessToken = session?.token.accessToken;
  const refreshToken = session?.token.refreshToken;

  if (!accessToken || !refreshToken) {
    redirect("/login");
  }

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return oauth2Client;
};
