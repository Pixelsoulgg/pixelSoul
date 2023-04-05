import { ReactNode } from "react";
import DashboardLayout from "./dashboards";
import LandingLayout from "./landings";
import { GlobalContextProvider } from "@/contexts/Globals";

type Props = {
  children: ReactNode;
  variant?: "landing" | "dashboard";
};

export default function Layout({ variant = "dashboard", children }: Props) {
  if (variant === "landing") {
    return <LandingLayout>{children}</LandingLayout>;
  }

  return (
    <GlobalContextProvider>
      <DashboardLayout> {children} </DashboardLayout>
    </GlobalContextProvider>
  );
}
