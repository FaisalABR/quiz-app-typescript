import { Spin } from "antd";

export const Loading = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/25 flex items-center justify-center">
      <Spin />
    </div>
  );
};
