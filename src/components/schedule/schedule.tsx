import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { google } from "googleapis";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utility/next-auth";
import { createOAuth2Client } from "@/utility/oauth2-client";

import { EventItem } from "./event-item";

dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

export const Schedule = async () => {
  const session = await getServerSession(authOptions);

  const oauth2Client = await createOAuth2Client();

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const {
    data: { items: events },
  } = await calendar.events.list({
    calendarId: session?.user?.email ?? undefined,
    singleEvents: true,
    timeMin: dayjs().tz().startOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    timeMax: dayjs().tz().endOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  });

  return (
    <ol className="flex flex-col gap-2">
      {events
        ?.filter((event) => event.start?.date)
        .map((event) => {
          const accepted =
            !event.attendees ||
            event.attendees.find(
              (attendee) => attendee.email === session?.user?.email
            )?.responseStatus === "accepted";

          return (
            <EventItem
              key={event.id}
              summary={event.summary ?? undefined}
              accepted={accepted}
            />
          );
        })}

      {events
        ?.filter((event) => !event.start?.date)
        .filter(
          (event) =>
            event.eventType === "default" || event.eventType === "outOfOffice"
        )
        .filter(
          (event) =>
            event.attendees?.find(
              (attendee) => attendee.email === session?.user?.email
            )?.responseStatus !== "declined"
        )
        .filter((event) => dayjs().tz().isBefore(dayjs(event.end?.dateTime)))
        .sort((a, b) =>
          dayjs(a.start?.dateTime).tz().isAfter(dayjs(b.start?.dateTime))
            ? 1
            : -1
        )
        .map((event) => {
          const accepted =
            !event.attendees ||
            event.attendees.find(
              (attendee) => attendee.email === session?.user?.email
            )?.responseStatus === "accepted";

          return (
            <EventItem
              key={event.id}
              summary={event.summary ?? undefined}
              dateTime={{
                start: event.start?.dateTime ?? undefined,
                end: event.end?.dateTime ?? undefined,
              }}
              accepted={accepted}
            />
          );
        })}
    </ol>
  );
};
