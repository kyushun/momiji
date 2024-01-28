"use client";

import "swiper/css";

import clsx from "clsx";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Swiper, SwiperSlide } from "swiper/react";

dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const createCalendarArray = (
  year = dayjs().tz().year(),
  month = dayjs().tz().month()
) => {
  const startOfMonth = dayjs().tz().year(year).month(month).startOf("month");
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

const CalendarElement = ({
  date,
  holidayDates,
}: {
  date: string;
  holidayDates: string[];
}) => {
  const calendarDate = dayjs(date).tz();
  const calendarArray = createCalendarArray(
    calendarDate.year(),
    calendarDate.month()
  );

  return (
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
            {week.map((date, j) => (
              <td
                key={(date || 0) + j}
                className={clsx(
                  "grid size-8 place-content-center rounded-full",
                  {
                    "text-gray-500":
                      j === 0 ||
                      j === week.length - 1 ||
                      (date &&
                        holidayDates.some((holidayDate) =>
                          calendarDate
                            .date(date)
                            .isSame(dayjs(holidayDate).tz(), "date")
                        )),
                  },
                  {
                    "text-white bg-red-500":
                      date &&
                      calendarDate.date(date).isSame(dayjs().tz(), "date"),
                  }
                )}
              >
                {date}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const CalendarSlides = ({
  calendarCount,
  holidayDates,
}: {
  calendarCount: number;
  holidayDates: string[];
}) => {
  const now = dayjs().tz();

  return (
    <Swiper slidesPerView="auto" className="h-full">
      {[...Array(calendarCount)].map((_, i) => {
        const date = now.add(i, "month");

        return (
          <SwiperSlide key={date.toISOString()}>
            <div className="flex size-full flex-col gap-2">
              <div>{date.format("MMMM")}</div>

              <CalendarElement
                date={date.toISOString()}
                holidayDates={holidayDates}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
