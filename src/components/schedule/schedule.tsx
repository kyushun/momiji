import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { google } from "googleapis";

import { createOAuth2Client } from "@/utility/oauth2-client";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const Schedule = async () => {
  const oauth2Client = await createOAuth2Client();

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const { data: calendarList } = await calendar.calendarList.list();

  const calendarId = calendarList.items?.[0].id ?? undefined;

  const {
    data: { items: events },
  } = await calendar.events.list({
    calendarId,
    timeMin: dayjs().startOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    timeMax: dayjs().endOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  });

  return (
    <ol className="flex flex-col gap-2">
      {events
        ?.sort((a, b) =>
          dayjs(a.start?.dateTime).isAfter(dayjs(b.start?.dateTime)) ? 1 : -1
        )
        .filter((event) => !event.start?.date)
        .map((event, i) => (
          <li
            key={event.id}
            className="flex flex-col gap-1 rounded bg-gray-1000 px-4 py-2"
          >
            <div className="text-sm text-gray-500">
              {dayjs(event.start?.dateTime).format("H:mm")} -{" "}
              {dayjs(event.end?.dateTime).format("H:mm")}
            </div>
            <div>{event.summary ?? "(no title)"}</div>
          </li>
        ))}
    </ol>
  );
};
