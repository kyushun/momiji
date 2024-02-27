"use client";

import { useCallback, useEffect, useRef } from "react";

export const WakeLockController = () => {
  const wakeLockRef = useRef<WakeLockSentinel>();

  const request = useCallback(async () => {
    const isSupported =
      typeof window !== "undefined" && "wakeLock" in navigator;

    if (!isSupported) return;

    wakeLockRef.current = await navigator.wakeLock.request("screen");
    wakeLockRef.current.addEventListener("release", () => {
      wakeLockRef.current = undefined;
    });
  }, []);

  const release = useCallback(async () => {
    await wakeLockRef.current?.release();
  }, []);

  useEffect(() => {
    request();

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      request();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      release();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [release, request]);

  return null;
};
