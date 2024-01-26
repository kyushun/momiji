"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

function createCalendarArray(
  year = dayjs().year(),
  month = dayjs().month()
): (number | null)[][] {
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
}

type Props = {
  year?: number;
  month?: number;
};

export const Calendar = (props: Props) => {
  const calendar = createCalendarArray(props.year, props.month);

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
          {calendar.map((week, i) => (
            <tr key={i} className="contents">
              {week.map((day, j) => (
                <td
                  key={(day || 0) + j}
                  className={clsx(
                    "grid size-8 place-content-center rounded-full first:text-gray-500 last:text-gray-500",
                    { "bg-red-500": day === dayjs().date() }
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
