import { ReactNode } from "react";
import DashboardLayout from "./dashboards";
import LandingLayout from "./landings";
import OtherLayout from "./others"
import { GlobalContextProvider } from "@/contexts/Globals";

type Props = {
  children: ReactNode;
  variant?: "landing" | "dashboard" | "other";
};

export default function Layout({ variant = "dashboard", children }: Props) {
  if (variant === "landing") {
    return <LandingLayout>{children}</LandingLayout>;
  }
  if (variant === "other") {
    return <OtherLayout>{children}</OtherLayout>;
  }

  return (
    <GlobalContextProvider>
      <DashboardLayout> {children} </DashboardLayout>
    </GlobalContextProvider>
  );
}
