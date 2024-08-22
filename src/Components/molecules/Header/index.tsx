import { Timer } from "../Timer";

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between px-4 mb-4">
      <h3 className="text-lg font-bold text-blue-950 ">Dot Test Quiz</h3>
      <Timer />
    </div>
  );
};
