import { google } from "googleapis";
import { unstable_cache } from "next/cache";

import { dayjs } from "@/utility/dayjs";
import { createOAuth2Client } from "@/utility/oauth2-client";

export const getCachedEvents = unstable_cache(
  async (calendarId?: string) => {
    const oauth2Client = await createOAuth2Client();

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const {
      data: { items: events },
    } = await calendar.events.list({
      calendarId,
      singleEvents: true,
      timeMin: dayjs().startOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      timeMax: dayjs().endOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    });

    return events;
  },
  ["events"],
  { revalidate: 60 }
);
