import { ReactNode } from "react";
import { Navbar } from "@/Components/organism";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
