import clsx from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

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
        {dayjs(dateTime.start).tz().format("H:mm")} -{" "}
        {dayjs(dateTime.end).tz().format("H:mm")}
      </div>
    )}
    <div>{summary ?? "(no title)"}</div>
  </li>
);
