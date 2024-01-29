import { CalendarWidget } from "@/components/calendar-widget";
import { Schedule } from "@/components/schedule";
import { dayjs } from "@/utility/dayjs";

import { RefreshController } from "./refresh-controller";
import { WakeLockController } from "./wake-lock-controller";

export default function Home() {
  return (
    <main className="grid h-dvh w-dvw gap-8 bg-black p-8 font-semibold text-white portrait:grid-rows-[1fr_2fr] landscape:grid-cols-[2fr_1fr]">
      <div className="relative portrait:order-2 portrait:overflow-x-auto landscape:order-1 landscape:overflow-y-auto">
        <Schedule />
      </div>

      <div className="portrait:order-1 landscape:order-2">
        <CalendarWidget />
      </div>

      <div className="fixed bottom-2 right-2 z-50 text-xs text-gray-500">
        Last Updated: {dayjs().format("HH:mm:ss")}
      </div>

      <WakeLockController />
      <RefreshController />
    </main>
  );
}
