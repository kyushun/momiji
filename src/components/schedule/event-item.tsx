import clsx from "clsx";

import { dayjs } from "@/utility/dayjs";

type EventItemProps = {
  summary?: string;
  dateTime?: {
    start?: string;
    end?: string;
  };
  accepted?: boolean;
};

export const EventItem = ({ summary, dateTime, accepted }: EventItemProps) => (
  <li
    className={clsx(
      "relative flex flex-col gap-1 overflow-hidden rounded bg-gray-1000 px-4 py-2",
      {
        ["before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gray-700"]:
          accepted,
      }
    )}
  >
    {dateTime?.start && dateTime?.end && (
      <div className="text-sm text-gray-500">
        {dayjs(dateTime.start).format("H:mm")} -{" "}
        {dayjs(dateTime.end).format("H:mm")}
      </div>
    )}
    <div>{summary ?? "(no title)"}</div>
  </li>
);
