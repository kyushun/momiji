import { getCachedHolidayDates } from "@/cached-data/holiday-dates";

import { CalendarSlides } from "./calendar";

const calendarCount = 3;

export const CalendarWidget = async () => {
  const holidayDates = await getCachedHolidayDates(calendarCount);

  return (
    <CalendarSlides calendarCount={calendarCount} holidayDates={holidayDates} />
  );
};
