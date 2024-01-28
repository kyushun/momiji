import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { google } from "googleapis";

import { createOAuth2Client } from "@/utility/oauth2-client";

import { CalendarSlides } from "./calendar";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const calendarCount = 3;

const holidayCalendarId = "ja.japanese#holiday@group.v.calendar.google.com";

export const CalendarWidget = async () => {
  const oauth2Client = await createOAuth2Client();

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const {
    data: { items: holidayEvents },
  } = await calendar.events.list({
    calendarId: holidayCalendarId,
    timeMin: dayjs().tz().startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    timeMax: dayjs()
      .tz()
      .add(calendarCount, "month")
      .endOf("month")
      .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  });

  const holidayDates =
    holidayEvents
      ?.filter((event) => event.start?.date)
      .map((event) => dayjs(event.start?.date).tz().toISOString()) ?? [];

  return (
    <CalendarSlides calendarCount={calendarCount} holidayDates={holidayDates} />
  );
};
