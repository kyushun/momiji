"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const refreshMinutes = [10, 25, 40, 55];

export const RefreshController = () => {
  const router = useRouter();
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const scheduleRefresh = () => {
      const now = dayjs();
      const minutes = now.minute();
      const nextRefreshMinute =
        refreshMinutes.find((min) => min > minutes) || refreshMinutes[0];

      let nextRefreshTime = now.minute(nextRefreshMinute).startOf("minute");
      if (minutes >= refreshMinutes[refreshMinutes.length - 1]) {
        nextRefreshTime = nextRefreshTime.add(1, "hour");
      }

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
