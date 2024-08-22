import { StatProps } from "../../../Types";

export const Stats = ({ className, label, amount }: StatProps) => {
  return (
    <h1 className={`text-lg ${className ? className : ""}`}>
      {label}: {amount}
    </h1>
  );
};
