import { ReactNode, useEffect } from "react";
import DashboardLayout from "./dashboards";
import LandingLayout from "./landings";
import OtherLayout from "./others"
import { GlobalContextProvider } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  variant?: "landing" | "dashboard" | "other";
};

export default function Layout({ variant = "dashboard", children }: Props) {
  const {soulTagNft} = useAppSelector((p) => p.suinft);
  const {pathname, push} = useRouter();
 
  useEffect(() => {
    if (!soulTagNft && ["/soul-drops", "/game-hubs"].indexOf(pathname) > -1) {
      push('/my-souls')
    }
  }, [soulTagNft]);

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
