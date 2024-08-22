import { InputProps } from "../../../Types";

export const Input = ({
  type,
  placeholder,
  value,
  handleChange,
}: InputProps) => {
  return (
    <input
      type={type}
      className="px-2 py-1 rounded-lg border-2 border-gray-500"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
