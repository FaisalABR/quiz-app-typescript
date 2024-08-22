import { NavGroup } from "../../molecules";

export const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 right-0 bg-blue-400">
      <div className="w-[90%] lg:max-w-[1184px] mx-auto flex items-center justify-between py-4">
        <p className="text-white font-bold text-xl">Quiz App</p>
        <NavGroup />
      </div>
    </div>
  );
};
