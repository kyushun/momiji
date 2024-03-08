import { google } from "googleapis";
import { unstable_cache } from "next/cache";

import { dayjs } from "@/utility/dayjs";
import { createOAuth2Client } from "@/utility/oauth2-client";

const holidayCalendarId = "ja.japanese#holiday@group.v.calendar.google.com";

export const getCachedHolidayDates = unstable_cache(
  async (monthCount: number) => {
    const oauth2Client = await createOAuth2Client();

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const {
      data: { items: holidayEvents },
    } = await calendar.events.list({
      calendarId: holidayCalendarId,
      timeMin: dayjs().startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      timeMax: dayjs()
        .add(monthCount, "month")
        .endOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    });

    const holidayDates =
      holidayEvents
        ?.filter((event) => event.start?.date)
        .map((event) => dayjs(event.start?.date).toISOString()) ?? [];

    return holidayDates;
  },
  ["holiday-dates"],
  { revalidate: 24 * 60 * 60 }
);
