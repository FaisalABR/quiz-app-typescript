import { HomeAction, HomeGreets, HomeHeader } from "../../molecules";

export const BoxHome = () => {
  return (
    <div className="w-full max-w-[420px] px-4 bg-white rounded-sm shadow-sm py-3 flex flex-col items-center gap-4">
      <HomeHeader />
      <HomeGreets />
      <HomeAction />
    </div>
  );
};
