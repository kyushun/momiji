import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { Calendar } from "@/components/calendar";
import { Schedule } from "@/components/schedule";

import { RefreshController } from "./refresh-controller";
import { WakeLockController } from "./wake-lock-controller";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

export default function Home() {
  return (
    <main className="grid h-dvh w-dvw gap-8 bg-black p-8 font-semibold text-white portrait:grid-rows-[1fr_2fr] landscape:grid-cols-[2fr_1fr]">
      <div className="relative portrait:order-2 portrait:overflow-x-auto landscape:order-1 landscape:overflow-y-auto">
        {/* @ts-expect-error Server Component */}
        <Schedule />
      </div>

      <div className="portrait:order-1 landscape:order-2">
        {/* @ts-expect-error Server Component */}
        <Calendar />
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        Last Updated: {dayjs().tz().format("HH:mm:ss")}
      </div>

      <WakeLockController />
      <RefreshController />
    </main>
  );
}
