"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const refreshCount = 4;

export const RefreshController = () => {
  const router = useRouter();
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const refreshMinutes = Array.from({ length: refreshCount }, (_, i) =>
      Math.floor((60 / refreshCount) * i)
    );

    const scheduleRefresh = () => {
      const now = dayjs();
      const minutes = now.minute();

      const nextRefreshMinute =
        refreshMinutes.find((min) => min > minutes) || refreshMinutes[0];
      const isNextHour = minutes >= refreshMinutes[refreshMinutes.length - 1];

      const nextRefreshTime = now
        .minute(nextRefreshMinute)
        .startOf("minute")
        .add(isNextHour ? 1 : 0, "hour");

      const delay = nextRefreshTime.diff(now);

      if (delay <= 0) throw new Error("Invalid delay");

      timeoutIdRef.current = setTimeout(() => {
        router.refresh();

        scheduleRefresh();
      }, delay);
    };

    scheduleRefresh();

    return () => {
      if (!timeoutIdRef.current) return;

      clearTimeout(timeoutIdRef.current);
    };
  }, [router]);

  return null;
};
