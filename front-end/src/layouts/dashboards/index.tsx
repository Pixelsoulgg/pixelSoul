import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import HeaderMobile from "./HeaderMobile";
import Sidebar from "./Sidebar";

export interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <Flex
      w="100%"      
      margin="0px auto"
      flexDirection={{base: 'column', lg: 'row'}}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Sidebar display={{base: 'none', lg: 'flex'}}  />
      <HeaderMobile display={{base: 'flex', lg: 'none'}} />
      <Flex
        flexDirection="column"
        w="100%"
        px="20px"
        py="20px"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </Flex>
  );
}
