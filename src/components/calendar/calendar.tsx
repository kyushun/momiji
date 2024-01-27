import clsx from "clsx";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import { google } from "googleapis";

import { createOAuth2Client } from "@/utility/oauth2-client";

dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const holidayCalendarId = "ja.japanese#holiday@group.v.calendar.google.com";

const createCalendarArray = (
  year = dayjs().year(),
  month = dayjs().month()
) => {
  const startOfMonth = dayjs().year(year).month(month).startOf("month");
  const endOfMonth = startOfMonth.endOf("month");

  let currentDate = startOfMonth.startOf("week");
  const calendar: (number | null)[][] = [];

  while (currentDate.isBefore(endOfMonth)) {
    const week: (number | null)[] = [];

    for (let i = 0; i < 7; i++) {
      if (
        currentDate.month() === month &&
        currentDate.isBetween(startOfMonth, endOfMonth, "day", "[]")
      ) {
        week.push(currentDate.date());
      } else {
        week.push(null);
      }
      currentDate = currentDate.add(1, "day");
    }

    calendar.push(week);
  }

  return calendar;
};

type Props = {
  year?: number;
  month?: number;
};

export const Calendar = async (props: Props) => {
  const calendarArray = createCalendarArray(props.year, props.month);

  const oauth2Client = await createOAuth2Client();

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const {
    data: { items: holidayEvents },
  } = await calendar.events.list({
    calendarId: holidayCalendarId,
    timeMin: dayjs().startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    timeMax: dayjs().endOf("month").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  });

  const holidayDates = holidayEvents
    ?.filter((event) => event.start?.date)
    .map((event) => dayjs(event.start?.date).date());

  return (
    <div className="flex size-full flex-col gap-2">
      <div>{dayjs().format("MMMM")}</div>

      <table className="grid size-full grid-cols-7 content-between">
        <thead className="contents">
          <tr className="contents">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <th
                key={day + i}
                className="grid size-8 place-content-center first:text-gray-500 last:text-gray-500"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="contents">
          {calendarArray.map((week, i) => (
            <tr key={i} className="contents">
              {week.map((day, j) => (
                <td
                  key={(day || 0) + j}
                  className={clsx(
                    "grid size-8 place-content-center rounded-full",
                    {
                      "text-gray-500":
                        j === 0 ||
                        j === week.length - 1 ||
                        (day && holidayDates?.includes(day)),
                    },
                    { "text-white bg-red-500": day === dayjs().date() }
                  )}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
