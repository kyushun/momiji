import { Calendar } from "@/components/calendar";
import { Schedule } from "@/components/schedule";

export default function Home() {
  return (
    <main className="grid h-dvh w-dvw gap-8 bg-black p-8 font-semibold text-white portrait:grid-rows-[1fr_2fr] landscape:grid-cols-[2fr_1fr]">
      <div className="relative portrait:order-2 portrait:overflow-x-auto landscape:order-1 landscape:overflow-y-auto">
        <Schedule />
      </div>

      <div className="portrait:order-1 landscape:order-2">
        <Calendar />
      </div>
    </main>
  );
}
