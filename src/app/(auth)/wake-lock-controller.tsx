"use client";

import { useEffect } from "react";

export const WakeLockController = () => {
  useEffect(() => {
    let wakeLock: WakeLockSentinel | undefined;

    (async () => {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
      }
    })();

    return () => {
      wakeLock?.release();
    };
  }, []);

  return null;
};
