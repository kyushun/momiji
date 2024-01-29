import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.tz.setDefault("Asia/Tokyo");

const dayjsWithTimezone = (...args: Parameters<typeof dayjs>) =>
  dayjs(...args).tz();

export { dayjsWithTimezone as dayjs };
