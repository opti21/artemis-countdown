import dayjs from "dayjs";
import { FC } from "react";
import { LaunchEvent } from "../pages";
import { useCountdown } from "../utils/useCountdown";

type Props = {
  lEvent: LaunchEvent;
  scheduledT0: string;
};

const EventCard: FC<Props> = ({ lEvent, scheduledT0 }) => {
  const adjustedTime = dayjs(scheduledT0)
    .subtract(lEvent.activeBlock.start.hours, "hours")
    .subtract(lEvent.activeBlock.start.minutes, "minutes");

  const [days, hours, minutes, seconds] = useCountdown(
    adjustedTime.toISOString()
  );

  return (
    <div
      key={lEvent.id}
      className=" w-full rounded-md bg-orange-900 text-white p-2 my-1 mx-2 flex flex-col items-center text-center"
    >
      <div className="font-bold">{lEvent.description}</div>
      <div>
        (L-{lEvent.activeBlock.start.hours}H{lEvent.activeBlock.start.minutes}M
        - {lEvent.activeBlock.end.hours}H{lEvent.activeBlock.end.minutes}M)
      </div>
      <div className="text-white flex flex-row">
        <div>Time til event: -</div>
        {days && Number(days) > 0 && (
          <>
            <div>{days}</div>
            <div>:</div>
          </>
        )}
        <div>{hours}</div>
        <div>:</div>
        <div>{minutes}</div>
        <div>:</div>
        <div>{seconds}</div>
      </div>
    </div>
  );
};

export default EventCard