import dayjs from "dayjs";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useCountdown } from "../utils/useCountdown";
import isBetween from "dayjs/plugin/isBetween";
import ReactPlayer from "react-player/youtube";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import clsx from "clsx";

dayjs.extend(isBetween);

type LaunchEvent = {
  id: number;
  activeBlock: {
    start: { hours: number; minutes: number };
    end: { hours: number; minutes: number };
  };
  description: string;
};

const Home: NextPage = () => {
  const SCHEDULED_T0 = "2022-09-03T18:17:00Z";
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://opti21.github.io/artemis-data/public/artemis.json",
    fetcher
  );

  const LAUNCH_EVENTS = [
    {
      id: 1,
      activeBlock: {
        start: { hours: 12, minutes: 0 },
        end: { hours: 10, minutes: 0 },
      },
      description: "All non-essential personnel leave Launch Complex 39B",
    },
    {
      id: 2,
      activeBlock: {
        start: { hours: 11, minutes: 15 },
        end: { hours: 9, minutes: 15 },
      },
      description: "Ground Launch Sequencer (GLS) Activation",
    },
    {
      id: 3,
      activeBlock: {
        start: { hours: 10, minutes: 45 },
        end: { hours: 0, minutes: 0 },
      },
      description:
        "Air-to-gaseous nitrogen (GN2) Changeover for vehicle cavity inerting",
    },
    {
      id: 4,
      activeBlock: {
        start: { hours: 9, minutes: 40 },
        end: { hours: 7, minutes: 10 },
      },
      description: "Built in countdown hold begins",
    },

    {
      id: 6,
      activeBlock: {
        start: { hours: 9, minutes: 40 },
        end: { hours: 8, minutes: 50 },
      },
      description: "Launch team conducts a weather and tanking briefing",
    },
    {
      id: 7,
      activeBlock: {
        start: { hours: 8, minutes: 40 },
        end: { hours: 8, minutes: 15 },
      },
      description: `Launch team decides if they are “go” or “no-go” to begin tanking the rocket`,
    },
    {
      id: 8,
      activeBlock: {
        start: { hours: 8, minutes: 15 },
        end: { hours: 8, minutes: 0 },
      },
      description: "Core Stage LOX transfer line chilldown",
    },
    {
      id: 9,
      activeBlock: {
        start: { hours: 8, minutes: 0 },
        end: { hours: 7, minutes: 20 },
      },
      description: "Core stage LOX main propulsion system (MPS) chilldown",
    },
    {
      id: 10,
      activeBlock: {
        start: { hours: 7, minutes: 20 },
        end: { hours: 7, minutes: 5 },
      },
      description: "Core stage LOX slow fill ",
    },
    {
      id: 11,
      activeBlock: {
        start: { hours: 7, minutes: 5 },
        end: { hours: 4, minutes: 15 },
      },
      description: "Core Stage LOX fast fill",
    },
    {
      id: 12,
      activeBlock: {
        start: { hours: 7, minutes: 15 },
        end: { hours: 7, minutes: 5 },
      },
      description: "Core Stage LH2 chilldown",
    },
    {
      id: 13,
      activeBlock: {
        start: { hours: 7, minutes: 5 },
        end: { hours: 6, minutes: 15 },
      },
      description: "Core Stage LH2 slow fill start",
    },
    {
      id: 14,
      activeBlock: {
        start: { hours: 6, minutes: 15 },
        end: { hours: 5, minutes: 5 },
      },
      description: "Core Stage LH2 fast fill",
    },
    {
      id: 15,
      activeBlock: {
        start: { hours: 6, minutes: 15 },
        end: { hours: 6, minutes: 14 },
      },
      description: "Engine bleed kick start",
    },
    {
      id: 16,
      activeBlock: {
        start: { hours: 5, minutes: 5 },
        end: { hours: 5, minutes: 0 },
      },
      description: "Core Stage LH2 topping",
    },
    {
      id: 17,
      activeBlock: {
        start: { hours: 5, minutes: 0 },
        end: { hours: 0, minutes: 0 },
      },
      description: "Core Stage LH2 replenish",
    },
    {
      id: 18,
      activeBlock: {
        start: { hours: 4, minutes: 45 },
        end: { hours: 4, minutes: 30 },
      },
      description: "ICPS LH2 ground support equipment (GSE) and tank chilldown",
    },
    {
      id: 19,
      activeBlock: {
        start: { hours: 4, minutes: 30 },
        end: { hours: 3, minutes: 30 },
      },
      description: "ICPS LH2 fast fill start",
    },
    {
      id: 20,
      activeBlock: {
        start: { hours: 4, minutes: 20 },
        end: { hours: 3, minutes: 45 },
      },
      description:
        "Orion communications system activated (RF to Mission Control)",
    },
    {
      id: 21,
      activeBlock: {
        start: { hours: 4, minutes: 15 },
        end: { hours: 3, minutes: 55 },
      },
      description: "Core stage LOX topping",
    },
    {
      id: 22,
      activeBlock: {
        start: { hours: 3, minutes: 55 },
        end: { hours: 0, minutes: 0 },
      },
      description: "Core stage LOX replenish",
    },
    {
      id: 23,
      activeBlock: {
        start: { hours: 3, minutes: 55 },
        end: { hours: 3, minutes: 45 },
      },
      description: "ICPS LOX MPS chilldown",
    },
    {
      id: 24,
      activeBlock: {
        start: { hours: 3, minutes: 45 },
        end: { hours: 2, minutes: 55 },
      },
      description: "ICPS LOX fast fill",
    },
    {
      id: 25,
      activeBlock: {
        start: { hours: 3, minutes: 30 },
        end: { hours: 3, minutes: 15 },
      },
      description: "ICPS LH2 validation and leak test",
    },
    {
      id: 26,
      activeBlock: {
        start: { hours: 3, minutes: 15 },
        end: { hours: 2, minutes: 55 },
      },
      description: "ICPS LH2 tank topping start",
    },
    {
      id: 27,
      activeBlock: {
        start: { hours: 2, minutes: 55 },
        end: { hours: 2, minutes: 45 },
      },
      description:
        "ICPS/Space Launch System (SLS) telemetry data verified with Mission Control and SLS Engineering Support Center",
    },
    {
      id: 28,
      activeBlock: {
        start: { hours: 2, minutes: 55 },
        end: { hours: 2, minutes: 30 },
      },
      description: "ICPS LOX validation and leak test",
    },
    {
      id: 29,
      activeBlock: {
        start: { hours: 2, minutes: 50 },
        end: { hours: 0, minutes: 0 },
      },
      description: "ICPS LH2 replenish",
    },
    {
      id: 30,
      activeBlock: {
        start: { hours: 2, minutes: 30 },
        end: { hours: 2, minutes: 10 },
      },
      description: "ICPS LOX topping",
    },
    {
      id: 31,
      activeBlock: {
        start: { hours: 2, minutes: 10 },
        end: { hours: 0, minutes: 0 },
      },
      description: "ICPS LOX replenish",
    },
    {
      id: 32,
      activeBlock: {
        start: { hours: 0, minutes: 50 },
        end: { hours: 0, minutes: 40 },
      },
      description: "Final NASA Test Director briefing is held",
    },
    {
      id: 33,
      activeBlock: {
        start: { hours: 0, minutes: 40 },
        end: { hours: 0, minutes: 0 },
      },
      description: "Built in 30-minute countdown hold begins",
    },
    {
      id: 34,
      activeBlock: {
        start: { hours: 0, minutes: 15 },
        end: { hours: 0, minutes: 0 },
      },
      description:
        "The launch director polls the team to ensure they are “go” for launch",
    },
  ];

  const activeEvents = useCallback((eventData: LaunchEvent[]) => {
    return eventData.filter((lEvent) => {
      const isActive = dayjs().isBetween(
        dayjs(SCHEDULED_T0)
          .subtract(lEvent.activeBlock.start.hours, "hours")
          .subtract(lEvent.activeBlock.start.minutes, "minutes"),
        dayjs(SCHEDULED_T0)
          .subtract(lEvent.activeBlock.end.hours, "hours")
          .subtract(lEvent.activeBlock.end.minutes, "minutes")
      );

      return isActive;
    });
  }, []);

  const upcomingEvents = useCallback((eventData: LaunchEvent[]) => {
    return eventData.filter((lEvent) => {
      const isUpcoming = dayjs().isBefore(
        dayjs(SCHEDULED_T0)
          .subtract(lEvent.activeBlock.start.hours, "hours")
          .subtract(lEvent.activeBlock.start.minutes, "minutes")
      );

      return isUpcoming;
    });
  }, []);

  const [days, hours, minutes, seconds] = useCountdown(
    dayjs(SCHEDULED_T0).toISOString()
  );
  console.log(data);

  return (
    <>
      <Head>
        <title>Artemis Countdown</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-slate-900 bg-cover bg-center bg-artemis overflow-x-hidden max-h-screen">
        <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 bg-slate-900 z-10 bg-opacity-60">
          <div className="text-6xl text-white font-bold mb-6">Artemis I</div>

          <ReactPlayer
            url="https://www.youtube.com/watch?v=Rv4FXgN8A1g"
            playing={true}
          />

          {data ? (
            <>
              <div className="text-white font-bold text-2xl my-2">
                Current Status:
                <span
                  className={clsx(
                    "p-1 text-xl rounded-xl px-2 ml-2",
                    data.status === "GO" && "bg-green-600",
                    data.status === "NO-GO" && "bg-red-600",
                    data.status === "SCRUBBED" && "bg-red-600",
                    data.status === "DELAYED" && "bg-red-600"
                  )}
                >
                  {data.status}
                </span>
              </div>
              {(data.status === "GO" || data.status === "DELAYED") && (
                <>
                  <div className="countdown text-8xl font-source-code font-black flex flex-row">
                    <div className="text-white flex flex-row">
                      <div>L-</div>
                      <div className="">{hours}</div>
                      <div>:</div>
                      <div>{minutes}</div>
                      <div>:</div>
                      <div>{seconds}</div>
                    </div>
                  </div>

                  <div className="active-events flex flex-col items-center justify-center max-w-xl">
                    <div className="text-white font-bold text-2xl">
                      Current Launch Events
                    </div>
                    {activeEvents(data.launchEvents).map(
                      (lEvent: LaunchEvent) => {
                        return (
                          <div
                            key={lEvent.id}
                            className=" w-full rounded-md bg-orange-900 text-white p-2 text-center my-1"
                          >
                            <div>{lEvent.description}</div>
                            <div>
                              (L-{lEvent.activeBlock.start.hours}H
                              {lEvent.activeBlock.start.minutes}M -{" "}
                              {lEvent.activeBlock.end.hours}H
                              {lEvent.activeBlock.end.minutes}M)
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="upcoming-events flex flex-col items-center justify-center max-w-xl">
                    <div className="text-white font-bold text-2xl">
                      Upcoming Events
                    </div>
                    {upcomingEvents(data.launchEvents)
                      .sort((a, b) => a.id - b.id)
                      .map((lEvent) => {
                        return (
                          <div
                            key={lEvent.id}
                            className=" w-full rounded-md bg-orange-900 text-white p-2 text-center my-1"
                          >
                            <div>{lEvent.description}</div>
                            <div>
                              (L-{lEvent.activeBlock.start.hours}H
                              {lEvent.activeBlock.start.minutes}M -{" "}
                              {lEvent.activeBlock.end.hours}H
                              {lEvent.activeBlock.end.minutes}M)
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-white">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
