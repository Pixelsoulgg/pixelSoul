import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Search from "../../components/Search";
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
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Sidebar display={{ base: "none", lg: "flex" }} minH="110vh" />
      <HeaderMobile display={{ base: "flex", lg: "none" }} />
      <Flex
        flexDirection="column"
        w="100%"
        px="20px"
        py="20px"
        minH="100vh"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Flex
          w="full"
          justifyContent="space-between"
          alignContent="center"
          py="12px"
          borderBottom="1px solid #EAECF0"
          mb="32px"
        >
          <Text variant="with-title">Games</Text>
          <Search paddingY="0px" w="320px" display={{base: 'none', lg: 'flex'}} />
        </Flex>
        {children}
      </Flex>
    </Flex>
  );
}
