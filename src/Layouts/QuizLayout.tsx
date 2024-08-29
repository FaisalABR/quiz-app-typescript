import { ChildrenTypes } from "@/Types";

export const QuizLayout = ({ children }: ChildrenTypes) => {
  return (
    <div className="max-w-[520px] w-full rounded-sm bg-white mx-auto py-3 px-4">
      {children}
    </div>
  );
};
