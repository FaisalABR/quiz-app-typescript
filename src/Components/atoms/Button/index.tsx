import { ButtonProps } from "../../../Types";

export const Button = ({ className, handleClick, text }: ButtonProps) => {
  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
};
