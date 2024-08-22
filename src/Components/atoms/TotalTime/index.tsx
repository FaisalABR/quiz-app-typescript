import { TotalTimerProps } from "../../../Types";

export const TotalTimer = ({ total }: TotalTimerProps) => {
  return (
    <div className="px-3 rounded-sm bg-blue-950">
      <span className="text-lg font-bold text-white">{total}</span>
    </div>
  );
};
