import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { google } from "googleapis";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utility/next-auth";
import { createOAuth2Client } from "@/utility/oauth2-client";

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
    timeMin: dayjs().tz().startOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    timeMax: dayjs().tz().endOf("date").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
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
              {dayjs(event.start?.dateTime).tz().format("H:mm")} -{" "}
              {dayjs(event.end?.dateTime).tz().format("H:mm")}
            </div>
            <div>{event.summary ?? "(no title)"}</div>
          </li>
        ))}
    </ol>
  );
};
