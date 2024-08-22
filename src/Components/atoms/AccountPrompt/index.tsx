import { AccountPromptProps } from "../../../Types";

export const AccountPrompt = ({
  prompt,
  text,
  handleSection,
}: AccountPromptProps) => {
  return (
    <p className="text-center my-3">
      {prompt}{" "}
      <span
        onClick={handleSection}
        className="font-bold cursor-pointer text-blue-500 hover:text-blue-300  transition-all"
      >
        {text}
      </span>
    </p>
  );
};
