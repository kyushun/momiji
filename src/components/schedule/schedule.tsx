import { getServerSession } from "next-auth";

import { getCachedEvents } from "@/cached-data/events";
import { dayjs } from "@/utility/dayjs";
import { authOptions } from "@/utility/next-auth";

import { EventItem } from "./event-item";

export const Schedule = async () => {
  const session = await getServerSession(authOptions);

  const events = await getCachedEvents(session?.user?.email || undefined);

  return (
    <ol className="flex flex-col gap-2">
      {events
        ?.filter((event) => event.start?.date)
        .map((event) => {
          const accepted =
            !event.attendees ||
            event.attendees.find(
              (attendee) => attendee.email === session?.user?.email
            )?.responseStatus === "accepted";

          return (
            <EventItem
              key={event.id}
              summary={event.summary ?? undefined}
              accepted={accepted}
            />
          );
        })}

      {events
        ?.filter((event) => !event.start?.date)
        .filter(
          (event) =>
            event.eventType === "default" || event.eventType === "outOfOffice"
        )
        .filter(
          (event) =>
            event.attendees?.find(
              (attendee) => attendee.email === session?.user?.email
            )?.responseStatus !== "declined"
        )
        .filter((event) => dayjs().isBefore(dayjs(event.end?.dateTime)))
        .sort((a, b) =>
          dayjs(a.start?.dateTime).isAfter(dayjs(b.start?.dateTime)) ? 1 : -1
        )
        .map((event) => {
          const accepted =
            !event.attendees ||
            event.attendees.find(
              (attendee) => attendee.email === session?.user?.email
            )?.responseStatus === "accepted";

          return (
            <EventItem
              key={event.id}
              summary={event.summary ?? undefined}
              dateTime={{
                start: event.start?.dateTime ?? undefined,
                end: event.end?.dateTime ?? undefined,
              }}
              accepted={accepted}
            />
          );
        })}
    </ol>
  );
};
